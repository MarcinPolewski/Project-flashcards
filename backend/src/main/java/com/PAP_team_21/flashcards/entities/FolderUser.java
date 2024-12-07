package com.PAP_team_21.flashcards.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Folder_Users")
@Getter
@Setter
public class FolderUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "flashcard_folder_id")
    private int flashcardFolderId;

    @Column(name = "access_level")
    private int accessLevel;

    @Column(name = "parent_folder_id")
    private int parentFolderId;

    @ManyToOne
    @JoinColumn(name = "parent_folder_id")
    private Folder folder;

    public FolderUser() {}

    public FolderUser(int userId, int flashcardFolderId, int accessLevel, int parentFolderId) {
        this.userId = userId;
        this.flashcardFolderId = flashcardFolderId;
        this.accessLevel = accessLevel;
        this.parentFolderId = parentFolderId;
    }
}
