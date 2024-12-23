package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.folder.Folder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/folder")
public class FolderController {


    @GetMapping("/get")
    public ResponseEntity<Page<Folder>> getAllFolders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
        return ResponseEntity.ok(null);
    }

}
