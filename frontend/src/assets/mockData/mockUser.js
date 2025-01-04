const mockUser = {
    findByUsername: (username) => (
        [
            {
              "id": 1,
              "username": "john_doe",
              "email": "john.doe@example.com"
            },
            {
              "id": 2,
              "username": "jane_doe",
              "email": "jane.doe@example.com"
            }
          ]
    ),
    getSelf: () => (
        {
            "id": 1,
            "email": "kacper@polska.pl",
            "username": "kacper123",
            "accountExpired": false,
            "accountLocked": false,
            "credentialsExpired": false,
            "enabled": true,
            "profilePicturePath": '../test/test-avatar.png'
          }
    ),
    getReceivedFriendships: () => (
        [
            {
              "id": 1,
              "senderId": 2,
              "ReceiverId": 3,
              "accepted": true
            },
            {
              "id": 2,
              "senderId": 3,
              "ReceiverId": 4,
              "accepted": false
            }
          ]
    ),
    getSentFriendships: () => (
        [
            {
              "id": 1,
              "senderId": 2,
              "ReceiverId": 3,
              "accepted": true
            },
            {
              "id": 2,
              "senderId": 3,
              "ReceiverId": 4,
              "accepted": false
            }
          ]
    ),
    getNotifications: () => (
        [
            {
                "id": 1,
                "userId": 2,
                "received": true,
                "text": "Hello",
                "ReceivedDate": "2025-01-04 14:23:45"
            },
            {
                "id": 2,
                "userId": 3,
                "received": false,
                "text": "Bye",
                "ReceivedDate": "2025-01-04 14:23:45"
            }
          ]
    ),
    getFriends: () => (
        [
            {
              "id": 1,
              "username": "john_doe",
              "email": "john.doe@example.com"
            },
            {
              "id": 2,
              "username": "jane_doe",
              "email": "jane.doe@example.com"
            }
          ]
    ),
    getFriendById: (id) => (
        {
            "id": 1,
            "username": "john_doe",
            "email": "john.doe@example.com"
          }
    )
}

export default mockUser;