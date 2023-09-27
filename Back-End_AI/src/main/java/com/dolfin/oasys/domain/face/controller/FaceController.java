package com.dolfin.oasys.domain.face.controller;

import com.dolfin.oasys.domain.face.exception.CommunicationLimitException;
import com.dolfin.oasys.domain.face.model.dto.DeleteDto;
import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import com.dolfin.oasys.domain.face.service.FaceService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/faces")
public class FaceController {
    @Value("${face.api.value}")
    private int MAX_VALUE;

    private final FaceService faceService;

    private static int currentCount = 0;

    @PostMapping(path = "/recognition", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FaceResponse> faceRecognition(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        if(currentCount == MAX_VALUE){
            throw new CommunicationLimitException();
        }
        currentCount++;
        FaceResponse faceResponse = faceService.faceRecognition(multipartFile);
        return new ResponseEntity<>(faceResponse, HttpStatus.OK);
    }
    @PostMapping(path = "/saveTest", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> saveTest(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        if(currentCount == MAX_VALUE){
            throw new CommunicationLimitException();
        }
        currentCount++;
        String faceId = faceService.faceSave(multipartFile, "나문희","01012341234",78, "FEMALE");
        return new ResponseEntity<>(faceId, HttpStatus.OK);
    }

    @DeleteMapping("/deleteTest")
    public ResponseEntity<Void> deleteTest(@RequestBody DeleteDto deleteDto) {
        if(currentCount == MAX_VALUE){
            throw new CommunicationLimitException();
        }
        currentCount++;
        faceService.faceDelete(deleteDto);
        return new ResponseEntity<> (HttpStatus.OK);
    }
}
