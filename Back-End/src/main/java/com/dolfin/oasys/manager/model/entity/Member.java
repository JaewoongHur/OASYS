package com.dolfin.oasys.manager.model.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "member_faceId")
    private String memberFaceId;

    @Column(name = "member_nickName")
    private String memberNickName;

    @Column(name = "member_gender")
    private String memberGender;

    @Column(name = "member_phone", nullable = false)
    private String memberPhone;

    @Column(name = "member_role", columnDefinition = "VARCHAR(6) DEFAULT '0'")
    private String memberRole;

    @Column(name = "member_createdAt", nullable = false, updatable = false)
    private Timestamp memberCreatedAt;

    @Column(name = "member_updatedAt", nullable = false)
    private Timestamp memberUpdatedAt;

    @Column(name = "member_age")
    private Integer memberAge;

    @Column(name = "member_isDeleted", columnDefinition = "TINYINT(1) DEFAULT '0'")
    private Boolean memberIsDeleted;
}
