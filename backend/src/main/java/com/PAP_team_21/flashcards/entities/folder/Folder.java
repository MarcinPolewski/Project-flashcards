package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

//    @OneToMany(mappedBy = "parentFolder", fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
//                        CascadeType.DETACH, CascadeType.REFRESH})
//    private List<FolderUser> folderUsers;

    @ManyToMany(mappedBy = "folders", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Deck> decks;

    @ManyToMany
    @JoinTable(
            name = "Folder_Parent",
            joinColumns = @JoinColumn(name = "child_folder_id"),
            inverseJoinColumns = @JoinColumn(name = "parent_folder_id")
    )
    private Set<Folder> parents;

    @ManyToMany(mappedBy = "parents")
    private Set<Folder> children;

    @ManyToOne
    @JoinColumn(name = "access_specyfing_folder_id")
    private Folder accessSpecyfingFolder;

    public Folder() {
    }

    public Folder(String name) {
        this.name = name;
    }

    public Folder(String name, Folder accessSpecyfingFolder) {
        this.name = name;
        this.accessSpecyfingFolder = accessSpecyfingFolder;
    }

    @PrePersist
    public void prePersist(){
        if(this.accessSpecyfingFolder == null)
        {
            this.accessSpecyfingFolder = this;
        }
    }

}
