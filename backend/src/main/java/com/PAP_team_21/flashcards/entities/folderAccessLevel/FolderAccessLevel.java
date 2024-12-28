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

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Folder_Access_Level")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FolderAccessLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "access_level")
    private AccessLevel accessLevel;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "accessLevels")
    private List<Folder> folders;


    public FolderAccessLevel(Customer customer, AccessLevel accessLevel, Folder folder) {
        this.customer = customer;
        this.accessLevel = accessLevel;
        if(this.folders == null)
        {
            folders = new ArrayList<>();
        }

        this.folders.add(folder);
    }
}
