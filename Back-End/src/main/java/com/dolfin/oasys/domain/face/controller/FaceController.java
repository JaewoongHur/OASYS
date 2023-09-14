package com.dolfin.oasys.domain.face.controller;

import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import com.dolfin.oasys.domain.face.service.FaceService;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/face")
public class FaceController {

    private final FaceService faceService;

    @PostMapping(path = "/recognition", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FaceResponse> faceRecognition(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        FaceResponse faceResponse = faceService.faceRecognition(multipartFile);
        return new ResponseEntity<>(faceResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/saveTest", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> saveTest(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        String faceId = faceService.faceSave(multipartFile, "이순재");
        return new ResponseEntity<>(faceId, HttpStatus.OK);
    }

    @DeleteMapping("/deleteTest/{faceId}")
    public ResponseEntity<Void> deleteTest(@PathVariable("faceId")String faceId) {
        faceService.faceDelete(faceId);
        return new ResponseEntity<> (HttpStatus.OK);
    }
}
