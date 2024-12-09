package com.PAP_team_21.flashcards.folder;

import java.util.List;

public interface FolderDao {

    void save(Folder folder);

    Folder findById(int id);

    List<Folder> findAllFolders();

    void update(Folder folder);

    void deleteFolderById(int id);
}
