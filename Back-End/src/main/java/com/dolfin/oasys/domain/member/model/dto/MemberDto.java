package com.dolfin.oasys.domain.member.model.dto;

import com.dolfin.oasys.domain.member.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {

    private long memberId;

    private String name;

    private String phone;


    public static MemberDto from(Member member){
        return MemberDto.builder()
            .memberId(member.getId())
            .name(member.getNickName())
            .phone(member.getPhone())
            .build();
    }
}
