package com.dolfin.oasys.domain.face.controller;

import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
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
@RequestMapping("/api/v1/face")
public class FaceController {
    private String APP_ID ="";
    private String APP_KEY = "";

    @PostMapping(path = "/detect", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> faceDetect(@RequestPart(name = "multipartFile") MultipartFile multipartFile)throws IOException {
        String fileName = multipartFile.getOriginalFilename();
        log.info("fileName= {}" , fileName);

        byte[] encodeBase64 = Base64.encodeBase64(multipartFile.getBytes());

        String binaryString = "data:image/png;name="+fileName+";base64," + new String(encodeBase64, "UTF-8");
        log.info("binaryString= {}" , binaryString);
        OkHttpClient client = new OkHttpClient();

        okhttp3.MediaType mediaType = okhttp3.MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"image\":\""+binaryString+"}");
        log.info("body= {}" , body);
        okhttp3.Request request = new okhttp3.Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/detect")
            .post(body)
            .addHeader("accept", "application/json")
            .addHeader("app-id", APP_ID)
            .addHeader("appKey", APP_KEY)
            .addHeader("content-type", "application/json")
            .build();

        Response response = client.newCall(request).execute();
        log.info("response= {}", response.toString());
        return new ResponseEntity<>(response.toString(), HttpStatus.OK);
    }
}
