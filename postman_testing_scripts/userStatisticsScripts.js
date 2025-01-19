// Test for GET /userStatistics/getUserStatistics endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/userStatistics/getUserStatistics") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("User statistics retrieved successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("totalTimeSpent").that.is.a("number");
            pm.expect(jsonData).to.have.property("loginCount").that.is.a("number");
            pm.expect(jsonData).to.have.property("lastLogin").that.is.a("string");
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


// Test for POST /userStatistics/update endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/userStatistics/update") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("User statistics updated successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("totalTimeSpent").that.is.a("number");
            pm.expect(jsonData).to.have.property("loginCount").that.is.a("number");
            pm.expect(jsonData).to.have.property("lastLogin").that.is.a("string");
        });

        pm.test("User statistics values are updated correctly", function () {
            const jsonData = pm.response.json();

            pm.expect(jsonData.totalTimeSpent).to.equal(3);
            pm.expect(jsonData.loginCount).to.equal(2);
            pm.expect(jsonData.lastLogin).to.equal("2025-01-04 14:23:45");
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