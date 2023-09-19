package com.dolfin.oasys.service;

import com.dolfin.oasys.model.dto.TellerStatusDTO;
import com.dolfin.oasys.model.dto.MemberDto;
import com.dolfin.oasys.model.entity.Member;
import com.dolfin.oasys.model.entity.TellerType;
import com.dolfin.oasys.repository.MemberRepository;
import com.dolfin.oasys.repository.TellerTypeRepository;
import com.dolfin.oasys.util.JsonConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl implements ManagerService {
    private final ListOperations<String, String> tellerTypeStateList;

    private final TellerTypeRepository tellerTypeRepository;
    private final MemberRepository memberRepository;
    private final JsonConverter jsonConverter;
    @Override
    public List<TellerStatusDTO> getTellerStatusList() {
        List<TellerStatusDTO> TellerStatusList = new ArrayList<>();

        for (TellerType tellerType : tellerTypeRepository.findAll()) {
            List<String> consumerList = tellerTypeStateList.range(Long.toString(tellerType.getTellerTypeId()), 0, -1);
            int consumerSize = consumerList.size();
            TellerStatusList.add(TellerStatusDTO.builder()
                    .tellerTypeId(tellerType.getTellerTypeId())
                    .tellerTypeName(tellerType.getTellerTypeName())
                    .isConsulting(consumerSize > 0)
                    .consumerInfo(consumerList.get(0))
                    .waitingConsumerCount(consumerSize > 1 ? consumerSize - 1 : 0)
                    .waitingConsumerInfoList(consumerSize > 1 ? consumerList.subList(1, consumerSize) : null)
                    .build());
        }
        return TellerStatusList;
    }

    @Override
    public void addConsumerToConsultation(MemberDto.RequestMember requestMember) throws JsonProcessingException {
        tellerTypeStateList.rightPush(
                Long.toString(requestMember.getTellerTypeId()),
                jsonConverter.objectConvertJson(
                        MemberDto.WaitingMember
                                .builder()
                                .faceId(requestMember.getFaceId())
                                .name(requestMember.getName())
                                .phone(requestMember.getPhone())
                                .cateTypeName(requestMember.getCateTypeName())
                                .isMember(requestMember.isMember())
                                .build()));
    }

    @Override
    public void completeConsultation(Long tellerType) {
        tellerTypeStateList.leftPop(Long.toString(tellerType));
    }

    @Override
    public MemberDto.ResponseMember getMemberInfoByFaceId(Long TellerTypeId, int count) throws JsonProcessingException {
        MemberDto.WaitingMember waitingMember = jsonConverter.JsonConvertObject(
                tellerTypeStateList.index(Long.toString(TellerTypeId), count),
                MemberDto.WaitingMember.class);

        MemberDto.ResponseMember responseMember = MemberDto.ResponseMember
                .builder()
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

        return responseMember;
    }

    @Override
    public void createMember(MemberDto.RequestNewMember requestNewMember) {
        memberRepository.save(Member.builder()
                .memberFaceId(requestNewMember.getFaceId())
                .memberAge(requestNewMember.getAge())
                .memberPhone(requestNewMember.getGender())
                .memberGender(requestNewMember.getGender())
                .memberNickName(requestNewMember.getName())
                .build());
    }


}
