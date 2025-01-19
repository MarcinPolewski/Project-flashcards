// Test for GET /deck/flashcards endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/flashcards") && requestMethod === "GET") {
    const deckId = pm.request.url.query.find(param => param.key === "deckId").value;

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains flashcards from the specified deck", function () {
            const jsonData = pm.response.json();
            if (jsonData.length === 0) {
                pm.expect(jsonData).to.be.an('array').that.is.empty;
            }
            else {
                pm.expect(jsonData).to.be.an("array").that.is.not.empty;
                jsonData.forEach(flashcard => {
                    pm.expect(flashcard).to.have.property("id");
                    pm.expect(flashcard).to.have.property("front");
                    pm.expect(flashcard).to.have.property("back");

                });
            }
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for invalid deck ID", function () {
            if (responseText.includes("Deck not found")) {
                pm.expect(responseText).to.include("Deck not found");
            } else if (responseText.includes("You do not have access to this deck")) {
                pm.expect(responseText).to.include("You do not have access to this deck");
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

//------------------------------------------------------------------
// Test for GET /deck/getLastUsed endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/getLastUsed") && requestMethod === "GET") {
    const howMany = pm.request.url.query.find(param => param.key === "howMany") ? pm.request.url.query.find(param => param.key === "howMany").value : 3; // default to 3 if not specified

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains last used decks in correct order", function () {
            const jsonData = pm.response.json();
            if (jsonData.flashcard && Array.isArray(jsonData.flashcard) && jsonData.flashcard.length === 0) {
                pm.expect(jsonData.flashcard).to.be.an('array').that.is.empty;
            }
            else {
                jsonData.forEach((deck) => {
                    pm.expect(deck).to.have.property("id");
                    pm.expect(deck).to.have.property("name");
                });
            }
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for invalid customer or invalid 'howMany' value", function () {
            if (responseText.includes("Customer not found")) {
                pm.expect(responseText).to.include("Customer not found");
            } else if (responseText.includes("howMany must be greater than 0")) {
                pm.expect(responseText).to.include("howMany must be greater than 0");
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


//------------------------------------------------------------------
// Test for POST /deck/create endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/create") && requestMethod === "POST") {
    const requestBody = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains the created deck", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("name", requestBody.name);
            pm.expect(jsonData.id).to.be.a("number").that.is.greaterThan(0);
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to create a deck here")) {
                pm.expect(responseText).to.include("You do not have permission to create a deck here");
            } else if (responseText.includes("No folder with this id found")) {
                pm.expect(responseText).to.include("Folder not found");
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


// Test for POST /deck/update endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/update") && requestMethod === "POST") {
    const requestBody = pm.request.body.raw ? JSON.parse(pm.request.body.raw) : {};

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains the updated deck", function () {
            const jsonData = pm.response.json();
            if (jsonData.flashcard && Array.isArray(jsonData.flashcard) && jsonData.flashcard.length === 0) {
                pm.expect(jsonData.flashcard).to.be.an('array').that.is.empty;
            }
            else {
                jsonData.forEach(deck => {
                    pm.expect(deck).to.have.property("id");
                    pm.expect(deck).to.have.property("deckId");
                    pm.expect(deck).to.have.property("front");
                    pm.expect(deck).to.have.property("back");
                });
            }
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to update this deck")) {
                pm.expect(responseText).to.include("You do not have permission to update this deck");
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

// Test for DELETE /deck/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/delete") && requestMethod === "DELETE") {
    const deckId = pm.request.url.query.find(param => param.key === "deckId").value;

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response confirms deck deletion", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.include("deck deleted");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message is correct for different error scenarios", function () {
            if (responseText.includes("You do not have permission to delete this deck")) {
                pm.expect(responseText).to.include("You do not have permission to delete this deck");
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

// Test for GET /deck/getDeck endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/getDeck") && requestMethod === "GET") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains valid deck information", function () {
            const jsonData = pm.response.json();

            // Validate the deck object
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("name").that.is.a("string");
            pm.expect(jsonData).to.have.property("cards").that.is.an("array");
            pm.expect(jsonData).to.have.property("creationDate").that.is.a("string");

            // Validate the cards array
            jsonData.cards.forEach(card => {
                pm.expect(card).to.have.property("id").that.is.a("number");
                pm.expect(card).to.have.property("question").that.is.a("string");
                pm.expect(card).to.have.property("answer").that.is.a("string");
            });
        });
    }

    // Bad Request: Insufficient permissions
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Response contains an appropriate error message", function () {
            pm.expect(responseText).to.equal("You do not have permission to get this deck");
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

// Ensure response time is acceptable
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


// Test for GET /deck/getInfo endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/deck/getDeckInfo") && requestMethod === "GET") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains valid customer and deck information", function () {
            const jsonData = pm.response.json();

            // Validate the customer information
            pm.expect(jsonData).to.have.property("customer");
            pm.expect(jsonData.customer).to.have.property("id").that.is.a("number");
            pm.expect(jsonData.customer).to.have.property("name").that.is.a("string");
            pm.expect(jsonData.customer).to.have.property("email").that.is.a("string");

            // Validate the deck information
            pm.expect(jsonData).to.have.property("deck");
            pm.expect(jsonData.deck).to.have.property("id").that.is.a("number");
            pm.expect(jsonData.deck).to.have.property("name").that.is.a("string");
            pm.expect(jsonData.deck).to.have.property("cardCount").that.is.a("number");
            pm.expect(jsonData.deck).to.have.property("creationDate").that.is.a("string");
        });
    }

    // Bad Request: Insufficient permissions or deck not found
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Response contains an appropriate error message", function () {
            const expectedMessages = [
                "You do not have permission to get this deck",
                "Deck with ID 123 not found"
            ];
            pm.expect(expectedMessages).to.include(responseText);
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

// Ensure response time is acceptable
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});