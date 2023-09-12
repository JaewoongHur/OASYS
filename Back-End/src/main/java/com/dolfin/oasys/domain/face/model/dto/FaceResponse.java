package com.dolfin.oasys.domain.face.model.dto;

import java.lang.reflect.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class FaceResponse {

    private boolean isSenior;

    private boolean isMember;

    private Member member;


    public static FaceResponse from(boolean isMember, boolean isSenior, Member member){
        return FaceResponse.builder()
            .isMember(isMember)
            .isSenior(isSenior)
            .member(member)
            .build();
    }
}
