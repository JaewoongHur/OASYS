package com.dolfin.oasys.domain.gpt.controller;

import com.dolfin.oasys.domain.gpt.mp3.PlayerMP3;
import com.dolfin.oasys.domain.stt.controller.VideoController;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import com.twilio.twiml.voice.Play;
import lombok.RequiredArgsConstructor;
import org.python.util.PythonInterpreter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class GptController {
    @Value("${gpt.api.key}")
    private String key;


    private OpenAiService service;

    @PostConstruct
    public void connectGPT(){
        this.service = new OpenAiService(key);
    }


    private PythonInterpreter py;

    /*resource\\mp3 폴더의 절대 경로 넣기*/
   private final String FILE_PATH = "./src/main/resources/mp3/";


    @PostMapping("/voice")
    public ResponseEntity<String> receiveVoiceText(@RequestBody Map<String, String> voiceData) {
        String voiceText = voiceData.get("text");
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage2 = new ChatMessage(ChatMessageRole.SYSTEM.value(), "1. 인출 2. 입금 3. 송금 4.대출 상담 이라는 선택지가 있어. 앞으로 내가 하는 말이 어디에 속하는지 단답으로ㅎ 알려줘.");
        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(),  voiceText);
        messages.add(systemMessage2);
        messages.add(systemMessage);


        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
                .builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .n(1)
                .maxTokens(10)
                .logitBias(new HashMap<>())
                .build();
        ChatMessage responseMessage = service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage();

        String answerText = responseMessage.getContent();
        System.out.println((answerText));
//        gptService.sendToDesk("female");
        PlayerMP3 receive;
        if(answerText.contains("인출")||answerText.contains("1")) {
            receive = new PlayerMP3(FILE_PATH + "인출_접수_여자.mp3");
            answerText = "인출 업무 접수 완료";
            receive.playing();
        }
        else if(answerText.contains("입금")||answerText.contains("2")) {
            receive = new PlayerMP3(FILE_PATH+ "입금_접수_여자.mp3");
            answerText = "입금 업무 접수 완료";
            receive.playing();
        }
        else if(answerText.contains("송금")||answerText.contains("3")) {
            receive = new PlayerMP3(FILE_PATH + "송금_접수_여자.mp3");
            answerText = "송금 업무 접수 완료";
            receive.playing();
        }

        /*추후 입력받은 업무를 확인하고, 해당 변수를 던지는 과정이 추가될 자리*/
        try{
        Thread.sleep(3000);}
        catch (Exception e){
            e.printStackTrace();
        }
        PlayerMP3 playerMP3 = new PlayerMP3(FILE_PATH+"접수_확인_여자.mp3");

        playerMP3.playing();
        return ResponseEntity.ok(answerText);
    }


}




