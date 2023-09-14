package com.dolfin.oasys.domain.category.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CateRequest {

    private String generalTypeName;

    private String simpleTypeName;
}
