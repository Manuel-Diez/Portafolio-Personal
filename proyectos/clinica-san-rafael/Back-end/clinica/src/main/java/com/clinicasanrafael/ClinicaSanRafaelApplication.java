package com.clinicasanrafael;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.clinicasanrafael"})
public class ClinicaSanRafaelApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicaSanRafaelApplication.class, args);
	}

}
