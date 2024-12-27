package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Folders")
@Getter
@Setter
@DynamicInsert
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

//    @OneToMany(mappedBy = "parentFolder", fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
//                        CascadeType.DETACH, CascadeType.REFRESH})
//    private List<FolderUser> folderUsers;

    @ManyToMany(mappedBy = "folders", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Deck> decks;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Folder_Parent",
            joinColumns = @JoinColumn(name = "child_folder_id"),
            inverseJoinColumns = @JoinColumn(name = "parent_folder_id")
    )
    private Set<Folder> parents;

    @ManyToMany(mappedBy = "parents", cascade = CascadeType.ALL)
    private Set<Folder> children;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "access_specyfing_folder_id")
    private FolderAccessLevel accessLevel;

    public Folder() {
    }
    public Folder(String name, Customer customer) {
        this.name = name;
        this.accessLevel = new FolderAccessLevel(customer, this, AccessLevel.OWNER);
    }

    public Folder(String name, FolderAccessLevel accessSpecyfingFolder) {
        this.name = name;
        this.accessLevel = accessSpecyfingFolder;
    }

}
