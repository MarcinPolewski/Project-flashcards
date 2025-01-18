// Test for GET /reviewLog/getReviewLog/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/reviewLog/getReviewLog/") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Review log retrieved successfully", function () {
            const jsonData = pm.response.json();

            // Validate the structure of the response
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("flashcardId").that.is.a("number");
            pm.expect(jsonData).to.have.property("userId").that.is.a("number");
            pm.expect(jsonData).to.have.property("when").that.is.a("string");
            pm.expect(jsonData).to.have.property("userAnswer").that.is.a("number");
        });
    }

    // Bad Request scenario (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        if (responseText === "No User with this id found") {
            pm.test("Error message for user not found", function () {
                pm.expect(responseText).to.equal("No User with this id found");
            });
        }

        else if (responseText === "No reviewLog with this id found") {
            pm.test("Error message for review log not found", function () {
                pm.expect(responseText).to.equal("No reviewLog with this id found");
            });
        }

        else if (responseText === "You do not have access to this flashcard") {
            pm.test("Error message for access denied to flashcard", function () {
                pm.expect(responseText).to.equal("You do not have access to this flashcard");
            });
        }
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


// Test for DELETE /reviewLog/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/reviewLog/delete") && requestMethod === "DELETE") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Review log deleted successfully", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("ReviewLog deleted successfully");
        });
    }

    // Bad Request scenario (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        if (responseText === "No User with this id found") {
            pm.test("Error message for user not found", function () {
                pm.expect(responseText).to.equal("No User with this id found");
            });
        }

        else if (responseText === "No reviewLog with this id found") {
            pm.test("Error message for review log not found", function () {
                pm.expect(responseText).to.equal("No reviewLog with this id found");
            });
        }

        else if (responseText === "This reviewLog does not belong to the user") {
            pm.test("Error message for review log not belonging to the user", function () {
                pm.expect(responseText).to.equal("This reviewLog does not belong to the user");
            });
        }
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