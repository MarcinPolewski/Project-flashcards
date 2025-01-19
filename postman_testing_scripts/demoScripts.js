// Test for GET /demo/this-is-secure endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/demo/this-is-secure") && requestMethod === "GET") {

    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains the authenticated user's email", function () {
            const text = pm.response.text();
            pm.expect(text).to.include("hello, your email is: ");
        });
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }

    // Forbidden scenario (403)
    else if (pm.response.code === 403) {
        pm.test("Response includes forbidden access message", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.include("Access Denied");
        });
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
