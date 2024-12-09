package com.PAP_team_21.flashcards.notification;

import java.util.List;

public interface NotificationDao {

    void save(Notification notification);

    Notification findById(int id);

    List<Notification> findAllOfUser(int user_id);

    List<Notification> findAllNotifications();

    void update(Notification notification);

    void deleteNotificationById(int id);
}
