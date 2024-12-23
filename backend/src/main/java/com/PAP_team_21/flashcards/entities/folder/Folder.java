package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.AccessLevel;
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

    @OneToMany(mappedBy = "parentFolder", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<FolderUser> folderUsers;

    @ManyToMany(mappedBy = "folders", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Deck> decks;

    public Folder() {}

    public Folder(String name, Customer customer, AccessLevel accessLevel, Folder parentFolder) {
        this.name = name;
        this.folderUsers.add(new FolderUser(customer, this, accessLevel, parentFolder));
    }
    public Folder(String name) {
        this.name = name;
    }
}
