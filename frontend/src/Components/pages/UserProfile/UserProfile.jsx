import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { useParams } from "react-router-dom";
import defaultAvatar from "../../../assets/test/test-avatar.png";

import Navbar from "../../Navbar/Navbar";
import CustomerService from "../../../services/CustomerService";

const UserProfile = () => {
    const { userId } = useParams();

    const [friends, setFriends] = useState([]);

    const { userData, isLoading } = useUser();

    // TODO add a useEffect hook to fetch user data from userId and friends

     if (!userData) {
        return <div>Loading...</div>;
    }

    return <div className="user-profile">
        <Navbar/>
        <div className="user-profile-container">
            <h2 className="user-profile-title">{userData.username}'s profile</h2>
            <div className="user-profile-section">
                <div className="user-profile-section-personal">
                    <div className="user-profile-avatar"><img src={userData.avatar || defaultAvatar} alt="User avatar" /></div>
                    <div className="user-profile-username">{userData.username}</div>
                    <div className="user-profile-email">{userData.email}</div>
                    <div className="user-profile-biography">{userData.biography}</div>
                </div>

                <div className="user-profile-section-friends">
                    <h2 className="user-profile-friends-title">{userData.username}'s friends</h2>
                    {
                        friends && friends.length > 0 ?
                        friends.map((friend) => (
                            <div key={friend.id} className="user-profile-friend-container">
                                <div className="user-profile-friend-info">

                                    <div className="user-profile-friend-info-avatar">
                                        <img src={friend.avatar || defaultAvatar} alt="User avatar" />
                                    </div>

                                    <div className="user-profile-friend-info-username">
                                        {friend.username}
                                    </div>

                                </div>
                                <div className="user-profile-friend-message">
                                    <input type="text" placeholder="Send message.."/>
                                    <button type="submit">Send</button>
                                </div>
                            </div>
                        ))
                        :
                        <p>No friends to display</p>
                    }
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default UserProfile;