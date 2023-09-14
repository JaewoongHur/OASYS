package com.dolfin.oasys.domian.member.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long id;

    @Column(name = "member_faceInfo", nullable = false, length = 15, unique = true)
    private String faceId;

    @Column(name = "member_nickName", nullable = false)
    private String nickName;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_gender", nullable = false, length = 6)
    private Gender gender;

    @Column(name = "member_phone", nullable = false, length = 11)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role", nullable = false, length = 6)
    private Role role;

    @CreatedDate
    @CreationTimestamp
    @Column(name = "member_createdAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @UpdateTimestamp
    @Column(name = "member_updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @Column(name = "member_isSenior", nullable = false)
    private boolean isSenior;

    @Column(name = "member_isDeleted", nullable = false, columnDefinition = "tinyint(1) default 0")
    private boolean isDeleted;

    //멤버 생성자
    public static Member create(String faceId, String nickname, String phone, Role role, boolean isSenior){
        return Member.builder()
            .faceId(faceId)
            .nickName(nickname)
            .phone(phone)
            .role(role)
            .isSenior(isSenior)
            .build();
    }
}
