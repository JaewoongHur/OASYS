package com.dolfin.oasys.domain.face.service;

import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface FaceService {

    //멤버 확인 및 성별과 시니어 여부 판단
    FaceResponse faceRecognition(MultipartFile multipartFile) throws IOException;

    //얼굴 등록
    String faceSave(MultipartFile multipartFile,String name) throws IOException;

    //얼굴 삭제
    void faceDelete(String faceId);

}
