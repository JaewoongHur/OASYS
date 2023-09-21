package com.dolfin.oasys.domain.face.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DeleteDto {

    private String faceId;

    private String subId;
}
