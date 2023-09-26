package com.dolfin.oasys.domain.face.exception;

import com.dolfin.oasys.exception.CustomException;
import com.dolfin.oasys.exception.ErrorCode;

public class APIConnectException extends CustomException {

    public APIConnectException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public APIConnectException() {
        super(ErrorCode.API_CONNECT_EXCEPTION);
    }
}
