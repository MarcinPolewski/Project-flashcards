package com.PAP_team_21.flashcards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class FlashcardsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlashcardsApplication.class, args);
	}

}
