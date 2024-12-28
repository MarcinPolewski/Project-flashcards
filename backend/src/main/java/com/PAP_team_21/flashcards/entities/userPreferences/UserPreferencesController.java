package com.PAP_team_21.flashcards.entities.userPreferences;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user_preferences")
public class UserPreferencesController {

    private final UserPreferencesDao userPreferencesDao;

    @Autowired
    public UserPreferencesController(UserPreferencesDao userPreferencesDao) {
        this.userPreferencesDao = userPreferencesDao;
    }

    @GetMapping("/{id}")
    public UserPreferences getUserPreferences(@PathVariable int id) {
        return userPreferencesDao.findUserPreferencesById(id);
    }

    @GetMapping("/user_id/{userId}")
    public UserPreferences getUserPreferencesByUserId(@PathVariable int userId) {
        return userPreferencesDao.findByUserId(userId);
    }

    @PostMapping
    public void saveUserPreferences(@RequestBody UserPreferences userPreferences) {
        userPreferencesDao.save(userPreferences);
    }

    @PostMapping("/{id}")
    public void updateUserPreferences(@PathVariable int id, @RequestBody UserPreferences userPreferences) {
        userPreferences.setId(id);
        userPreferencesDao.update(userPreferences);
    }

    @DeleteMapping("/{id}")
    public void deleteUserPreferences(@PathVariable int id) {
        userPreferencesDao.deleteUserPreferencesById(id);
    }
}
