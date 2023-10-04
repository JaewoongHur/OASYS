package com.dolfin.oasys.service;

import com.dolfin.oasys.model.dto.TellerStatusDTO;
import com.dolfin.oasys.model.dto.MemberDto;
import com.dolfin.oasys.model.entity.Member;
import com.dolfin.oasys.model.entity.TellerType;
import com.dolfin.oasys.repository.MemberRepository;
import com.dolfin.oasys.repository.TellerTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl implements ManagerService {
    private final String WAITING = "tellerWaiting";
    private final String CONSULTING = "tellerConsulting";
    //총 고객 리스트
    private final RedisTemplate<String, MemberDto.WaitingMember> consumerInfoList;
    //상담 리스트
    private final RedisTemplate<String, String> consultingList;
    //대기 리스트
    private final ListOperations<String, String> waitingList;

    private final TellerTypeRepository tellerTypeRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<TellerStatusDTO> getTellerStatusList() {
        List<TellerStatusDTO> TellerStatusList = new ArrayList<>();
        for (TellerType tellerType : tellerTypeRepository.findAll()) {
            Long tellerTypeId = tellerType.getTellerTypeId();
            List<String> consumerList = waitingList.range(WAITING + tellerTypeId, 0, -1);
            String nowCCFaceId = consultingList.opsForValue().get(CONSULTING + Long.valueOf(tellerTypeId));

            TellerStatusList.add(TellerStatusDTO.builder()
                    .tellerTypeId(tellerTypeId)
                    .tellerTypeName(tellerType.getTellerTypeName())
                    .isConsulting(nowCCFaceId != null)
                    .consultingCustomer(nowCCFaceId != null ? getDTOFindByFaceId(nowCCFaceId) : null)
                    .waitingConsumerCount(consumerList.size())
                    .waitingConsumerList(consumerList.stream().map(faceId -> getDTOFindByFaceId(faceId)).collect(Collectors.toList()))
                    .build());
        }
        log.info("getTellerStatusList: \n");
        log.info(TellerStatusList.toString());
        return TellerStatusList;
    }

    private MemberDto.responseConsumer getDTOFindByFaceId(String faceId) {
        return MemberDto.responseConsumer
                .builder()
                .faceId(faceId)
                .subId(consumerInfoList.opsForValue().get(faceId).getSubId())
                .name(consumerInfoList.opsForValue().get(faceId).getName())
                .build();
    }

    @Override
    public void addConsumerToWaitingList(MemberDto.RequestMember requestMember) {
        log.info("addConsumerToConsultation");
        log.info("Input: " + requestMember);
        waitingList.rightPush(WAITING + requestMember.getTellerTypeId(), requestMember.getFaceId());
        consumerInfoList.opsForValue().set(requestMember.getFaceId(),
                MemberDto.WaitingMember
                        .builder()
                        .faceId(requestMember.getFaceId())
                        .subId(requestMember.getSubId())
                        .name(requestMember.getName())
                        .phone(requestMember.getPhone())
                        .cateTypeName(requestMember.getCateTypeName())
                        .isMember(requestMember.isMember())
                        .build());
    }

    @Override
    public boolean nextConsumerToConsultation(String tellerType) {
        log.info("nextConsumerToConsultation tellerType: " + tellerType);
        if (consultingList.hasKey(CONSULTING + tellerType)) {
            log.error("상담중인 고객 : " + consultingList.opsForValue().get(CONSULTING + tellerType));
            return false;
        }
        String nextFaceId = waitingList.leftPop(WAITING + tellerType);
        log.info("nextConsumerFaceId: " + nextFaceId);
        
        if (nextFaceId != null) {
            consultingList.opsForValue().set(CONSULTING + tellerType, nextFaceId);
            return true;
        }
        log.error("대기인원이 없습니다.");
        return false;
    }

    @Override
    public boolean completeConsultation(String tellerType) {
        log.info("completeConsultation tellerType: " + tellerType);
        String faceId = consultingList.opsForValue().getAndDelete(CONSULTING + tellerType);
        if (faceId != null) {
            return consumerInfoList.delete(faceId);
        }
        return false;
    }

    @Override
    public MemberDto.ResponseMember getMemberInfoByFaceId(String faceId) {
        MemberDto.WaitingMember waitingMember = consumerInfoList.opsForValue().get(faceId);
        if (waitingMember == null) return null;
        MemberDto.ResponseMember responseMember = MemberDto.ResponseMember
                .builder()
                .faceId(waitingMember.getFaceId())
                .subId(waitingMember.getSubId())
                .isMember(waitingMember.isMember())
                .name(waitingMember.getName())
                .phone(waitingMember.getPhone())
                .cateTypeName(waitingMember.getCateTypeName())
                .build();

        if (waitingMember.isMember()) {
            Member member = memberRepository.findByMemberFaceId(waitingMember.getFaceId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 faceId 입니다."));
            responseMember.setUserId(member.getMemberId());
            responseMember.setAge(member.getMemberAge());
            responseMember.setGender(member.getMemberGender());
        }

        log.info("getMemberInfoByFaceId");
        log.info("responseMember: " + responseMember);

        return responseMember;
    }
    @Transactional
    @Override
    public void createMember(MemberDto.RequestNewMember requestNewMember) {
        log.info("createMember");
        log.info("requestNewMember: " + requestNewMember);
        Member member = new Member();
        member.setMemberFaceId(requestNewMember.getFaceId());
        member.setMemberSubId(requestNewMember.getSubId());
        member.setMemberAge(requestNewMember.getAge());
        member.setMemberGender(requestNewMember.getGender());
        member.setMemberPhone(requestNewMember.getPhone());
        member.setMemberNickName(requestNewMember.getName());
        log.info(memberRepository.save(member).toString());
    }

    @Override
    public void flushAll() {
        consumerInfoList.getConnectionFactory().getConnection().flushAll();
        consultingList.getConnectionFactory().getConnection().flushAll();
        waitingList.getOperations().execute((RedisCallback<Void>) connection -> {
            connection.flushAll();
            return null;
        });
    }

}
