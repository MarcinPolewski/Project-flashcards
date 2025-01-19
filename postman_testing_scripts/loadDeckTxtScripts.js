// Test for POST /loadDeckTxt endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/loadDeckTxt") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();
        pm.test("Response contains deck data", function () {
            pm.expect(jsonData).to.be.an("array").that.is.not.empty;
            jsonData.forEach(deck => {
                pm.expect(deck).to.have.property("id");
                pm.expect(deck).to.have.property("deckId");
                pm.expect(deck).to.have.property("front");
                pm.expect(deck).to.have.property("back");
            });
        });
    }

    // Bad Request: User not found (400 Bad Request)
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'No user with this id found' message", function () {
            pm.expect(jsonData.message).to.equal("No user with this id found");
        });
    }

    // Forbidden: User does not have access to folder (403 Forbidden)
    else if (pm.response.code === 403) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'You do not have access to this deck' message", function () {
            pm.expect(jsonData.message).to.equal("You do not have access to this deck");
        });
    }

    // Not Found: Folder not found (404 Not Found)
    else if (pm.response.code === 404) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'No folder with this id found' message", function () {
            pm.expect(jsonData.message).to.equal("No folder with this id found");
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
