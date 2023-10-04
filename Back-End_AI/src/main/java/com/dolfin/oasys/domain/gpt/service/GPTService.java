package com.dolfin.oasys.domain.gpt.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.fine_tuning.FineTuningJobRequest;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GPTService {



    @Value("${gpt.api.key}")
    private String key;

    /*resource\\mp3 폴더의 절대 경로 넣기*/
    private final String filePath = "./src/main/resources/mp3/";

    private boolean confirm=false;

    private OpenAiService service;

    @PostConstruct
    public void connectGPT(){
        this.service = new OpenAiService(key);

    }

    private String task="";
    public void createFineTuning(){
        FineTuningJobRequest fineTuningJobRequest = new FineTuningJobRequest();
        fineTuningJobRequest.setTrainingFile("file-vAgSFC7Lg1EZXm9Ftq2u2SWK");
        fineTuningJobRequest.setModel("gpt-3.5-turbo");

        service.createFineTuningJob(fineTuningJobRequest);

    }
    public Object sendQuestion(String question){

        String answerText="";
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.USER.value(), question);
        messages.add(systemMessage);
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                .model("ft:gpt-3.5-turbo-0613:personal::85nuYF05")
                .messages(messages)
                .maxTokens(100)
                .n(1)
                .build();
        return service.createChatCompletion(chatCompletionRequest).getChoices();

    }

 /*
 * 은행 업무'
 * 자주 사용하는 서비스 - 입금, 계좌 이체, 송금, 출금, 통장 정리, 현금 서비스, 공과금 납부
 *
 통장, 계좌 창구 - 입금, 계좌 이체, 송금, 출금, 통장 정리 등

카드 창구 - 카드 발급 및 재발급, 한도 및 비밀변호 변경, 신고, 현금 서비스 등

인터넷 뱅킹 - 가입, OTP 및 보안 카드 업무, 텔레 뱅킹, 이체한도 및 비밀번호 변경 등

대출, 외환 창구 - 예적금 담보 대출, 원금 및 이자 상환, 공과금 납부, 증명서 발금, 환전 등
 *
 *
 * */
    public String taskQuestion(String voiceText, String gender){
        //
        String answerText = "";
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), voiceText);
        messages.add(systemMessage);


        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
                .builder()
                .model("ft:gpt-3.5-turbo-0613:personal::85nuYF05")
                .messages(messages)
                .n(1)
                .maxTokens(10)
                .logitBias(new HashMap<>())
                .build();
        ChatMessage responseMessage = service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage();
        answerText = responseMessage.getContent();
        System.out.println(answerText);
        PlayerMP3 receive;
        if (gender.equals("MALE")) {
            if (answerText.contains("인출")) {
                receive = new PlayerMP3(filePath + "인출_확인_여자.mp3");
                answerText = "인출 업무 확인";
                task="인출 업무";
                receive.playing();
            } else if (answerText.contains("입금")) {
                receive = new PlayerMP3(filePath + "입금_확인_여자.mp3");
                answerText = "입금 업무 확인";
                task="입금 업무";
                receive.playing();
            } else if (answerText.contains("송금")) {
                receive = new PlayerMP3(filePath + "송금_확인_여자.mp3");
                answerText = "송금 업무 확인";
                task="송금 업무";
                receive.playing();
            } else if (answerText.contains("카드")){
                receive = new PlayerMP3(filePath + "카드_확인_여자.mp3");
                answerText = "카드 업무 확인";
                task="카드 업무";
                receive.playing();
            }else if (answerText.contains("인터넷")){
                receive = new PlayerMP3(filePath + "인터넷뱅킹_확인_여자.mp3");
                answerText = "인터넷 뱅킹 업무 확인";
                task="인터넷 뱅킹 업무";
                receive.playing();
            }else if (answerText.contains("대출")){
                receive = new PlayerMP3(filePath + "대출_외환_확인_여자.mp3");
                answerText = "대출 외환 업무 확인";
                task="대출 외환 업무";
                receive.playing();
            }else if (answerText.contains("통장")){
                receive = new PlayerMP3(filePath + "통장정리_확인_여자.mp3");
                answerText = "통장 정리 업무 확인";
                task="통장 정리 업무";
                receive.playing();
            }else if (answerText.contains("계좌")){
                receive = new PlayerMP3(filePath + "계좌이체_확인_여자.mp3");
                answerText = "계좌 이체 업무 확인";
                task="계좌 이체 업무";
                receive.playing();
            }else if (answerText.contains("공과금")){
                receive = new PlayerMP3(filePath + "공과금납부_확인_여자.mp3");
                answerText = "공과금 납부 업무 확인";
                task="공과금 납부 업무";
                receive.playing();
            }else if (answerText.contains("현금 서비스")){
                receive = new PlayerMP3(filePath + "현금서비스_확인_여자.mp3");
                answerText = "현금서비스 업무 확인";
                task="현금서비스 업무";
                receive.playing();
            }

        } else {
            if (answerText.contains("인출") || answerText.contains("1")) {
                receive = new PlayerMP3(filePath + "인출_확인_남자.mp3");
                answerText = "인출 업무 확인";
                task="인출 업무";
                receive.playing();
            } else if (answerText.contains("입금") || answerText.contains("2")) {
                receive = new PlayerMP3(filePath + "입금_확인_남자.mp3");
                answerText = "입금 업무 확인";
                task="입금 업무";
                receive.playing();
            } else if (answerText.contains("송금") || answerText.contains("3")) {
                receive = new PlayerMP3(filePath + "송금_확인_남자.mp3");
                answerText = "송금 업무 확인";
                task="송금 업무";
                receive.playing();
            }else if (answerText.contains("카드")){
                receive = new PlayerMP3(filePath + "카드_확인_남자.mp3");
                answerText = "카드 업무 확인";
                task="카드 업무";
                receive.playing();
            }else if (answerText.contains("인터넷")){
                receive = new PlayerMP3(filePath + "인터넷뱅킹_확인_남자.mp3");
                answerText = "인터넷 뱅킹 업무 확인";
                task="인터넷 뱅킹 업무";
                receive.playing();
            }else if (answerText.contains("대출")){
                receive = new PlayerMP3(filePath + "대출_외환_확인_남자.mp3");
                answerText = "대출 외환 업무 확인";
                task="대출 외환 업무";
                receive.playing();
            }else if (answerText.contains("통장")){
                receive = new PlayerMP3(filePath + "통장정리_확인_남자.mp3");
                answerText = "통장 정리 업무 확인";
                task="통장 정리 업무";
                receive.playing();
            }else if (answerText.contains("계좌")){
                receive = new PlayerMP3(filePath + "계좌이체_확인_남자.mp3");
                answerText = "계좌 이체 업무 확인";
                task="계좌 이체 업무";
                receive.playing();
            }else if (answerText.contains("공과금")){
                receive = new PlayerMP3(filePath + "공과금납부_확인_남자.mp3");
                answerText = "공과금 납부 업무 확인";
                task="공과금 납부 업무";
                receive.playing();
            }else if (answerText.contains("현금 서비스")){
                receive = new PlayerMP3(filePath + "현금서비스_확인_남자.mp3");
                answerText = "현금서비스 업무 확인";
                task="현금서비스 업무";
                receive.playing();
            }

        }
        return answerText;
    }

    public String confirmTask(String voiceText,String gender){
        String answerText="";
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage2 = new ChatMessage(ChatMessageRole.SYSTEM.value(), "이게 긍정의 대답이면 '네', 아니면 '아니오'를 출력해줘");
        final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), voiceText);
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
        answerText = responseMessage.getContent();
        System.out.println(answerText);
        PlayerMP3 receive;
        if(gender.equals("MALE")){
            if(answerText.contains("네")||answerText.contains("맞아")){
                receive = new PlayerMP3(filePath + "접수_확인_여자.mp3");
                answerText = "업무 접수 완료";
                receive.playing();

            }
            else{
                receive = new PlayerMP3(filePath+"확인_실패_여자.mp3");
                answerText = null;
                receive.playing();
            }
        }
        else{
            if(answerText.contains("네")||answerText.contains("맞아")){
                receive = new PlayerMP3(filePath + "접수_확인_남자.mp3");
                answerText = "업무 접수 완료";
                receive.playing();
            }
            else {
                receive = new PlayerMP3(filePath+"확인_실패_여자.mp3");
                answerText = null;
                receive.playing();

            }
        }

        return answerText;
    }
    public String getTaks(){
        return this.task;
    }



}
