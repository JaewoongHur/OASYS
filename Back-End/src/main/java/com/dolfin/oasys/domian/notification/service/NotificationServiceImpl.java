package com.dolfin.oasys.domian.notification.service;

import com.dolfin.oasys.domian.notification.dto.NotificationRequest;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    @Value("${sms.api.key}")
    private String API_KEY;

    @Value("${sms.api.secret}")
    private String API_SECRET;

    @Value("${sms.api.send.number}")
    private String SEND_NUM;


    private DefaultMessageService messageService;

    @PostConstruct
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET, "https://api.coolsms.co.kr");
    }

    @Override
    public void sendSmsNotification(NotificationRequest notificationRequest) {
        StringBuilder text = new StringBuilder();
        text.append("[OASYS]")
            .append("\n이름: ").append(notificationRequest.getName())
            .append("\n창구번호: ").append(notificationRequest.getTeller())
            .append("\n대기인 수: ").append(notificationRequest.getWaitPeople())
            .append("\n접수 업무: ").append(notificationRequest.getWork());
        Message message = new Message();

        log.info("sendnum={}",SEND_NUM);
        log.info("apikey={}",API_KEY);
        log.info("apisec={}",API_SECRET);
        message.setFrom(SEND_NUM);
        message.setTo(notificationRequest.getPhone());
        message.setText(text.toString());

        SingleMessageSentResponse response = null;
        try {
            response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            log.info("res={}", response);
        }catch (Exception e){
            throw new RuntimeException("문자 발송 실패");
        }
    }
}
