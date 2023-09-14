package com.dolfin.oasys.manager.service;

import com.dolfin.oasys.manager.model.dto.TellerStatusDTO;
import com.dolfin.oasys.manager.model.entity.Category;
import com.dolfin.oasys.manager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl {
//    private final RedisTemplate<String, String> redisTemplate;
    private final ListOperations<String, String> listOps;
    private final CategoryRepository categoryRepository;
    private final HashOperations<String, String> hashOps;
    public List<TellerStatusDTO> getTellerStatusList() {
        List<TellerStatusDTO> TellerStatusList = new ArrayList<>();
        for (Category category : categoryRepository.findAll()) {
            List<String> consumerList = listOps.range(Long.toString(category.getCateTellerTypeId()), 0, -1);
            int consumerSize = consumerList.size();
            TellerStatusList.add(TellerStatusDTO.builder()
                    .tellerType(category.getCateTellerTypeId())
                    .generalTypeName(category.getCateGeneralTypeName())
                    .isConsulting(consumerSize > 0)
                    .consumerName(consumerList.get(0))
                    .waitingCount(consumerSize > 1 ? consumerSize - 1 : 0)
                    .waitingConsumerList(consumerSize > 1 ? consumerList.subList(1, consumerSize) : null)
                    .build());
        }

        return TellerStatusList;
    }

    public void addConsumer(Long TellerType, Long userId) {
        if ()
    }
}
