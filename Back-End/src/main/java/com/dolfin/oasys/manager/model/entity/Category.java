package com.dolfin.oasys.manager.model.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "Category")
@Getter
public class Category {

    @Id
    @Column(name = "cate_Id")
    private Long cateId;

    @Column(name = "cate_generalTypeName")
    private String cateGeneralTypeName;

    @Column(name = "cate_simpleTypeName")
    private String cateSimpleTypeName;

    @Column(name = "cate_tellerType_id")
    private Long cateTellerTypeId;

    @Column(name = "cate_desc")
    private String cateDesc;

}
