package com.talonario.Config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.talonario.Utils.ApiResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponseDto<Object>> handleException(Exception ex) {
		ApiResponseDto<Object> body = new ApiResponseDto<>(ex.getMessage(), null, false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
	}
}
