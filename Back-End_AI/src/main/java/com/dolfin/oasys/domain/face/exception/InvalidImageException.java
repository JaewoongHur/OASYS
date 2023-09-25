package com.dolfin.oasys.domain.face.exception;

import com.dolfin.oasys.exception.CustomException;
import com.dolfin.oasys.exception.ErrorCode;

public class InvalidImageException extends CustomException {

    public InvalidImageException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public InvalidImageException() {
        super(ErrorCode.INVALID_IMAGE_EXCEPTION);
    }
}
