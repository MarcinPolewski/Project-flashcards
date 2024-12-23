package com.PAP_team_21.flashcards.entities.folderUser;


import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Folders_Users")
@Getter
@Setter
public class FolderUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    //@Column(name = "user_id")
    @ManyToOne
    @JoinColumn(name="user_id")
    private Customer customer;

    //@Column(name = "flashcard_folder_id")
    @ManyToOne
    @JoinColumn(name="flashcard_folder_id")
    private Folder flashcardFolder;

    @Column(name = "access_level")
    @Enumerated(EnumType.ORDINAL)
    private AccessLevel accessLevel;

    // @Column(name = "parent_folder_id", insertable = false, updatable = false)
    @ManyToOne
    @JoinColumn(name="parent_folder_id")
    private Folder parentFolder;
    public FolderUser() {}

    public FolderUser(Customer customer, Folder flashcardFolder,AccessLevel accessLevel, Folder parentFolder) {
        this.customer = customer;
        this.flashcardFolder = flashcardFolder;
        this.accessLevel = accessLevel;
        this.parentFolder = parentFolder;
    }
}
