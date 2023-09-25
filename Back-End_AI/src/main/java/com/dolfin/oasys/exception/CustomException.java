package com.dolfin.oasys.exception;

public class CustomException extends RuntimeException{
    private final ErrorCode exception;

    public CustomException(String message, ErrorCode exception) {
        super(message);
        this.exception = exception;
    }


    public CustomException(ErrorCode exception) {
        super(exception.getMessage());
        this.exception = exception;
    }

    public ErrorCode getException() {
        return exception;
    }
}
