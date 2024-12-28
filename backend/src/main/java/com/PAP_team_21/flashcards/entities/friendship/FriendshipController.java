package com.PAP_team_21.flashcards.entities.friendship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {

    private final FriendshipDao friendshipDao;

    @Autowired
    public FriendshipController(FriendshipDao friendshipDao) {
        this.friendshipDao = friendshipDao;
    }

    @GetMapping("/{id}")
    public Friendship getFriendship(@PathVariable int id) {
        return friendshipDao.findFriendshipById(id);
    }

    @GetMapping
    public List<Friendship> getFriendship() {
        return friendshipDao.findAllFriendships();
    }

    @PostMapping
    public void saveFriendship(@RequestBody Friendship friendship) {
        friendshipDao.save(friendship);
    }

    @PostMapping("/{id}")
    public void updateFriendship(@PathVariable int id, @RequestBody Friendship friendship) {
        friendship.setId(id);
        friendshipDao.save(friendship);
    }

    @DeleteMapping("/{id}")
    public void deleteFriendship(@PathVariable int id) {
        friendshipDao.deleteFriendshipById(id);
    }
}
