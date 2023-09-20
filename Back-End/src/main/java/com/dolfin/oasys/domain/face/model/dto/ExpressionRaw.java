package com.dolfin.oasys.domain.face.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExpressionRaw {

    private Double neutral;

    private Double smile;

    private Double sad;

    private Double surprised;

    private Double fear;

    private Double angry;

    private Double etc;
}
