package com.dolfin.oasys.domain.face.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FaceRecognize {

    private String subject_id;

    private String subject_name;

    private Double distance;

    private FaceBox face_box;

    private String face_id;

    private Double face_score;

    private String expression;

    private Double expression_score;

    private ExpressionRaw expression_raw;

    private int age;

    private String gender;

    private String attribute;

    //모든 상황에 출력 가능
    private String transaction_id;

    //실패시 출력
    private String message;

    //실패시 출력
    private int code;
}
