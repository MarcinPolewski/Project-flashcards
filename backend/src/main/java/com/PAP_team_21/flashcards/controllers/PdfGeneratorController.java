package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.PdfGenerator;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class PdfGeneratorController {
    private final DeckRepository deckRepository;
    private final PdfGenerator pdfGenerator;

    @GetMapping("/generatePdf/{id}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable int id) {
        Optional<Deck> deckOpt = deckRepository.findById(id);
        if (deckOpt.isEmpty()) {
            return  ResponseEntity.notFound().build();
        }
        Deck deck = deckOpt.get();

        byte[] pdfBytes = pdfGenerator.generatePdfFromDeck(deck);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + deck.getName() + ".pdf");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}