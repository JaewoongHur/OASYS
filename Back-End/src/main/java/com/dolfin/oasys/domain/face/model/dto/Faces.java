package com.dolfin.oasys.domain.face.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Faces {

    private FaceBox face_box;

    private int face_score;

    private String expression;

    private double expression_score;

    private ExpressionRaw expression_raw;

    private int age;

    private String gender;

    private String attribute;
}
