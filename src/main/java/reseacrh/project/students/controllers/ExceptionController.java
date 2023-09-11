package reseacrh.project.students.controllers;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import reseacrh.project.students.exceptions.BusinessException;
import reseacrh.project.students.exceptions.JwtExpired;
import reseacrh.project.students.responses.ExceptionResponse;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionResponse> handleBusinessException(BusinessException e) {
        ExceptionResponse response = new ExceptionResponse(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ExceptionResponse> handleJwtExpiredException(ExpiredJwtException e) {
        ExceptionResponse response = new ExceptionResponse(e.getMessage());
        System.out.println("NOW OM HERE TOO");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
