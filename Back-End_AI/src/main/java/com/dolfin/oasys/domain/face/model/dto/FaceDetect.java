package com.dolfin.oasys.domain.face.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FaceDetect {

    private List<Faces> faces;

    private int image_width;

    private int image_height;

    private String transaction_id;
}
