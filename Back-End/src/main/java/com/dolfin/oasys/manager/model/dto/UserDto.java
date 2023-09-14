package com.dolfin.oasys.manager.model.dto;

import lombok.*;

public class UserDto {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestMemberDto {
        private String name;
        private String phone;
        private int age;
        private boolean gender;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestNonMemberDto {
        private String name;
        private String phone;
        private int age;
        private boolean gender;
    }


}
