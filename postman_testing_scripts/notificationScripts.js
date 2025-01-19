// Test for GET /notification/getNotification/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/notification/getNotification") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Notification retrieval successful", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("received").that.is.a("boolean");
            pm.expect(jsonData).to.have.property("text").that.is.a("string");
            pm.expect(jsonData).to.have.property("receivedDate").that.is.a("string");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Check for specific error messages
        if (responseText === "No notification with this id found") {
            pm.test("Error message for notification not found", function () {
                pm.expect(responseText).to.equal("No notification with this id found");
            });
        }

        else {
            pm.test("Error message for unauthorized access", function () {
                pm.expect(responseText).to.equal("This notification does not belong to the user");
            });
        }
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
        // Check if the response is empty for unauthorized requests
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

// Test response time
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


// Test for POST /notification/create endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/notification/create") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Notification created successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("received").that.is.a("boolean");
            pm.expect(jsonData).to.have.property("text").that.is.a("string");
            pm.expect(jsonData).to.have.property("receivedDate").that.is.a("string");
        });

        pm.test("Notification text matches request", function () {
            const jsonData = pm.response.json();
            const requestBody = pm.request.body ? JSON.parse(pm.request.body.raw) : {};
            pm.expect(jsonData.text).to.equal(requestBody.text);
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();
        pm.test("Error message for self-notification", function () {
            pm.expect(responseText).to.equal("You cannot send notification to yourself");
        });
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
        // Check if the response is empty for unauthorized requests
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

// Test response time
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


// Test for DELETE /notification/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/notification/delete") && requestMethod === "DELETE") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Notification deleted successfully", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("Notification successfully deleted");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Error message for notification not found
        if (responseText === "No notification with this id found") {
            pm.test("Error message for notification not found", function () {
                pm.expect(responseText).to.equal("No notification with this id found");
            });
        }

        // Error message for user not found
        else if (responseText === "No user with this id found") {
            pm.test("Error message for user not found", function () {
                pm.expect(responseText).to.equal("No user with this id found");
            });
        }

        // Error message for notification not belonging to the user
        else {
            pm.test("Error message for notification not belonging to the user", function () {
                pm.expect(responseText).to.equal("This notification does not belong to user");
            });
        }
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
        // Check if the response is empty for unauthorized requests
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

// Test response time
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
