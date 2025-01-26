package com.PAP_team_21.flashcards.controllers.DTO;

import com.PAP_team_21.flashcards.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class ShareFolderDTO implements Serializable {
    private String senderEmail;
    private String addresseeEmail;
    private int folderId;
    private AccessLevel accessLevel;
}
