package com.dolfin.oasys.domain.face.service;

import com.dolfin.oasys.domain.face.exception.InvalidImageException;
import com.dolfin.oasys.domain.face.model.dto.DeleteDto;
import com.dolfin.oasys.domain.face.model.dto.FaceDetect;
import com.dolfin.oasys.domain.face.model.dto.FaceRecognize;
import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import com.dolfin.oasys.domain.face.model.dto.SubCreate;
import com.dolfin.oasys.domain.member.model.entity.Gender;
import com.dolfin.oasys.domain.member.model.entity.Member;
import com.dolfin.oasys.domain.member.model.entity.Role;
import com.dolfin.oasys.domain.member.repository.MemberRepository;
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

    @Value("${face.api.app.id}")
    private String APP_ID;

    @Value("${face.api.group.id}")
    private String GROUP_ID;

    @Value("${face.api.app.key}")
    private String APP_KEY;

    @Override
    public FaceResponse faceRecognition(MultipartFile multipartFile) throws IOException {
        OkHttpClient client = new OkHttpClient();

        //인풋 파일 정보 추출
        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

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

        if(faceRecognize.getCode() == 3004) {
            throw new InvalidImageException();
        }

        log.info("faceRecognize={}",faceRecognize.toString());


        //이미 회원인 경우
        if(faceRecognize.getFace_id() != null){
            Member member = memberRepository.findByFaceId(faceRecognize.getFace_id());
            return FaceResponse.from(member.isSenior(), member.getGender(), true, member);
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
            if(faceDetect.getFaces().get(0).getAge() >= 65){
                //TODO 얼굴 객체 저장후 face_id 관리자 서버로 넘기기
                return FaceResponse.from(true, gender,false, Member.builder().build());
            }
            return FaceResponse.from(false, gender,false, Member.builder().build());
        }
    }

    @Override
    public String faceSave(MultipartFile multipartFile, String name, String phone, int age,String gender) throws IOException{
        OkHttpClient client = new OkHttpClient();

        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        File convFile = multipartFileToFile(multipartFile);

        //request body 생성
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("image", fileName, RequestBody.create(MediaType.parse("image/"+extension), convFile))
            .build();

        //페이스 객체 생성
        String subId = faceCreateAtServer(name, client, requestBody);
        String faceId = getFaceId(client, requestBody);
        memberRepository.save(Member.create(faceId, subId, name, phone, Role.NORMAL, age, gender));
        return faceId;
    }

    @Override
    public void faceDelete(DeleteDto deleteDto) {
        OkHttpClient client = new OkHttpClient();

        //face 삭제
//        Request faceRequest = new Request.Builder()
//            .url("https://apis.openapi.sk.com/nugufacecan/v1/face/"+deleteDto.getFaceId())
//            .delete(null)
//            .addHeader("app-id", APP_ID)
//            .addHeader("group-id", GROUP_ID)
//            .addHeader("subject-id", deleteDto.getSubId())
//            .addHeader("appKey", APP_KEY)
//            .build();
//
//        Response faceResponse = null;
//        try {
//            faceResponse = client.newCall(faceRequest).execute();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        if(faceResponse.code() != 200){
//            log.info("res={}",faceResponse.body());
//            throw new RuntimeException("face 삭제 실패");
//        }

        //sub 삭제
        Request subRequest = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/subject/"+deleteDto.getSubId())
            .delete(null)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        Response subResponse = null;
        try {
            subResponse = client.newCall(subRequest).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(subResponse.code() != 200){
            log.info("res={}",subResponse.body());
            throw new RuntimeException("sub 삭제 실패");
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

    //페이스 객체 생성
    private String faceCreateAtServer(String name, OkHttpClient client, RequestBody requestBody)
        throws IOException {

        Request subRequest = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/subject")
            .post(RequestBody.create(MediaType.parse("application/json"), ""))
            .addHeader("accept", "application/json")
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("appKey", APP_KEY)
            .addHeader("subject-name", name.hashCode()+"_"+System.currentTimeMillis())
            .build();

        Response subResponse = client.newCall(subRequest).execute();
        ObjectMapper objectMapper = new ObjectMapper();
        SubCreate subCreate = objectMapper.readValue(subResponse.body().string(), SubCreate.class);
        String subId = subCreate.getSubject_id();

        log.info("subId = {}", subCreate.getSubject_id());

        //등록 request 생성
        Request faceRequest = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/face")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("subject-id", subId)
            .addHeader("appKey", APP_KEY)
            .addHeader("face-name", name.hashCode()+"_"+System.currentTimeMillis())
            .build();
        //얼굴 등록
        Response faceResponse = client.newCall(faceRequest).execute();
        if(faceResponse.code() != 200){
            log.info("err = {}",faceResponse.body().string());
            throw new RuntimeException("얼굴 등록 실패");
        }
        return subId;
    }

    //페이스 아이디 조회
    private String getFaceId(OkHttpClient client, RequestBody requestBody) throws IOException {
        //얼굴인식 request 생성
        Request recognitionRequest = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/recognize")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("group-id", GROUP_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        //해당 회원 faceId 조회
        ObjectMapper objectMapper = new ObjectMapper();
        Response recognitionResponse = null;
        FaceRecognize faceRecognize = null;

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
}
