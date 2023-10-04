package com.dolfin.oasys.domain.notification.service;

import com.dolfin.oasys.domain.notification.dto.SMSNotificationRequest;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;
import java.net.URI;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    @Value("${sms.api.key}")
    private String SMS_KEY;

    @Value("${sms.api.secret}")
    private String SMS_SECRET;

    @Value("${sms.api.send.number}")
    private String SEND_NUM;

    @Value("${twilio.api.auth}")
    private String TWILIO_AUTH;

    @Value("${twilio.api.sid}")
    private String TWILIO_SID;

    @Value("${twilio.api.from}")
    private String TWILIO_FROM;

    @Value("${twilio.api.to}")
    private String TWILIO_TO;

    private DefaultMessageService messageService;

    @PostConstruct
    public void coolSmsInit() {
        this.messageService = NurigoApp.INSTANCE.initialize(SMS_KEY, SMS_SECRET, "https://api.coolsms.co.kr");
    }

    @Override
    public void sendSmsNotification(SMSNotificationRequest smsNotificationRequest) {
        StringBuilder text = new StringBuilder();
        text.append("[OASYS]")
            .append("\n이름: ").append(smsNotificationRequest.getName())
            .append("\n창구번호: ").append(smsNotificationRequest.getTeller())
            .append("\n대기인 수: ").append(smsNotificationRequest.getWaitPeople())
            .append("\n접수 업무: ").append(smsNotificationRequest.getWork());
        Message message = new Message();

        log.info("sendnum={}",SEND_NUM);
        log.info("apikey={}",SMS_KEY);
        log.info("apisec={}",SMS_SECRET);
        message.setFrom(SEND_NUM);
        message.setTo(smsNotificationRequest.getPhone());
        message.setText(text.toString());

        SingleMessageSentResponse response = null;

//        System.out.println(notificationRequest.getName());

        try {
            response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            log.info("res={}", response);
        }catch (Exception e){
            throw new RuntimeException("문자 발송 실패");
        }
    }

    @Override
    public void makeCallNotification() {
        Twilio.init(TWILIO_SID, TWILIO_AUTH);
        Call call = Call.creator(
            new PhoneNumber(TWILIO_TO), // to
            new PhoneNumber(TWILIO_FROM), // from
            URI.create("http://demo.twilio.com/docs/voice.xml"))
            .create();

        log.info("sid ={}", call.getSid());
    }
}
