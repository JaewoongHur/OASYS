package com.dolfin.oasys.domian.notification.service;

import com.dolfin.oasys.domian.notification.dto.SmsNotificationRequest;

public interface NotificationService {

    void sendSmsNotification(SmsNotificationRequest notificationRequest);

    void makeCallNotification();
}
