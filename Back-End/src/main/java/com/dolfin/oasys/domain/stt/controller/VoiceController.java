package com.dolfin.oasys.domain.stt.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class VoiceController {

    @Value("${openai.apikey}")
    private String openAIKey;

    @PostMapping("/voice")
    public ResponseEntity<String> receiveVoiceText(@RequestBody Map<String, String> voiceData) {
        String voiceText = voiceData.get("text");
        System.out.println(voiceText);
        //  Get response from OpenAI API
//        String answerText = callOpenAIApi(voiceText);
        String answerText = "GPT : 네! 안녕하세요";
        VideoController.detect();
        return ResponseEntity.ok(answerText);
    }


    private String callOpenAIApi(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // Define headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAIKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("prompt", prompt);
        requestBody.put("max_tokens", 150);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity("https://api.openai.com/v1/engines/davinci/completions", request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null && response.getBody().containsKey("choices")) {
            Map<String, Object> responseBody = response.getBody();
            Map firstChoice = (Map) ((List) responseBody.get("choices")).get(0);
            return (String) firstChoice.get("text");
        }

        return "Error in getting response from OpenAI";
    }
}
