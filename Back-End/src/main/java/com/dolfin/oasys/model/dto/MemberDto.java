package com.dolfin.oasys.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

public class MemberDto {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestMember {
        private boolean isMember;
        private Long userId;
        private String faceId;
        private String phone;
        private String name;
        private Long tellerTypeId;
        private String cateTypeName;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseMember {
        private String faceId;
        private String name;
        private String phone;
        private String cateTypeName;
        private boolean isMember;
        private int age;
        private Long userId;
        private String gender;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RequestNewMember {
        private String faceId;
        private String name;
        private String phone;
        private int age;
        private String gender;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class WaitingMember {
        private String faceId;
        private String name;
        private String phone;
        private String cateTypeName;
        private boolean isMember;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class responseConsumer {
        private String faceId;
        private String name;
    }

//    @Getter
//    @Setter
//    @ToString
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class NonMember {
//        private String faceId;
//        private String Name;
//        private String phone;
//        private String cateTypeName;
//    }

}
