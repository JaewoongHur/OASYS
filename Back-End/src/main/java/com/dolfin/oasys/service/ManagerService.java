package com.dolfin.oasys.service;

import com.dolfin.oasys.model.dto.MemberDto;
import com.dolfin.oasys.model.dto.TellerStatusDTO;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface ManagerService {
    List<TellerStatusDTO> getTellerStatusList();

    void addConsumerToConsultation(MemberDto.RequestMember requestMember) throws JsonProcessingException;

    void completeConsultation(Long tellerType);

    MemberDto.ResponseMember getMemberInfoByFaceId(Long TellerTypeId, int count) throws JsonProcessingException;

    void createMember(MemberDto.RequestNewMember requestNewMember);
}
