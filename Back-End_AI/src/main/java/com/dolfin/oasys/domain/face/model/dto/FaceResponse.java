package com.dolfin.oasys.domain.face.model.dto;

import com.dolfin.oasys.domain.member.model.dto.MemberDto;
import com.dolfin.oasys.domain.member.model.entity.Gender;
import com.dolfin.oasys.domain.member.model.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FaceResponse {

    private boolean senior;

    private Gender gender;

    private boolean membership;

    MemberDto member;

    public static FaceResponse from(boolean isSenior, Gender gender, boolean isMember, Member member){
        return FaceResponse.builder()
            .senior(isSenior)
            .gender(gender)
            .membership(isMember)
            .member(MemberDto.from(member))
            .build();
    }
}
