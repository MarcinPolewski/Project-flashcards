// Test for GET /reviewDeck endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/reviewDeck") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains flashcards data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("flashcards").that.is.an("array");

            // Check that the flashcards array is not empty
            pm.expect(jsonData.flashcards.length).to.be.greaterThan(0);

            // Check that each flashcard contains the expected properties
            jsonData.flashcards.forEach(flashcard => {
                pm.expect(flashcard).to.have.property("flashcardId");
                pm.expect(flashcard).to.have.property("front");
                pm.expect(flashcard).to.have.property("back");
            });
        });
    }

    // Bad Request: Invalid batch size scenario (400 Bad Request)
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();

        // Check for "Batch size must be at least 10" error message
        if (jsonData.message === "Batch size must be at least 10") {
            pm.test("Response contains 'Batch size must be at least 10' message", function () {
                pm.expect(jsonData.message).to.equal("Batch size must be at least 10");
            });
        }

        // Check for "You do not have access to this deck" error message
        else if (jsonData.message === "You do not have access to this deck") {
            pm.test("Response contains 'You do not have access to this deck' message", function () {
                pm.expect(jsonData.message).to.equal("You do not have access to this deck");
            });
        }
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test for POST /flashcardReviewed endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcardReviewed") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Flashcard has been successfully reviewed", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData.message).to.equal("Flashcard reviewed.");
        });
    }

    // Bad Request: Invalid flashcardId or userAnswer scenario (400 Bad Request)
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();

        // Check for "You do not have access to this flashcard" error message
        if (jsonData.message === "You do not have access to this flashcard") {
            pm.test("Response contains 'You do not have access to this flashcard' message", function () {
                pm.expect(jsonData.message).to.equal("You do not have access to this flashcard");
            });
        }

        // Check for "Batch size must be at least 10" error message (if applicable)
        else if (jsonData.message === "Batch size must be at least 10") {
            pm.test("Response contains 'Batch size must be at least 10' message", function () {
                pm.expect(jsonData.message).to.equal("Batch size must be at least 10");
            });
        }
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
