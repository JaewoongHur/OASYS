package com.dolfin.oasys.domain.gpt;


import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gpt")
public class GptController {

    @PostMapping("/question")
    public void sendQuestion(){
        OpenAiService openAiService = new OpenAiService("Your-GPT-API");
        CompletionRequest completionRequest = CompletionRequest.builder()
                .prompt("철학이란 무엇일까?").model("ada").echo(true).build();
        openAiService.createCompletion(completionRequest).getChoices().forEach(System.out::println);
    }



}
