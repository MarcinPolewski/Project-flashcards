// Test for GET /generateTxt/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/generateTxt/") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response is a downloadable TXT file", function () {
            const headers = pm.response.headers;
            const contentDisposition = headers.get("Content-Disposition");
            const contentType = headers.get("Content-Type");

            pm.expect(contentDisposition).to.include("attachment");
            pm.expect(contentDisposition).to.include(".txt");
            pm.expect(contentType).to.equal("application/txt");
        });
    }

    // Bad Request: User not found (400 Bad Request)
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'No user with this id found' message", function () {
            pm.expect(jsonData.message).to.equal("No user with this id found");
        });
    }

    // Forbidden: User does not have access to deck (403 Forbidden)
    else if (pm.response.code === 403) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'You do not have access to this deck' message", function () {
            pm.expect(jsonData.message).to.equal("You do not have access to this deck");
        });
    }

    // Not Found: Deck not found (404 Not Found)
    else if (pm.response.code === 404) {
        const jsonData = pm.response.json();
        pm.test("Response contains 'No deck with this id found' message", function () {
            pm.expect(jsonData.message).to.equal("No deck with this id found");
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

