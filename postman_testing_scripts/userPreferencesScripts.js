// Test for GET /userPreferences/getUserPreferences endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/userPreferences/getUserPreferences") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("User preferences retrieved successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("darkMode").that.is.a("boolean");
            pm.expect(jsonData).to.have.property("language").that.is.a("number");
        });
    }

    // Bad Request scenario (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();
        pm.test("Error message for user not found", function () {
            pm.expect(responseText).to.equal("No User with this id found");
        });
    }

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


// Test for POST /userPreferences/update endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/userPreferences/update") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("User preferences updated successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("darkMode").that.is.a("boolean");
            pm.expect(jsonData).to.have.property("language").that.is.a("number");
        });

        pm.test("Updated preferences match request", function () {
            const jsonData = pm.response.json();
            const requestBody = pm.request.body ? JSON.parse(pm.request.body.raw) : {};

            pm.expect(jsonData.darkMode).to.equal(requestBody.darkMode);
            pm.expect(jsonData.language).to.equal(requestBody.language);
        });
    }


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
