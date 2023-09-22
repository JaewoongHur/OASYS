package com.dolfin.oasys.domain.notification.controller;

import com.dolfin.oasys.domain.notification.dto.SmsNotificationRequest;
import com.dolfin.oasys.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<Void> send(@RequestBody SmsNotificationRequest notificationRequest){
        System.out.println(notificationRequest);
        notificationService.sendSmsNotification(notificationRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/call")
    public ResponseEntity<Void> call() {
        notificationService.makeCallNotification();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
