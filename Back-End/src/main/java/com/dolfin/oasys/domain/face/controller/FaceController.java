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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/face")
public class FaceController {

    private FaceService faceService;

    @PostMapping(path = "/recognition", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FaceResponse> faceRecognition(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        FaceResponse faceResponse = faceService.faceRecognition(multipartFile);
        return new ResponseEntity<>(faceResponse, HttpStatus.OK);
    }


    //    @PostMapping(path = "/detect", consumes = {
//        MediaType.APPLICATION_JSON_VALUE,
//        MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity<String> faceDetect(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
//        String fileName = multipartFile.getOriginalFilename();
//        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
//
//        OkHttpClient client = new OkHttpClient();
//
//        File inputFile = multipartFileToFile(multipartFile);
//
//        RequestBody requestBody = new MultipartBody.Builder()
//            .setType(MultipartBody.FORM)
//            .addFormDataPart("image", fileName, RequestBody.create(okhttp3.MediaType.parse("image/"+extension), inputFile))
//            .build();
//
//        Request request = new Request.Builder()
//            .url("https://apis.openapi.sk.com/nugufacecan/v1/detect")
//            .post(requestBody)
//            .addHeader("app-id", APP_ID)
//            .addHeader("appKey", APP_KEY)
//            .build();
//        try {
//            Response response = client.newCall(request).execute();
//            System.out.println(response.body().string());
//            return new ResponseEntity<>(response.toString(), HttpStatus.OK);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
//    }
}
