package com.PAP_team_21.flashcards.entities.friendship;

import java.util.List;

public interface FriendshipDao {

    void save(Friendship friendship);

    Friendship findFriendshipById(int id);

    List<Friendship> findAllFriendships();

    void update(Friendship friendship);

    void deleteFriendshipById(int id);
}
