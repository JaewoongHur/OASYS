package com.dolfin.oasys.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
public class ManagerController {
    @GetMapping("/health-check")
    public String getHealth() {
        return "Hello manager-service";
    }
}
