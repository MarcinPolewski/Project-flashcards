// Test for GET /generatePdf/{id} endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/generatePdf/") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("PDF generated successfully", function () {
            const contentDisposition = pm.response.headers.get("Content-Disposition");
            const contentType = pm.response.headers.get("Content-Type");

            // Check the response headers
            pm.expect(contentDisposition).to.include("attachment");
            pm.expect(contentType).to.equal("application/pdf");
        });

        pm.test("PDF file content is valid", function () {
            // You can check if the body is not empty and is a valid PDF
            pm.expect(pm.response.body).to.not.be.empty;
        });
    }

    // Bad Request scenario (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();
        pm.test("Error message for user not found", function () {
            pm.expect(responseText).to.equal("No user with this id found");
        });
    }

    // Forbidden scenario (403)
    else if (pm.response.code === 403) {
        const responseText = pm.response.text();
        pm.test("Error message for no access to the deck", function () {
            pm.expect(responseText).to.equal("You do not have access to this deck");
        });
    }

    // Not Found scenario (404)
    else if (pm.response.code === 404) {
        const responseText = pm.response.text();
        pm.test("Error message for deck not found", function () {
            pm.expect(responseText).to.equal("No deck with this id found");
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