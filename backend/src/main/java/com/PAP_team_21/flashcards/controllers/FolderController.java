package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.folder.Folder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/folder")
public class FolderController {


    @GetMapping("/get")
    public ResponseEntity<Page<Folder>> getAllFolders(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/get")
    public ResponseEntity<Folder> searchByName(
            Authentication authentication,
            @RequestParam(defaultValue = "") String matchingThis,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
        return ResponseEntity.ok(null);
    }

    @PostMapping("/create")
    public ResponseEntity<Folder> createFolder(Authentication authentication, Folder folder) {
        return ResponseEntity.ok(null);

    }

    @PostMapping("/edit")
    public ResponseEntity<Folder> editFolder(Authentication authentication, Folder folder) {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/delete")
    public void deleteFolder(Authentication authentication, int folderId) {
        return;
    }
}
