package com.dolfin.oasys.controller;

import com.dolfin.oasys.model.dto.MemberDto;
import com.dolfin.oasys.service.ManagerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/manager")
public class ManagerController {
    private final ManagerService managerService;

    @GetMapping("/health-check")
    public String getHealth() {
        log.info("health-check manager-service");
        return "Hello manager-service";
    }

    @GetMapping("/consumer")
    public String getAllConsumerInfo() {
        log.info("consumerInfoList");
        return managerService.consumerInfoList();
    }

    //상담리스트 체크
    @GetMapping("/teller/list")
    public ResponseEntity getTellerStatusList() {
        return ResponseEntity.status(HttpStatus.OK).body(managerService.getTellerStatusList());
    }

    //대기 인원 추가
    @PostMapping("/consumer/waiting")
    public ResponseEntity addConsumerToWaiting(@RequestBody MemberDto.RequestMember requestMember) {
        managerService.addConsumerToWaitingList(requestMember);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //유저 정보 꺼내기
    @GetMapping("/consumer/{faceId}")
    public ResponseEntity getMemberInfoByFaceId(@PathVariable String faceId) {
        return ResponseEntity.status(HttpStatus.OK).body(managerService.getMemberInfoByFaceId(faceId));
    }

    //다음 손님 받기
    @PutMapping("/consulting/{tellerType}")
    public ResponseEntity nextConsumerToConsultation(@PathVariable Long tellerType) {
        if (managerService.nextConsumerToConsultation(Long.toString(tellerType))) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        log.error("대기 인원이 없거나 상담 중인 고객이 있습니다.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("대기 인원이 없거나 상담 중인 고객이 있습니다.");
    }
    
    //상담 완료
    @DeleteMapping("/consulting/{tellerType}")
    public ResponseEntity completeConsultation(@PathVariable Long tellerType) {
        if (managerService.completeConsultation(Long.toString(tellerType)))
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        log.error("not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/member")
    public ResponseEntity createMember(@RequestBody MemberDto.RequestNewMember requestNewMember) {
        managerService.createMember(requestNewMember);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
