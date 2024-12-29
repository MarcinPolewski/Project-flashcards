package com.PAP_team_21.flashcards.entities.deck;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "Decks")
@Getter
@Setter
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "deck", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Flashcard> flashcards;

    @ManyToMany
    @JoinTable(
            name = "Folders_Decks",
            joinColumns = @JoinColumn(name = "deck_id"),
            inverseJoinColumns = @JoinColumn(name = "folder_id")
    )
    private List<Folder> folders;

    public static Comparator<Deck> comparatorBy(String fieldName, boolean ascending) throws IllegalArgumentException
    {
        Comparator<Deck> comparator =  switch (fieldName) {
            case "name" -> Comparator.comparing(Deck::getName);
            case "id" -> Comparator.comparing(Deck::getId);
            default -> throw new IllegalArgumentException("Unknown field name: " + fieldName);
        };

        return ascending ? comparator : comparator.reversed();
    }

    public AccessLevel getAccessLevel(Customer customer) {
        // check if user has access to any of the parent folders
        for(Folder folder : folders) {
            if(folder.getAccessLevel(customer) != null) {
                return folder.getAccessLevel(customer);
            }
        }
        return null;
    }

    public List<Flashcard> getFlashcards(int page, int size, String sortBy, boolean ascending) throws IllegalArgumentException {
        return flashcards.stream()
                .skip((long) page * size)
                .sorted(Flashcard.comparatorBy(sortBy, ascending))
                .limit(size)
                .collect(Collectors.toList());
        //return decks.stream().;

    }

    public Deck() {}

    public Deck(String name, Folder parentFolder) {
        if(this.folders == null)
        {
            this.folders = new ArrayList<>();
        }
        this.folders.add(parentFolder);
        this.name = name;
    }
}
