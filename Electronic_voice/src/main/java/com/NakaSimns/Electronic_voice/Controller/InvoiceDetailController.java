package com.NakaSimns.Electronic_voice.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NakaSimns.Electronic_voice.Entity.InvoiceDetail;

@CrossOrigin
@RestController
@RequestMapping("/InvoiceDetail")
public class InvoiceDetailController extends ObjectTController<InvoiceDetail>{

}
