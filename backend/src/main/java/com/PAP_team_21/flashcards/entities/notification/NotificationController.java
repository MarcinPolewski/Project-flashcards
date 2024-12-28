package com.PAP_team_21.flashcards.entities.notification;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationDao notificationDao;

    @Autowired
    public NotificationController(NotificationDao notificationDao) {
        this.notificationDao = notificationDao;
    }

    @GetMapping("/{id}")
    public Notification getNotificationDao(@PathVariable int id) {
        return notificationDao.findNotificationById(id);
    }

    @GetMapping("/user_id/{userId}")
    public List<Notification> getNotificationDaoByUserId(@PathVariable int userId) {
        return notificationDao.findAllOfUser(userId);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationDao.findAllNotifications();
    }

    @PostMapping
    public void saveNotification(@RequestBody Notification notification) {
        notificationDao.save(notification);
    }

    @PostMapping("/{id}")
    public void updateNotification(@PathVariable int id, @RequestBody Notification notification) {
        notification.setId(id);
        notificationDao.save(notification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable int id) {
        notificationDao.deleteNotificationById(id);
    }
}
