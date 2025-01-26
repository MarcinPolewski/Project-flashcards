import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { useParams } from "react-router-dom";
import defaultAvatar from "../../../assets/test/test-avatar.png";

import Navbar from "../../Navbar/Navbar";
import CustomerService from "../../../services/CustomerService";
import { useUser } from "../../../contexts/UserContext/UserContext";

const UserProfile = () => {
    const { userId } = useParams();

    const [friends, setFriends] = useState([]);
    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { userData, isLoading } = useUser();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await CustomerService.getFriends(userId);
                console.log("Friends fetched:", response);
                setFriends(response);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchFriends();
    }, [userId]);

    useEffect(() => {
        if (userData) {
            setBio(userData?.bio);
        }
    }, [userData]);

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSaveBio = async () => {
        try {
            await CustomerService.updateBio(bio);
            alert("Bio updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating bio:", error);
            alert("Failed to update bio.");
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="user-profile">
                <div className="user-profile-container">
                    <h2 className="user-profile-title">{userData.username}'s profile</h2>
                    <div className="user-profile-section">
                        <div className="user-profile-section-personal">
                            <div className="user-profile-avatar"><img src={userData.avatar || defaultAvatar} alt="User avatar" /></div>
                            <div className="user-profile-username">{userData.username}</div>
                            <div className="user-profile-email">{userData.email}</div>

                            <div className="user-profile-biography">
                                <h2>{userData.username}'s bio</h2>
                                {isEditing ? (
                                    <>
                                        <textarea
                                            className="user-profile-textarea"
                                            value={bio}
                                            onChange={handleBioChange}
                                            placeholder="Write your bio..."
                                        />
                                        <div className="user-profile-bio-buttons">
                                            <button className="user-profile-button" onClick={handleSaveBio}>Save</button>
                                            <button className="user-profile-button" onClick={() => setIsEditing(false)}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p>{bio || "No bio available"}</p>
                                        <button className="user-profile-button" onClick={handleEditClick}>Edit Bio</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="user-profile-section-friends">
                            <h2 className="user-profile-friends-title">{userData.username}'s friends</h2>
                            {Array.isArray(friends) && friends.length > 0 ?
                                friends.map((friend) => (
                                    <div key={friend.id} className="user-profile-friend-container">
                                        <div className="user-profile-friend-info">
                                            <div className="user-profile-friend-info-avatar">
                                                <img src={friend.avatar || defaultAvatar} alt="Friend avatar" />
                                            </div>
                                            <div className="user-profile-friend-info-username">
                                                {friend.username}
                                            </div>
                                        </div>
                                        <div className="user-profile-friend-message">
                                            <input type="text" placeholder="Send message..." />
                                            <button className="user-profile-button" type="submit">Send</button>
                                        </div>
                                    </div>
                                )) :
                                <p>No friends to display</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
