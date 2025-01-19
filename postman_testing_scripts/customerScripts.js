// Tests for GET /customer/findById/{id}
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/findById/") && requestMethod === "GET") {
    const id = requestUrl.split("/").pop();

    // Correct id scenario
    if (pm.response.code === 200) {
        pm.test("Response contains valid customer data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("email");
            pm.expect(jsonData).to.have.property("username");
            pm.expect(jsonData).to.have.property("bio");
        });
    }

    // Not authorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }


    // Incorrect id scenario
    else {
        pm.test("Error message is correct for invalid ID", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.satisfy(function (msg) {
                return msg.includes("Customer not found");
            });
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
//------------------------------------------------------------------
// Test for GET /customer/findByEmail/{email} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;


if (requestUrl.includes("/customer/findByEmail/") && requestMethod === "GET") {
    const id = requestUrl.split("/").pop();

    // Correct email scenario
    if (pm.response.code === 200) {
        pm.test("Response contains valid customer data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("email");
            pm.expect(jsonData).to.have.property("username");
            pm.expect(jsonData).to.have.property("bio");
        });
    }

    // Not authorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }


    // Incorrect email scenario
    else {
        pm.test("Error message is correct for invalid email", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.satisfy(function (msg) {
                return msg.includes("Customer not found");
            });
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test for POST /updateUsername endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/updateUsername") && requestMethod === "POST") {
    // Successful scenario
    if (pm.response.code === 200) {
        const responseText = pm.response.text();
        pm.test("Response contains 'Username updated successfully' message", function () {
            pm.expect(responseText).to.equal("Username updated successfully");
        });
    }

    // Bad Request: Empty username scenario
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        //Check for empty username error message
        pm.test("Response contains 'Username cannot be empty' message", function () {
            pm.expect(responseText).to.equal("Username cannot be empty");
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


// Test for POST /updateBio endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/updateBio") && requestMethod === "POST") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains success message for valid bio update", function () {
            const text = pm.response.text();
            pm.expect(text).to.equal("Biography updated successfully");
        });
    }

    // Bad Request: Empty biography scenario
    else if (pm.response.code === 400) {
        const text = pm.response.text();

        pm.test("Response contains 'Biography cannot be empty' message", function () {
            pm.expect(text).to.equal("Biography cannot be empty");
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test for POST /updateAvatar endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/updateAvatar") && requestMethod === "POST") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains success message for valid avatar update", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("message", "Profile picture updated successfully");
        });
    }

    // Bad Request: Empty avatar scenario
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();

        // Check for unauthenticated user error message
        if (jsonData.message === "No user with this id found") {
            pm.test("Response contains 'No user with this id found' message", function () {
                pm.expect(jsonData.message).to.equal("No user with this id found");
            });
        }
    }

    // Internal Server Error: File upload failure scenario
    else if (pm.response.code === 500) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'Failed to upload avatar' message", function () {
            pm.expect(jsonData.message).to.equal("Failed to upload avatar");
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


//------------------------------------------------------------------
// Test for GET /customer/findByUsername/{username} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/findByUsername/") && requestMethod === "GET") {
    const username = requestUrl.split("/").pop();

    // Correct username scenario
    if (pm.response.code === 200) {
        pm.test("Response contains a list of customers with the specified username", function () {
            const jsonData = pm.response.json();

            pm.expect(jsonData).to.be.an("array");
            pm.expect(jsonData.length).to.be.above(0, "List of customers should not be empty");

            jsonData.forEach(customer => {
                pm.expect(customer).to.have.property("id");
                pm.expect(customer).to.have.property("username");
                pm.expect(customer).to.have.property("email");
                pm.expect(customer).to.have.property("bio");
                pm.expect(customer.username).to.equal(username, "Username should match the requested username");
            });
        });
    }

    // Not authorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }

    // Incorrect username scenario
    else {
        pm.test("Error message is correct for invalid username or no customers found", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.satisfy(function (msg) {
                return msg.includes("No user with this id found") || msg.includes("Customer not found");
            });
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
//------------------------------------------------------------------
// Test for GET /customer/getSelf endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getSelf") && requestMethod === "GET") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the authenticated customer's data", function () {
            const jsonData = pm.response.json();

            pm.expect(jsonData).to.have.property("customer");
            const customer = jsonData.customer;
            pm.expect(customer).to.have.property("id");
            pm.expect(customer).to.have.property("email");
            pm.expect(customer).to.have.property("username");
            pm.expect(customer).to.have.property("accountExpired");
            pm.expect(customer).to.have.property("accountLocked");
            pm.expect(customer).to.have.property("credentialsExpired");
            pm.expect(customer).to.have.property("enabled");
            pm.expect(customer).to.have.property("profileCreationDate");
            pm.expect(customer).to.have.property("profilePicturePath");
            pm.expect(customer).to.have.property("bio");

            pm.expect(jsonData).to.have.property("avatar");
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

// Test akceptowalnego czasu odpowiedzi
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


//------------------------------------------------------------------
// Test for GET /customer/getReceivedFriendships endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getReceivedFriendships") && requestMethod === "GET") {
    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();

        if (jsonData.length === 0) {
            pm.test("Response contains an empty list of received friendships", function () {
                pm.expect(jsonData).to.be.an('array').that.is.empty;
            });
        } else {
            pm.test("Response contains a non-empty list of received friendships", function () {
                pm.expect(jsonData).to.be.an('array').that.is.not.empty;

                jsonData.forEach(friendship => {
                    pm.expect(friendship).to.have.property("id");
                    pm.expect(friendship).to.have.property("senderId");
                    pm.expect(friendship).to.have.property("receiverId");
                    pm.expect(friendship).to.have.property("accepted");
                });
            });
        }
    }

    // Unauthorized
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}


pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for GET /customer/getSentFriendships endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getSentFriendships") && requestMethod === "GET") {
    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();

        if (jsonData.length === 0) {
            pm.test("Response contains an empty list of sent friendships", function () {
                pm.expect(jsonData).to.be.an('array').that.is.empty;
            });
        } else {
            pm.test("Response contains a non-empty list of sent friendships", function () {
                pm.expect(jsonData).to.be.an('array').that.is.not.empty;

                jsonData.forEach(friendship => {
                    pm.expect(friendship).to.have.property("id");
                    pm.expect(friendship).to.have.property("senderId");
                    pm.expect(friendship).to.have.property("receiverId");
                    pm.expect(friendship).to.have.property("accepted");
                });
            });
        }
    }

    // Unauthorized
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for GET /customer/getNotifications endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getNotifications") && requestMethod === "GET") {
    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();

        if (jsonData.length === 0) {
            pm.test("Response contains an empty list of notifications", function () {
                pm.expect(jsonData).to.be.an('array').that.is.empty;
            });
        } else {
            pm.test("Response contains a non-empty list of notifications", function () {
                pm.expect(jsonData).to.be.an('array').that.is.not.empty;

                jsonData.forEach(notification => {
                    pm.expect(notification).to.have.property("id");
                    pm.expect(notification).to.have.property("userId");
                    pm.expect(notification).to.have.property("received");
                    pm.expect(notification).to.have.property("text");
                    pm.expect(notification).to.have.property("receivedDate");
                });
            });
        }
    }

    // Unauthorized
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for GET /customer/getRootFolder endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getRootFolder") && requestMethod === "GET") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the root folder data", function () {
            const jsonData = pm.response.json();

            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("name");
            pm.expect(jsonData).to.have.property("children");

            jsonData.children.forEach(child => {
                pm.expect(child).to.have.property("id");
                pm.expect(child).to.have.property("name");
            });
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


//------------------------------------------------------------------
// Test for GET /customer/getFriends endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getFriends") && requestMethod === "GET") {
    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();

        if (jsonData.length === 0) {
            pm.test("Response contains an empty list of friends", function () {
                pm.expect(jsonData).to.be.an('array').that.is.empty;
            });
        } else {
            pm.test("Response contains a non-empty list of friends", function () {
                pm.expect(jsonData).to.be.an('array').that.is.not.empty;

                jsonData.forEach(friend => {
                    pm.expect(friend).to.have.property("id");
                    pm.expect(friend).to.have.property("username");
                    pm.expect(friend).to.have.property("email");
                });
            });
        }
    }

    // Unauthorized
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for GET /customer/getFriendById/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getFriendById/") && requestMethod === "GET") {

    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the friend data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("username");
            pm.expect(jsonData).to.have.property("email");
        });
    }

    // Bad Request scenarios
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for invalid get friend by ID request", function () {
            if (responseText.includes("No friend with this id found")) {
                pm.expect(responseText).to.include("No friend with this id found");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


//------------------------------------------------------------------
// Test for GET /customer/getFriendByEmail/{email} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/getFriendByEmail/") && requestMethod === "GET") {

    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the friend data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("username");
            pm.expect(jsonData).to.have.property("email");
        });
    }

    // Bad Request scenarios
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for invalid get friend by ID request", function () {
            if (responseText.includes("No friend with this id found")) {
                pm.expect(responseText).to.include("No friend with this id found");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for POST /customer/sendFriendshipOfferById/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/sendFriendshipOfferById/") && requestMethod === "POST") {

    const id = requestUrl.split("/").pop();

    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();
        if (jsonData.friendship && Array.isArray(jsonData.friendship) && jsonData.friendship.length === 0) {
            pm.expect(jsonData.friendship).to.be.an('array').that.is.empty;
        }
        else {
            pm.test("Response contains friendship and notification data", function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.have.property("friendship");
                pm.expect(jsonData).to.have.property("notification");

                const friendship = jsonData.friendship;
                pm.expect(friendship).to.have.property("id");
                pm.expect(friendship).to.have.property("senderId");
                pm.expect(friendship).to.have.property("receiverId");
                pm.expect(friendship).to.have.property("accepted");

                const notification = jsonData.notification;
                pm.expect(notification).to.have.property("id");
                pm.expect(notification).to.have.property("userId");
                pm.expect(notification).to.have.property("received");
                pm.expect(notification).to.have.property("text");
                pm.expect(notification).to.have.property("receivedDate");
            });
        }
    }

    // No user with given ID found or attempt of sending request to yourself
    else if (pm.response.code === 400) {
        pm.test("Error message is correct for invalid friend request", function () {
            const responseText = pm.response.text();

            if (responseText.includes("You cannot send friendship request to yourself")) {
                pm.expect(responseText).to.satisfy(function (msg) {
                    return msg.includes("You cannot send friendship request to yourself");
                });
            } else if (responseText.includes("No user with this id found")) {
                pm.expect(responseText).to.satisfy(function (msg) {
                    return msg.includes("No user with this id found");
                });
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Not authorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


//------------------------------------------------------------------
// Test for POST /customer/sendFriendshipOfferByEmail/{email} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/sendFriendshipOfferByEmail/") && requestMethod === "POST") {


    // Correct scenario
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();
        if (jsonData.friendship && Array.isArray(jsonData.friendship) && jsonData.friendship.length === 0) {
            pm.expect(jsonData.friendship).to.be.an('array').that.is.empty;
        }
        else {
            pm.test("Response contains friendship and notification data", function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.have.property("friendship");
                pm.expect(jsonData).to.have.property("notification");

                const friendship = jsonData.friendship;
                pm.expect(friendship).to.have.property("id");
                pm.expect(friendship).to.have.property("senderId");
                pm.expect(friendship).to.have.property("receiverId");
                pm.expect(friendship).to.have.property("accepted");

                const notification = jsonData.notification;
                pm.expect(notification).to.have.property("id");
                pm.expect(notification).to.have.property("userId");
                pm.expect(notification).to.have.property("received");
                pm.expect(notification).to.have.property("text");
                pm.expect(notification).to.have.property("receivedDate");
            });
        }
    }

    // No user with given ID found or attempt of sending request to yourself
    else if (pm.response.code === 400) {
        pm.test("Error message is correct for invalid friend request", function () {
            const responseText = pm.response.text();

            if (responseText.includes("You cannot send friendship request to yourself")) {
                pm.expect(responseText).to.satisfy(function (msg) {
                    return msg.includes("You cannot send friendship request to yourself");
                });
            } else if (responseText.includes("No user with this email found")) {
                pm.expect(responseText).to.satisfy(function (msg) {
                    return msg.includes("No user with this email found");
                });
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Not authorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//------------------------------------------------------------------
// Test for POST /customer/acceptFriendshipOfferById/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/customer/acceptFriendshipOfferById/") && requestMethod === "POST") {
    const id = requestUrl.split("/").pop();

    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the accepted friendship data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("senderId");
            pm.expect(jsonData).to.have.property("receiverId");
            pm.expect(jsonData).to.have.property("accepted", true);
        });
    }

    // Bad Request scenarios
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for invalid accept friendship request", function () {
            if (responseText.includes("No friendship with this id found")) {
                pm.expect(responseText).to.include("No friendship with this id found");
            } else if (responseText.includes("You are not the receiver of the friendship, you cannot accept it")) {
                pm.expect(responseText).to.include("You are not the receiver of the friendship, you cannot accept it");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});