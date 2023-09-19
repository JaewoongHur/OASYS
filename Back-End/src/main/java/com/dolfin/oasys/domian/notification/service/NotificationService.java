package com.dolfin.oasys.domian.notification.service;

import com.dolfin.oasys.domian.notification.dto.NotificationRequest;

public interface NotificationService {

    void sendSmsNotification(NotificationRequest notificationRequest);
}
