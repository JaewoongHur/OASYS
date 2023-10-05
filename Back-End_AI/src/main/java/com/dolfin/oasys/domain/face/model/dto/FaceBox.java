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
public class FaceBox {

    private int topLeftX;

    private int topLeftY;

    private int faceWidth;

    private int faceHeight;

    private List<Double> landmark;
}
