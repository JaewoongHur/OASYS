package com.dolfin.oasys.domain.face.exception;

import com.dolfin.oasys.exception.CustomException;
import com.dolfin.oasys.exception.ErrorCode;

public class CommunicationLimitException extends CustomException {

    public CommunicationLimitException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public CommunicationLimitException() {
        super(ErrorCode.COMMUNICATION_LIMIT_EXCEPTION);
    }
}
