package com.dolfin.oasys.domain.category.model.entity;

import com.dolfin.oasys.domain.tellertype.model.entity.TellerType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

    @ManyToOne
    @JoinColumn(name = "cate_tellerType_id", nullable = false)
    private TellerType tellerTypeId;

    //카테고리 생성자
    public static Category create(String generalTypeName, String simpleTypeName,
        TellerType tellerTypeId){
        return Category.builder()
            .generalTypeName(generalTypeName)
            .simpleTypeName(simpleTypeName)
            .tellerTypeId(tellerTypeId)
            .build();
    }
}
