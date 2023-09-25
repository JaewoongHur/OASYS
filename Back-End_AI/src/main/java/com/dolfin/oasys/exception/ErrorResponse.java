package com.dolfin.oasys.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {

    private String code;
    private String message;

    private ErrorResponse(final ErrorCode exception) {
        this.code = exception.getCode();
        this.message = exception.getMessage();
    }

    public ErrorResponse(final ErrorCode exception, final String message) {
        this.code = exception.getCode();
        this.message = message;
    }

    public static ErrorResponse of(final ErrorCode exception) {
        return new ErrorResponse(exception);
    }

    public static ErrorResponse of(final ErrorCode exception, final String message) {
        return new ErrorResponse(exception, message);
    }
}
