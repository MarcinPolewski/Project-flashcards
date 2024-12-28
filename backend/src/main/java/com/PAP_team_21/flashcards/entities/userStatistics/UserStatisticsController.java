package com.PAP_team_21.flashcards.entities.userStatistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user_statistics")
public class UserStatisticsController {

    private final UserStatisticsDao userStatisticsDao;

    @Autowired
    public UserStatisticsController(UserStatisticsDao userStatisticsDao) {
        this.userStatisticsDao = userStatisticsDao;
    }

    @GetMapping("/{id}")
    public UserStatistics getUserStatistics(@PathVariable int id) {
        return userStatisticsDao.findUserStatisticsById(id);
    }

    @GetMapping("/user_id/{userId}")
    public UserStatistics getUserStatisticsByUserId(@PathVariable int userId) {
        return userStatisticsDao.findByUserId(userId);
    }

    @PostMapping
    public void saveUserStatistics(@RequestBody UserStatistics userStatistics) {
        userStatisticsDao.save(userStatistics);
    }

    @PostMapping("/{id}")
    public void updateUserStatistics(@PathVariable int id, @RequestBody UserStatistics userStatistics) {
        userStatistics.setId(id);
        userStatisticsDao.update(userStatistics);
    }

    @DeleteMapping("/{id}")
    public void deleteUserStatistics(@PathVariable int id) {
        userStatisticsDao.deleteUserStatisticsById(id);
    }
}
