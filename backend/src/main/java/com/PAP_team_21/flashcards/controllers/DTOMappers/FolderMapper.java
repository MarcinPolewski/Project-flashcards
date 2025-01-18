package com.PAP_team_21.flashcards.controllers.DTOMappers;

import com.PAP_team_21.flashcards.controllers.DTO.FolderBasicDTO;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderMapper {
    public FolderBasicDTO toDTO(Folder folder) {
        return new FolderBasicDTO(folder.getId(), folder.getName());
    }

    public List<FolderBasicDTO> toDTO(List<Folder> folders) {
        return folders.stream().map(this::toDTO).toList();
    }
}
