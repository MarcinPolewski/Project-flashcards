package com.PAP_team_21.flashcards.entities.userPreferences;

public interface UserPreferencesDao {

    void save(UserPreferences userPreferences);

    UserPreferences findUserPreferencesById(int id);

    UserPreferences findByUserId(int userId);

    void update(UserPreferences userPreferences);

    void deleteUserPreferencesById(int id);
}
