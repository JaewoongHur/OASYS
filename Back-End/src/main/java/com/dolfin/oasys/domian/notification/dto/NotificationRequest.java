package com.dolfin.oasys.domian.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {

    private String name;

    private String phone;

    private int teller;

    private int waitPeople;

    private String work;
}
