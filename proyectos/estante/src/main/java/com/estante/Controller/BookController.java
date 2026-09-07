package com.estante.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estante.Entity.Book;

@RestController
@RequestMapping("/Book")
public class BookController extends ObjectTController<Book>{

}
