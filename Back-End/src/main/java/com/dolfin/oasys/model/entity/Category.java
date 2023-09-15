package com.dolfin.oasys.model.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "Category")
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cate_id")
    private Long cateId;

    @Column(name = "cate_generalTypeName")
    private String cateGeneralTypeName;

    @Column(name = "cate_simpleTypeName")
    private String cateSimpleTypeName;

    @ManyToOne
    @JoinColumn(name = "cate_tellerType_id")
    private TellerType tellerType;

}
