package com.dolfin.oasys.model.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@DynamicInsert
@Entity
@Table(name = "Member")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "member_faceId")
    private String memberFaceId;

    @Column(name = "member_subId")
    private String memberSubId;

    @Column(name = "member_nickName", nullable = false)
    private String memberNickName;

    @Column(name = "member_gender")
    private String memberGender;

    @Column(name = "member_phone", nullable = false)
    private String memberPhone;

    @Column(name = "member_role", columnDefinition = "VARCHAR(6) DEFAULT '0'")
    private String memberRole;

    @Column(name = "member_createdAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp memberCreatedAt;

    @Column(name = "member_updatedAt", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp memberUpdatedAt;

    @Column(name = "member_age")
    private Integer memberAge;

    @Column(name = "member_isDeleted", columnDefinition = "TINYINT(1) DEFAULT '0'")
    private Boolean memberIsDeleted;
}
