package com.PAP_team_21.flashcards.entities.folderAccessLevel;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name="Folder_Access_Level")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert

public class FolderAccessLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @Column(name = "access_level")
    private AccessLevel accessLevel;

    public FolderAccessLevel(Customer customer, Folder folder, AccessLevel accessLevel) {
        this.customer = customer;
        this.folder = folder;
        this.accessLevel = accessLevel;
    }
}
