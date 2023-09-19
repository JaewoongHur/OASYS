package com.dolfin.oasys.model.dto;
import lombok.*;

import java.util.List;
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TellerStatusDTO {
    private Long tellerTypeId;
    private String tellerTypeName;
    private boolean isConsulting;
    private String consumerInfo;
    private int waitingConsumerCount;
    private List<String> waitingConsumerInfoList;
}
