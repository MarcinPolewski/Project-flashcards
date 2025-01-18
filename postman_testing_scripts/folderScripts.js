// Test for GET /folder/getFolderStructure endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/getFolderStructure") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Response contains folder structure", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
            pm.expect(jsonData).to.have.property("name").that.is.a("string");
        });

        pm.test("Pagination parameters are valid", function () {
            const queryParams = pm.request.url.query.toObject();
            pm.expect(queryParams).to.have.property("page").that.is.a("string");
            pm.expect(queryParams).to.have.property("size").that.is.a("string");
            pm.expect(queryParams).to.have.property("sortBy").that.is.a("string");
            pm.expect(queryParams).to.have.property("ascending").that.is.a("string");
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


// Test for POST /folder/create endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/create") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Folder creation successful", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("folder created!");
        });

        pm.test("Response contains folder creation confirmation", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("name").that.is.a("string");
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message for no permission", function () {
            pm.expect(responseText).to.equal("You do not have permission to create a folder here");
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

// Test for POST /folder/update endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/update") && requestMethod === "POST") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Folder update successful", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("folder updated!");
        });

        pm.test("Response contains folder update confirmation", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("name").that.is.a("string");
            pm.expect(jsonData).to.have.property("id").that.is.a("number");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        pm.test("Error message for no permission", function () {
            pm.expect(responseText).to.equal("You do not have permission to update this folder");
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


// Test for DELETE /folder/delete endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/delete") && requestMethod === "DELETE") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Folder delete successful", function () {
            const responseText = pm.response.text();
            pm.expect(responseText).to.equal("folder deleted!");
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        if (responseText === "You do not have permission to update this folder") {
            pm.test("Error message for no permission", function () {
                pm.expect(responseText).to.equal("You do not have permission to update this folder");
            });
        }

        // Error message for attempting to delete the root folder
        else if (responseText === "You cannot delete the root folder") {
            pm.test("Error message for attempting to delete root folder", function () {
                pm.expect(responseText).to.equal("You cannot delete the root folder");
            });
        }

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


// Test for GET /folder/getDecks endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/getDecks") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Get decks successful", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.be.an("array");

            jsonData.forEach(deck => {
                pm.expect(deck).to.have.property("id").that.is.a("number");
                pm.expect(deck).to.have.property("name").that.is.a("string");
            });
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        if (responseText === "Folder not found") {
            pm.test("Error message for folder not found", function () {
                pm.expect(responseText).to.equal("Folder not found");
            });
        }

        else if (responseText === "Invalid sort field") {
            pm.test("Error message for invalid sort field", function () {
                pm.expect(responseText).to.equal("Invalid sort field");
            });
        }

        else {
            pm.test("Error message for insufficient permissions", function () {
                pm.expect(responseText).to.equal("You do not have permission to view this folder");
            });
        }
    }

    // Unauthorized scenario (401)
    else if (pm.response.code === 401) {
        pm.test("Response is empty for unauthorized requests", function () {
            const responseText = pm.response.text();
            pm.expect(responseText, "Response should be empty").to.be.empty;
        });
    }
}

// Check response time
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});


// Test for GET /folder/children endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

// Check if the test corresponds to the correct endpoint
if (requestUrl.includes("/folder/children") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Get child folders successful", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.be.an("array");

            // Validate each folder's structure in the response list
            jsonData.forEach(folder => {
                pm.expect(folder).to.have.property("id").that.is.a("number");
                pm.expect(folder).to.have.property("name").that.is.a("string");
            });
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Check if the error message indicates the folder was not found
        if (responseText === "Folder not found") {
            pm.test("Error message for folder not found", function () {
                pm.expect(responseText).to.equal("Folder not found");
            });
        }

        // Check if the error message indicates insufficient permissions
        else {
            pm.test("Error message for insufficient permissions", function () {
                pm.expect(responseText).to.equal("You do not have permission to view this folder");
            });
        }
    }

    // Unauthorized scenario (401)
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


// Test for GET /folder/accessLevels endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/folder/accessLevels") && requestMethod === "GET") {
    // Successful scenario (200 OK)
    if (pm.response.code === 200) {
        pm.test("Get folder access levels successful", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.be.an("array");

            // Validate each access level object in the response list
            jsonData.forEach(access => {
                pm.expect(access).to.have.property("id").that.is.a("number");
                pm.expect(access).to.have.property("customerId").that.is.a("number");
                pm.expect(access).to.have.property("AccessLevel").that.is.a("string");
                pm.expect(access.AccessLevel).to.be.oneOf(["VIEWER", "EDITOR", "OWNER"]);
            });
        });
    }

    // Bad Request scenarios (400)
    else if (pm.response.code === 400) {
        const responseText = pm.response.text();

        // Check if the error message indicates the folder was not found

        if (responseText === "Folder not found") {
            pm.test("Error message for folder not found", function () {
                pm.expect(responseText).to.equal("Folder not found");
            });
        }

        // Check if the error message indicates insufficient permissions
        else {
            pm.test("Error message for insufficient permissions", function () {
                pm.expect(responseText).to.equal("You do not have permission to view this folder");
            });
        }
    }

    // Unauthorized scenario (401)
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

// Test for GET /getFolder endpoint
// const requestUrl = pm.request.url.toString();
// const requestMethod = pm.request.method;

if (requestUrl.includes("/getFolder") && requestMethod === "GET") {
    // Successful scenario
    if (pm.response.code === 200) {
        pm.test("Response contains the folder data", function () {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property("id");
            pm.expect(jsonData).to.have.property("name");
            pm.expect(jsonData).to.have.property("owner");
            pm.expect(jsonData).to.have.property("createdDate");
            pm.expect(jsonData).to.have.property("updatedDate");
        });
    }

    // Bad Request: Folder not found scenario
    else if (pm.response.code === 400) {
        const jsonData = pm.response.json();

        // Check for "Folder not found" error message
        if (jsonData.message === "Folder not found") {
            pm.test("Response contains 'Folder not found' message", function () {
                pm.expect(jsonData.message).to.equal("Folder not found");
            });
        }

        // Check for "User not found" error message
        else if (jsonData.message === "User not found") {
            pm.test("Response contains 'User not found' message", function () {
                pm.expect(jsonData.message).to.equal("User not found");
            });
        }

        // Check for "Permission denied" error message
        else if (jsonData.message === "You do not have permission to view this folder") {
            pm.test("Response contains 'Permission denied' message", function () {
                pm.expect(jsonData.message).to.equal("You do not have permission to view this folder");
            });
        }
    }
}

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
