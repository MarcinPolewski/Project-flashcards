package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.folderUser.FolderUser;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Folders")
@Getter
@Setter
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "folder", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<FolderUser> folderUsers;

    @ManyToMany(mappedBy = "folders", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Deck> decks;

    @ManyToMany
    @JoinTable(
            name = "Folders_Users",
            joinColumns = @JoinColumn(name = "flashcard_folder_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Customer> customers;

    public Folder() {}

    public Folder(String name) {
        this.name = name;
    }
}
