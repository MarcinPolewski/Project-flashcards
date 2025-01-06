package com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FolderAccessServiceResponse extends ResourceAccessServiceResponse {
    private Folder folder;

    public FolderAccessServiceResponse( Folder folder, AccessLevel accessLevel, Customer customer) {
        super(accessLevel, customer );
        this.folder = folder;
    }
}
