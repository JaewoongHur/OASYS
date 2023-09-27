package com.dolfin.oasys.domain.face.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FaceSaveResponse {

    private String faceId;

    private String subId;

    public static FaceSaveResponse from(String faceId, String subId){
        return FaceSaveResponse.builder()
            .faceId(faceId)
            .subId(subId)
            .build();
    }
}
