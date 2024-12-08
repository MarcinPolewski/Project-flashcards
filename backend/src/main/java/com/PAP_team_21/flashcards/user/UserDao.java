package com.PAP_team_21.flashcards.user;

import java.util.List;

public interface UserDao {

    void save(User user);

    User findUserById(int id);

    User findUserByEmail(String email);

    User findUserByUsername(String username);

    List<User> findAllUsers();

    void update(User user);

    void deleteUserById(int id);
}
