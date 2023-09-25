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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl implements ManagerService {
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
            List<String> consumerList = waitingList.range(Long.toString(tellerType.getTellerTypeId()), 0, -1);
            Long tellerTypeId = tellerType.getTellerTypeId();
            String nowCCFaceId = consultingList.opsForValue().get(tellerTypeId);

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
                .name(consumerInfoList.opsForValue().get(faceId).getName())
                .build();
    }

    @Override
    public void addConsumerToWaitingList(MemberDto.RequestMember requestMember) {
        log.info("addConsumerToConsultation");
        log.info("Input: " + requestMember);
        waitingList.rightPush(Long.toString(requestMember.getTellerTypeId()), requestMember.getFaceId());
        consumerInfoList.opsForValue().set(requestMember.getFaceId(),
                MemberDto.WaitingMember
                        .builder()
                        .faceId(requestMember.getFaceId())
                        .name(requestMember.getName())
                        .phone(requestMember.getPhone())
                        .cateTypeName(requestMember.getCateTypeName())
                        .isMember(requestMember.isMember())
                        .build());
    }

    @Override
    public boolean nextConsumerToConsultation(String tellerType) {
        log.info("nextConsumerToConsultation tellerType: " + tellerType);
        Class<?> keyType = consultingList.getKeySerializer().getClass();
        Class<?> valueType = consultingList.getValueSerializer().getClass();

        log.info("Key Type: " + keyType.getName());
        log.info("Value Type: " + valueType.getName());

        if (consultingList.hasKey(tellerType) != null) {
            log.error("상담중인 고객 : " + consultingList.opsForValue().get(tellerType));
            return false;
        }
        String nextFaceId = waitingList.leftPop(tellerType);
        log.info("nextConsumerFaceId: " + nextFaceId);

        log.info(nextFaceId);
        if (nextFaceId != null) {
            consultingList.opsForValue().set(tellerType, nextFaceId);
            return true;
        }
        log.error("대기인원이 없습니다.");
        return false;
    }

    @Override
    public boolean completeConsultation(String tellerType) {
        log.info("completeConsultation tellerType: " + tellerType);
        String faceId = consultingList.opsForValue().get(tellerType);
        if (faceId != null) {
            return consumerInfoList.delete(faceId) && consultingList.delete(tellerType);
        }
        return false;
    }

    @Override
    public MemberDto.ResponseMember getMemberInfoByFaceId(String faceId) {
        MemberDto.WaitingMember waitingMember = consumerInfoList.opsForValue().get(faceId);
        MemberDto.ResponseMember responseMember = MemberDto.ResponseMember
                .builder()
                .faceId(waitingMember.getFaceId())
                .isMember(waitingMember.isMember())
                .name(waitingMember.getName())
                .phone(waitingMember.getPhone())
                .cateTypeName(waitingMember.getCateTypeName())
                .build();

        if (waitingMember.isMember()) {
            Member member = memberRepository.findByMemberFaceId(waitingMember.getFaceId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 faceId 입니다."));
            responseMember.setMemberId(member.getMemberId());
            responseMember.setAge(member.getMemberAge());
            responseMember.setGender(member.getMemberGender());
        }

        log.info("getMemberInfoByFaceId");
        log.info("responseMember: " + responseMember);

        return responseMember;
    }

    @Override
    public void createMember(MemberDto.RequestNewMember requestNewMember) {
        log.info("createMember");
        log.info("requestNewMember: " + requestNewMember);
        memberRepository.save(Member.builder()
                .memberFaceId(requestNewMember.getFaceId())
                .memberAge(requestNewMember.getAge())
                .memberPhone(requestNewMember.getGender())
                .memberGender(requestNewMember.getGender())
                .memberNickName(requestNewMember.getName())
                .build());
    }

    @Override
    public String consumerInfoList() {
        String result = "consumerInfoList: ";
        List<String> keys = new ArrayList<>(consumerInfoList.keys("*"));

        for (String key : keys) {
            MemberDto.WaitingMember waitingMember = consumerInfoList.opsForValue().get(key);
            result += waitingMember.toString();
            log.info(waitingMember.toString());
        }

        return result;
    }

    @Override
    public void flushAll() {
        // 총 고객 리스트 삭제
        consumerInfoList.getConnectionFactory().getConnection().flushAll();

        // 상담 리스트 삭제
        consultingList.getConnectionFactory().getConnection().flushAll();

        // 대기 리스트 삭제
        waitingList.getOperations().execute((RedisCallback<Void>) connection -> {
            connection.flushAll();
            return null;
        });
    }

}
