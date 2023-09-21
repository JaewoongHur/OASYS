package com.dolfin.oasys.domain.face.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubCreate {

    private String subject_name;

    private String subject_id;

    private String group_name;

    private String transaction_id;
}
