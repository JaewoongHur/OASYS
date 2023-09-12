package com.dolfin.oasys.domain.face.service;

import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FaceServiceImpl implements FaceService{

    private final String APP_ID = "V3BXR4ILE8";
    private final String APP_KEY = "X2k5RyJZFgwy5cIOOOM33Zt0dJQyOCY1jnx9UPp9";

    @Override
    public FaceResponse faceRecognition(MultipartFile multipartFile) throws IOException{

        //인풋 파일 정보 추출
        String fileName = multipartFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        OkHttpClient client = new OkHttpClient();

        //파일로 변환
        File convFile = multipartFileToFile(multipartFile);

        //request body 생성
        RequestBody requestBody = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("image", fileName, RequestBody.create(okhttp3.MediaType.parse("image/"+extension), convFile))
            .build();
        //request 생성
        Request request = new Request.Builder()
            .url("https://apis.openapi.sk.com/nugufacecan/v1/recognize")
            .post(requestBody)
            .addHeader("app-id", APP_ID)
            .addHeader("appKey", APP_KEY)
            .build();

        //이미 있는 회원인지 검사
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());

            //이미 회원인 경우
            if(response.isSuccessful()){
                //회원 정보 추출후 resonse 생성
//                return FaceResponse.from(true,true);
            }

            //회원이 아니면
            //노인인지 검사후 response 반환
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("회원 로직 검사 에러 발생");
        }

        throw new RuntimeException("검사 실패");
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
