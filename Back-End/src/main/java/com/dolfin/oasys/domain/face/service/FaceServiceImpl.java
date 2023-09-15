package com.dolfin.oasys.domain.face.service;

import com.dolfin.oasys.domain.face.model.dto.FaceDetect;
import com.dolfin.oasys.domain.face.model.dto.FaceRecognize;
import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import com.dolfin.oasys.domain.member.model.entity.Gender;
import com.dolfin.oasys.domain.member.model.entity.Member;
import com.dolfin.oasys.domain.member.model.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class FaceServiceImpl implements FaceService{

    private final MemberRepository memberRepository;

    @Value("${face.api.sub.id}")
    private String SUB_ID;

    @Value("${face.api.app.id}")
    private String APP_ID;

    @Value("${face.api.group.id}")
    private String GROUP_ID;

    @Value("${face.api.app.key}")
    private String APP_KEY;

    @Override
    public FaceResponse faceRecognition(MultipartFile multipartFile) throws IOException {
        //인풋 파일 정보 추출
        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        OkHttpClient client = new OkHttpClient();
        //파일로 변환
        File convFile = multipartFileToFile(multipartFile);

        //request body 생성
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("image", fileName, RequestBody.create(MediaType.parse("image/"+extension), convFile))
            .build();
        //request 생성
        Request request = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/recognize")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        //이미 있는 회원인지 검사
        ObjectMapper objectMapper = new ObjectMapper();
        Response response = client.newCall(request).execute();
        FaceRecognize faceRecognize = objectMapper.readValue(response.body().string(), FaceRecognize.class);

        log.info("faceRecognize={}",faceRecognize.toString());

        //이미 회원인 경우
        if(faceRecognize.getFace_id() != null){
            Member member = memberRepository.findByFaceId(faceRecognize.getFace_id());
            return FaceResponse.from(true, member.isSenior(), member.getGender(), member);
        }else{
            //request body 생성
            RequestBody detectRequestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image", fileName, RequestBody.create(MediaType.parse("image/"+extension), convFile))
                .build();
            //request 생성
            Request detectRequest = new Request.Builder()
                .url("https://apis.openapi.sk.com/nugufacecan/v1/detect")
                .post(detectRequestBody)
                .addHeader("app-id", APP_ID)
                .addHeader("appKey", APP_KEY)
                .build();

            Response detectResponse = client.newCall(detectRequest).execute();
            FaceDetect faceDetect = objectMapper.readValue(detectResponse.body().string(), FaceDetect.class);

            Gender gender = faceDetect.getFaces().get(0).getGender().equals("male") ? Gender.MALE : Gender.FEMALE;
            if(faceDetect.getFaces().get(0).getAge() >= 60){
                return FaceResponse.from(false, true, gender, Member.builder().build());
            }
            return FaceResponse.from(false,false, gender, Member.builder().build());
        }
    }

    @Override
    public String faceSave(MultipartFile multipartFile, String name) throws IOException{
        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        OkHttpClient client = new OkHttpClient();

        File convFile = multipartFileToFile(multipartFile);
        //request body 생성
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("image", fileName, RequestBody.create(MediaType.parse("image/"+extension), convFile))
            .build();
        //등록 request 생성
        Request request = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/face")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("subject-id", SUB_ID)
            .addHeader("appKey", APP_KEY)
            .addHeader("face-name", name.hashCode()+"_"+System.currentTimeMillis())
            .build();
        //얼굴 등록
        Response response = client.newCall(request).execute();
        if(response.code() != 200){
            log.info("err = {}",response.body().string());
            throw new RuntimeException("얼굴 등록 실패");
        }
        //얼굴인식 request 생성
        Request recognitionRequest = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/recognize")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        //해당 회원 faceId 리턴
        ObjectMapper objectMapper = new ObjectMapper();
        Response recognitionResponse = null;
        FaceRecognize faceRecognize = null;

        log.info("faceRecognize={}",faceRecognize);

        int maxAttempts = 5;
        int interval = 1000; // 0.1초
        boolean isRecognized = false;

        for (int i = 0; i < maxAttempts && !isRecognized; i++) {
            try {
                Thread.sleep(interval);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            recognitionResponse = client.newCall(recognitionRequest).execute();
            if (recognitionResponse.isSuccessful()) {
                faceRecognize = objectMapper.readValue(recognitionResponse.body().string(), FaceRecognize.class);
                if (faceRecognize.getFace_id() != null) {
                    isRecognized = true;
                    log.info("faceRecognize={}", faceRecognize);
                    return faceRecognize.getFace_id();
                }
            }
        }
        throw new RuntimeException("얼굴 인식 실패");
    }

    @Override
    public void faceDelete(String faceId) {
        OkHttpClient client = new OkHttpClient();

        //request 생성
        Request request = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/face/"+faceId)
            .delete(null)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("subject-id", SUB_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        Response response = null;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(response.code() != 200){
            log.info("res={}",response.body());
            throw new RuntimeException("삭제 실패");
        }
    }

    //MultipartFile -> File convert
    private File multipartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();

        return convFile;
    }
}
