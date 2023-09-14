package com.dolfin.oasys.manager.model.dto;
import lombok.*;

import java.util.List;
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TellerStatusDTO {
    private Long tellerType;
    private String generalTypeName;
    private boolean isConsulting;
    private String consumerName;
    private int waitingCount;
    private List<String> waitingConsumerList;
}
