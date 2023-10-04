package com.dolfin.oasys.service;

import com.dolfin.oasys.model.dto.MemberDto;
import com.dolfin.oasys.model.dto.TellerStatusDTO;

import java.util.List;

public interface ManagerService {
    List<TellerStatusDTO> getTellerStatusList();

    void addConsumerToWaitingList(MemberDto.RequestMember requestMember);

    boolean nextConsumerToConsultation(String tellerType);

    boolean completeConsultation(String tellerType);

    MemberDto.ResponseMember getMemberInfoByFaceId(String faceId);

    void createMember(MemberDto.RequestNewMember requestNewMember);

    void flushAll();
}
