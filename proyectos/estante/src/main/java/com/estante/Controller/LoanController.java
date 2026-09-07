package com.estante.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estante.Entity.Loan;

@RestController
@RequestMapping("/Loan")
public class LoanController extends ObjectTController<Loan>{

}
