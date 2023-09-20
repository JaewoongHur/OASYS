package com.dolfin.oasys.domain.notification.service;

import com.dolfin.oasys.domain.notification.dto.SmsNotificationRequest;

public interface NotificationService {

    void sendSmsNotification(SmsNotificationRequest notificationRequest);

    void makeCallNotification();
}
