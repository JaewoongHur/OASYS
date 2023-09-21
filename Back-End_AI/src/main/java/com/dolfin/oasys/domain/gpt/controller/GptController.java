package com.dolfin.oasys.domain.gpt.controller;


import com.dolfin.oasys.domain.stt.controller.VideoController;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import org.python.util.PythonInterpreter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gpt")
public class GptController {
    OpenAiService service = new OpenAiService("your api");
    private PythonInterpreter py;


    @PostMapping
    public void Init(){
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), "1. 인출 2. 입금 3. 송금 이라는 선택지가 있어. 앞으로 내가 하는 말이 어디에 속하는지 번호로 알려줘.");
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
        System.out.println(responseMessage.getContent());
    }

    @PostMapping("/voice")
    public ResponseEntity<String> receiveVoiceText(@RequestBody Map<String, String> voiceData) {
        String voiceText = voiceData.get("text");
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage2 = new ChatMessage(ChatMessageRole.SYSTEM.value(), "1. 인출 2. 입금 3. 송금 4.대출 상담 이라는 선택지가 있어. 앞으로 내가 하는 말이 어디에 속하는지 번호만 알려줘.");
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

        //   Get response from OpenAI API
//        String answerText = callOpenAIApi(voiceText);
        String answerText = responseMessage.getContent();
        System.out.println((answerText));
//        VideoController.detect();
        return ResponseEntity.ok(answerText);
    }
//    @PostMapping("/question")
//    public void sendQuestion() throws Exception{
//        final List<ChatMessage> messages = new ArrayList<>();
////        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), "'돈 보내려구요' 가 송금업무인지 출금업무인지 단답형으로 말해줘");
//        messages.add(systemMessage);
//        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
//                .builder()
//                .model("gpt-3.5-turbo")
//                .messages(messages)
//                .n(1)
//                .maxTokens(100)
//                .logitBias(new HashMap<>())
//                .build();
//        ChatMessage responseMessage = service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage();
//        service.streamChatCompletion(chatCompletionRequest)
//                .doOnError(Throwable::printStackTrace)
//                .blockingForEach(System.out::println);
//        System.out.println(responseMessage.getContent());
//        service.shutdownExecutor();

//        try(    TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()){
//
//            SynthesisInput input = SynthesisInput.newBuilder().setText(responseMessage.getContent()).build();
//
//            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder().setLanguageCode("ko-KR").setSsmlGender(SsmlVoiceGender.FEMALE).build();
//
//            AudioConfig audioConfig= AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
//            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input,voice,audioConfig);
//
//            ByteString audioContents = response.getAudioContent();
//
//            try(OutputStream out = new FileOutputStream("output.mp3")){
//                out.write(audioContents.toByteArray());
//                System.out.println("Audio content written to file \"output.mp3\"");
//            }
//        }
         }




