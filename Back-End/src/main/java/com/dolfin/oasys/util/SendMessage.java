package com.dolfin.oasys.util;

import com.dolfin.oasys.model.dto.MemberDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class SendMessage {
    @Value("${SMS_API_KEY}")
    private String SMS_KEY;

    @Value("${SMS_API_SECRET}")
    private String SMS_SECRET;

    @Value("${SMS_API_SEND_NUMBER}")
    private String SEND_NUM;

    private DefaultMessageService messageService;

    @PostConstruct
    public void coolSmsInit() {
        this.messageService = NurigoApp.INSTANCE.initialize(SMS_KEY, SMS_SECRET, "https://api.coolsms.co.kr");
    }

    public void sendSmsNotification(MemberDto.ConsumerForMessage consumerForMessage) {
        StringBuilder text = new StringBuilder();
        text.append("[OASYS]")
                .append("\n이름: ").append(consumerForMessage.getName())
                .append("\n창구번호: ").append(consumerForMessage.getTeller())
                .append("\n대기인 수: ").append(consumerForMessage.getWaitPeople())
                .append("\n접수 업무: ").append(consumerForMessage.getWork());
        Message message = new Message();

        message.setFrom(SEND_NUM);
        message.setTo(consumerForMessage.getPhone());
        message.setText(text.toString());

        SingleMessageSentResponse response = null;

        try {
            response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            log.info("res={}", response);
        }catch (Exception e){
            log.error("문자 전송 실패");
            throw new RuntimeException("문자 발송 실패");
        }
    }
}
