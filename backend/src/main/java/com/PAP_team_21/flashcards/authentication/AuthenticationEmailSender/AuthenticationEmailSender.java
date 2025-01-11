package com.PAP_team_21.flashcards.authentication.AuthenticationEmailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationEmailSender {
    private final JavaMailSender mailSender;

    public void sendVerificationCodeEmail(String email, String verificationCode) throws MessagingException
    {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Flashcards - Verification code");
        helper.setText("Your verification code is: " + verificationCode);

        mailSender.send(message);
    }
}
