package com.dolfin.oasys.domain.history.model.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

public class HistoryId implements Serializable {

    private LocalDateTime usingAt;

    private Long member;
}
