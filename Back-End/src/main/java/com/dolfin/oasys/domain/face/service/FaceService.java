package com.dolfin.oasys.domain.face.service;

import com.dolfin.oasys.domain.face.model.dto.FaceResponse;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface FaceService {

    FaceResponse faceRecognition(MultipartFile multipartFile) throws IOException;
}
