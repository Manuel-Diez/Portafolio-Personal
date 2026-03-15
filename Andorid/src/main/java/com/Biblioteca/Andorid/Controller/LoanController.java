package com.Biblioteca.Andorid.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Biblioteca.Andorid.Entity.Loan;

@RestController
@RequestMapping("/Loan")
public class LoanController extends ObjectTController<Loan>{

}
