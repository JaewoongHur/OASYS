package com.dolfin.oasys.util;

import com.dolfin.oasys.model.dto.MemberDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JsonConverter {
    private final ObjectMapper objectMapper;
    public String objectConvertJson(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

    public <T> T JsonConvertObject(String json, Class<T> classType) throws JsonProcessingException {
        return json != null ? objectMapper.readValue(json, classType) : null;
    }
}
