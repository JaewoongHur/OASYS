package com.dolfin.oasys.domain.stt.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class VoiceController {
    @PostMapping("/voice")
    public ResponseEntity<String> receiveVoiceText(@RequestBody Map<String, String> voiceData) {
        String voiceText = voiceData.get("text");
        System.out.println("Received voice text: " + voiceText);
        String answerText = "GPT 응답";
        return ResponseEntity.ok(answerText);  // Return the text as the response
    }
}

