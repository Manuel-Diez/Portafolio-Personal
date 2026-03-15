package com.Biblioteca.Andorid.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Biblioteca.Andorid.Entity.Penalty;

@RestController
@RequestMapping("/Penalty")
public class PenaltyController extends ObjectTController<Penalty>{

}
