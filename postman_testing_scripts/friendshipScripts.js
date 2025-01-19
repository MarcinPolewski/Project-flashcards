// Test for GET /friendship/getFriendship/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/friendship/getFriendship") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Get friendship details successful", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.be.an("object");
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("senderId").that.is.a("number");
            pm.expect(jsonData).to.have.property("receiverId").that.is.a("number");
            pm.expect(jsonData).to.have.property("accepted").that.is.a("boolean");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Check for specific error messages
        if (responseText === "No friendship with this id found") {
            pm.test("Error message for friendship not found", function () {
                pm.expect(responseText).to.equal("No friendship with this id found");
            });
        }

        else if (responseText === "No user with this id found") {
            pm.test("Error message for user not found", function () {
                pm.expect(responseText).to.equal("No user with this id found");
            });
        }

        else {
            pm.test("Error message for insufficient access", function () {
                pm.expect(responseText).to.equal("User do not have access to this friendship");
            });
        }
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
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

// -------------------------------------------
// Test for DELETE /friendship/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/friendship/delete") && requestMethod === "DELETE") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Friendship delete successful", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("Friendship successfully deleted");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Check for specific error messages
        if (responseText === "No friendship with this id found") {
            pm.test("Error message for friendship not found", function () {
                pm.expect(responseText).to.equal("No friendship with this id found");
            });
        }

        else {
            pm.test("Error message for insufficient access", function () {
                pm.expect(responseText).to.equal("User do not have access to this friendship");
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
