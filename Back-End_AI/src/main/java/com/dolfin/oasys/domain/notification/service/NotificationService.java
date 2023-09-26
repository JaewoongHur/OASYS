package com.dolfin.oasys.domain.notification.service;

import com.dolfin.oasys.domain.notification.dto.SMSNotificationRequest;

public interface NotificationService {

    void sendSmsNotification(SMSNotificationRequest smsNotificationRequest);

    void makeCallNotification();
}
