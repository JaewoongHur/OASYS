package com.dolfin.oasys.model.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "TellerType")
public class TellerType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tellerType_id")
    private Long tellerTypeId;

    @Column(name = "tellerType_name")
    private String tellerTypeName;
}
