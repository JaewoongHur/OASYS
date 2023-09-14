package com.dolfin.oasys.domain.category.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cate_id")
    private long id;

    @Column(name = "cate_generalTypeName", nullable = false)
    private String generalTypeName;

    @Column(name = "cate_simpleTypeName", nullable = false)
    private String simpleTypeName;

    @Column(name = "tellerType_id", nullable = false)
    private int tellerTypeId;

    @Column(name = "description", nullable = false)
    private String description;

    //카테고리 생성자
    public static Category create(String generalTypeName, String simpleTypeName,
        int tellerTypeId, String description){
        return Category.builder()
            .generalTypeName(generalTypeName)
            .simpleTypeName(simpleTypeName)
            .tellerTypeId(tellerTypeId)
            .description(description)
            .build();
    }
}
