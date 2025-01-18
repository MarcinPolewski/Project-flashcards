// Test for POST /flashcard/create endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcard/create") && requestMethod === "POST") {
    const requestBody = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains the created flashcard", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("deckId", requestBody.deckId);
            pm.expect(jsonData).to.have.property("front", requestBody.front);
            pm.expect(jsonData).to.have.property("back", requestBody.back);
            pm.expect(jsonData.id).to.be.a("number").that.is.greaterThan(0);
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to create a deck here")) {
                pm.expect(responseText).to.include("You do not have permission to create a deck here");
            } else if (responseText.includes("No deck with this id found")) {
                pm.expect(responseText).to.include("No deck with this id found");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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


// Test for POST /flashcard/update endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcard/update") && requestMethod === "POST") {
    const requestBody = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains the updated flashcard", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id", requestBody.flashcardId);
            pm.expect(jsonData).to.have.property("deckId");
            pm.expect(jsonData).to.have.property("front", requestBody.front);
            pm.expect(jsonData).to.have.property("back", requestBody.back);
            pm.expect(jsonData.id).to.be.a("number").that.is.greaterThan(0);
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to create a deck here")) {
                pm.expect(responseText).to.include("You do not have permission to create a deck here");
            } else if (responseText.includes("No flashcard with this id found")) {
                pm.expect(responseText).to.include("No flashcard with this id found");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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


// Test for DELETE /flashcard/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcard/delete") && requestMethod === "DELETE") {
    const requestParams = pm.request.url.query.toObject();

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains success message", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("deleted successfully");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to delete this flashcard")) {
                pm.expect(responseText).to.include("You do not have permission to delete this flashcard");
            } else if (responseText.includes("No flashcard with this id found")) {
                pm.expect(responseText).to.include("No flashcard with this id found");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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


// Test for POST /flashcard/copyFlashcardToDeck endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcard/copyFlashcardToDeck") && requestMethod === "POST") {
    const requestParams = pm.request.url.query.toObject();

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains success message", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("copied successfully");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to add to this deck")) {
                pm.expect(responseText).to.include("You do not have permission to add to this deck");
            } else if (responseText.includes("You do not have permission to add this flashcard")) {
                pm.expect(responseText).to.include("You do not have permission to add this flashcard");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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

// Test for POST /flashcard/moveFlashcardToOtherDeck endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcard/moveFlashcardToOtherDeck") && requestMethod === "POST") {
    const requestParams = pm.request.url.query.toObject();

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains success message", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("flashcard moved");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to edit this deck")) {
                pm.expect(responseText).to.include("You do not have permission to edit this deck");
            } else if (responseText.includes("You do not have permission to move this flashcard")) {
                pm.expect(responseText).to.include("You do not have permission to move this flashcard");
            } else if (responseText.includes("Flashcard is not in source deck")) {
                pm.expect(responseText).to.include("Flashcard is not in source deck");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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


// Test for GET /flashcardProgress/getFlashcardProgress/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/flashcardProgress/getFlashcardProgress/") && requestMethod === "GET") {
    const requestId = requestUrl.split("/").pop(); // Extracting the ID from the URL

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains valid flashcard progress data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("flashcardId").that.is.a("number");
            pm.expect(jsonData).to.have.property("nextReview").that.is.a("string");
            pm.expect(jsonData).to.have.property("valid").that.is.a("boolean");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("No flashcard progress with this id found")) {
                pm.expect(responseText).to.include("No flashcard progress with this id found");
            } else if (responseText.includes("You dont have access to this flashcard")) {
                pm.expect(responseText).to.include("You dont have access to this flashcard");
            } else {
                pm.expect.fail("Unexpected error message: " + responseText);
            }
        });
    }

    // Unauthorized scenario (401)
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