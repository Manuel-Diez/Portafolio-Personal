package com.estante.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estante.Entity.Penalty;

@RestController
@RequestMapping("/Penalty")
public class PenaltyController extends ObjectTController<Penalty>{

}
