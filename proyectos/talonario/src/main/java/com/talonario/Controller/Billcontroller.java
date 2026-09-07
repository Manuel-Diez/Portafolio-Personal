package com.talonario.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talonario.Entity.Bill;

@CrossOrigin
@RestController
@RequestMapping("/Bill")
public class Billcontroller extends ObjectTController<Bill>{

}
