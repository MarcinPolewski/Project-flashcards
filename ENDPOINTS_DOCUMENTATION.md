
# AuthenticationController API Documentation

## 1. `POST /api/auth/register`

**Description**: Registers a new user. The user’s details (email, username, password) are provided in the request body. If a user with the given email already exists, the request will fail.

**Request Body**:
```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "password123"
}
```

- `email`: The email address of the user (required).
- `username`: The username of the user (required).
- `password`: The password of the user (required).

**Response**:
- `201 Created`: The user was successfully registered.
  ```json
  "customer registered"
  ```
- `400 Bad Request`: If the email already exists.
  ```json
  "registration failed - user already exists"
  ```
- `500 Internal Server Error`: If an exception occurs during the registration process.
  ```json
  "exception occurred: <error message>"
  ```

---

## 2. `POST /api/auth/usernamePasswordLogin`

**Description**: Logs in a user using their email and password. If successful, a JWT token is returned for authentication.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- `email`: The email address of the user (required).
- `password`: The password of the user (required).

**Response**:
- `200 OK`: The authentication is successful and a JWT token is returned.
  ```json
  {
    "token": "JWT token string"
  }
  ```
- `401 Unauthorized`: If the login credentials are incorrect.

---

## 3. `GET /api/auth/oauth2/success`

**Description**: This endpoint is invoked after a successful social login (OAuth2). It retrieves or creates a user based on the email from the OAuth2 provider and generates a JWT token for the user.

**Request**:  
This endpoint does not require any request body. The authentication will be handled by Spring Security automatically.

**Response**:
- `200 OK`: The OAuth2 login is successful. A JWT token and customer data are returned.
  ```json
  {
    "token": "JWT token string",
    "customer": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "profileCreationDate": "2025-01-03T00:00:00"
    }
  }
  ```
- `400 Bad Request`: If the request is invalid or an error occurs during processing.

---

## Error Handling

In case of an error (e.g., invalid credentials, server issue), the responses may include an appropriate error message in the response body, such as:
```json
{
  "error": "Error message"
}
```

---

## Additional Information

- **JWT Token Structure**:  
  The JWT token includes claims like `issuer`, `subject`, `email`, `issuedAt`, and `expiration` time. The token is signed using a secret key (`jwtSecret`).

- **OAuth2 Integration**:  
  OAuth2 login will automatically map users based on the email retrieved from the OAuth2 provider. If the user does not exist in the database, they will be created with a profile creation date.

# API Documentation: Customer Controller

This document provides a detailed description of the API endpoints available in the `CustomerController` class for managing customer-related operations.

## Endpoints

### `GET /customer/findById/{id}`

This endpoint retrieves a customer by their ID.

**Parameters:**
- `id` (path): The ID of the customer to be fetched.

**Response:**
- 200 OK: Returns the customer data.
- 400 Bad Request: If the customer is not found or the user is not authenticated.

---

### `GET /customer/findByEmail/{email}`

This endpoint retrieves a customer by their email.

**Parameters:**
- `email` (path): The email of the customer to be fetched.

**Response:**
- 200 OK: Returns the customer data.
- 400 Bad Request: If the customer is not found or the user is not authenticated.

---

### `GET /customer/findByUsername/{username}`

This endpoint retrieves a list of customers by their username.

**Parameters:**
- `username` (path): The username of the customer to be searched.

**Response:**
- 200 OK: Returns a list of customers with the specified username.
- 400 Bad Request: If no customers are found or the user is not authenticated.

---

### `POST /customer/create`

This endpoint creates a new customer.

**Request Body:**
- `email`: The email of the customer (must be unique).
- `passwordHash`: The hashed password of the customer.
- `username`: The username of the customer.
- `profilePicturePath`: The path to the customer's profile picture.

**Response:**
- 200 OK: Returns the created customer data.
- 400 Bad Request: If a customer with the same email already exists or if the user is not authenticated.

---

### `POST /customer/update`

This endpoint updates the data of an existing customer.

**Request Body:**
- `email`: The email of the customer.
- `passwordHash`: The updated password hash.
- `username`: The updated username.
- `profilePicturePath`: The updated path to the profile picture.

**Response:**
- 200 OK: Returns the updated customer data.
- 400 Bad Request: If the user is not authenticated or if the customer is not found.

---

### `POST /customer/delete`

This endpoint deletes a customer.

**Response:**
- 200 OK: Confirmation message that the customer was deleted.
- 400 Bad Request: If the customer is not found or the user is not authenticated.

---

### `GET /customer/getSelf`

This endpoint retrieves the authenticated customer's data.

**Response:**
- 200 OK: Returns the authenticated customer's data.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getReceivedFriendships`

This endpoint retrieves a list of received friendships for the authenticated customer.

**Response:**
- 200 OK: Returns a list of received friendships.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getSentFriendships`

This endpoint retrieves a list of sent friendships for the authenticated customer.

**Response:**
- 200 OK: Returns a list of sent friendships.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getNotifications`

This endpoint retrieves a list of notifications for the authenticated customer.

**Response:**
- 200 OK: Returns a list of notifications.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getRootFolder`

This endpoint retrieves the root folder of the authenticated customer.

**Response:**
- 200 OK: Returns the root folder data.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getFriends`

This endpoint retrieves a list of the authenticated customer's friends.

**Response:**
- 200 OK: Returns a list of friends.
- 400 Bad Request: If the user is not authenticated.

---

### `GET /customer/getFriendById/{id}`

This endpoint retrieves a friend by their ID.

**Parameters:**
- `id` (path): The ID of the friend to be fetched.

**Response:**
- 200 OK: Returns the friend data.
- 400 Bad Request: If no friend is found with the specified ID or if the user is not authenticated.

---

### `GET /customer/getFriendByEmail/{email}`

This endpoint retrieves a friend by their email.

**Parameters:**
- `email` (path): The email of the friend to be fetched.

**Response:**
- 200 OK: Returns the friend data.
- 400 Bad Request: If no friend is found with the specified email or if the user is not authenticated.

---

## Error Responses

All endpoints return a `400 Bad Request` response if the user is not authenticated or if the requested resource is not found. The response will include a message indicating the error (e.g., "No user with this id found").

---

## Authentication

All endpoints require the user to be authenticated. Authentication is performed using the email of the logged-in user.

## JSON Views

The responses include a JSON view configuration that controls the data fields included in the response, as defined in `JsonViewConfig.Public`.

# API Documentation: Deck Controller

This document provides a detailed description of the API endpoints available in the `DeckController` class for managing decks in the Flashcards application.

## Endpoints

### `GET /deck/flashcards`

This endpoint retrieves flashcards from a specified deck.

**Parameters:**
- `page` (query): The page number for pagination (default: 0).
- `size` (query): The number of items per page (default: 5).
- `sortBy` (query): The field to sort by (default: `id`).
- `ascending` (query): Whether to sort in ascending order (default: `true`).
- `deckId` (query): The ID of the deck from which to retrieve the flashcards.

**Response:**
- 200 OK: Returns a list of flashcards from the specified deck.
- 400 Bad Request: If the user does not have access to the deck or if the deck does not exist.

---

### `POST /deck/create`

This endpoint creates a new deck in a folder.

**Request Body:**
- `folderId`: The ID of the folder where the deck will be created.
- `name`: The name of the new deck.

**Response:**
- 200 OK: Returns the created deck.
- 400 Bad Request: If the user does not have permission to create a deck in the specified folder, or if the folder does not exist.

---

### `PUT /deck/update`

This endpoint updates the name of an existing deck.

**Request Body:**
- `deckId`: The ID of the deck to update.
- `name`: The new name for the deck.

**Response:**
- 200 OK: Returns the updated deck.
- 400 Bad Request: If the user does not have permission to update the deck, or if the deck does not exist.

---

### `DELETE /deck/delete`

This endpoint deletes a specified deck.

**Parameters:**
- `deckId` (query): The ID of the deck to delete.

**Response:**
- 200 OK: Confirmation message that the deck was deleted.
- 400 Bad Request: If the user does not have permission to delete the deck, or if the deck does not exist.

---

## Error Responses

All endpoints return a `400 Bad Request` response under the following circumstances:
- The user does not have the required permissions to access, create, update, or delete the deck.
- The deck or folder does not exist.
- Any other validation failure related to the input or authentication.

---

## Authentication

All endpoints require the user to be authenticated. Authentication is performed using the user's credentials (e.g., username and password). The user's access level (OWNER, EDITOR, etc.) determines their permissions for each operation.

---

## Access Levels

- **OWNER**: Full permissions to manage the deck.
- **EDITOR**: Permissions to modify the deck.
- **VIEWER**: No permissions to modify or delete the deck.

# API Documentation: Demo Controller

This document provides a description of the API endpoint available in the `DemoController` class, which is used for testing secured endpoints and retrieving user information.

## Endpoints

### `GET /demo/this-is-secure`

This endpoint demonstrates a secured route where the user's email is extracted from the authentication token and returned in the response.

**Request:**
- The request requires authentication (either via UsernamePasswordAuthenticationToken or OAuth2AuthenticationToken).

**Response:**
- 200 OK: Returns a message with the authenticated user's email.


# API Documentation: FlashcardProgress Controller

## Overview
The `FlashcardProgressController` class is a REST controller responsible for managing flashcard progress data. It provides endpoints for retrieving, creating, updating, and deleting flashcard progress entries.

## Dependencies
This class relies on the following repositories and entities:

- `CustomerRepository`: Used to fetch customer data.
- `FlashcardRepository`: Used to fetch flashcard data.
- `FlashcardProgressRepository`: Used to manage flashcard progress data.
- `AccessLevel`: Determines the access level of a user to a deck.
- `JsonViewConfig`: Configures JSON views.

## Endpoints
### 1. `@GetMapping("/getFlashcardProgress/{id}")`
#### Description
Fetches the flashcard progress data for the given ID.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@PathVariable int id`: ID of the flashcard progress to retrieve.
#### Response
- 200: Returns the flashcard progress data.
- 400: Returns an error message if the user or flashcard progress is not found or if the user does not have access.

### 2. `@PostMapping("/create")`
#### Description
Creates a new flashcard progress entry.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestBody FlashcardProgressCreationRequest request`: Contains details of the flashcard progress to create.
#### Response
- 200: Returns the created flashcard progress.
- 400: Returns an error message if the user or flashcard is not found or if the user does not have access.

### 3. `@PostMapping("/update")`
#### Description
Updates an existing flashcard progress entry.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestBody FlashcardProgressUpdateRequest request`: Contains updated details of the flashcard progress.
#### Response
- 200: Returns the updated flashcard progress.
- 400: Returns an error message if the user, flashcard progress, or flashcard is not found or if the user does not have access.

### 4. `@DeleteMapping("/delete")`
#### Description
Deletes a flashcard progress entry.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int flashcardProgressId`: ID of the flashcard progress to delete.
#### Response
- 200: Returns a success message.
- 400: Returns an error message if the user, flashcard progress, or flashcard is not found or if the user does not have access.

## Error Handling
All endpoints validate the user's identity and access permissions. Error messages are returned for invalid operations such as unauthorized access or non-existent entities.

## Annotations Used
- `@RestController`: Marks this class as a REST controller.
- `@RequestMapping`: Maps HTTP requests to handler methods.
- `@RequiredArgsConstructor`: Automatically generates a constructor with required dependencies.
- `@JsonView`: Controls the JSON output view.

## Security
Authentication is managed through Spring Security's `Authentication` object, which retrieves the currently authenticated user's email.


# API Documentation: Flashcard Controller

## Overview
The `FlashcardController` class is a REST controller for managing flashcards. It provides endpoints for creating, updating, deleting, copying, and moving flashcards between decks. The controller ensures proper access control through the `ResourceAccessService`.

## Dependencies
This class relies on the following repositories and services:

- `CustomerRepository`: Handles customer data.
- `DeckRepository`: Manages deck data.
- `FolderJpaRepository`: Handles folder data.
- `FlashcardRepository`: Manages flashcard data.
- `ResourceAccessService`: Provides access level checks for resources (decks and flashcards).
- `AccessLevel`: Enum representing access levels (e.g., OWNER, EDITOR, VIEWER).

## Endpoints
### 1. `@PostMapping("/create")`
#### Description
Creates a new flashcard in a specified deck.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestBody FlashcardCreationRequest request`: Contains deck ID, front, and back content of the flashcard.
#### Response
- 200: Returns the created flashcard.
- 400: Returns an error message if the user does not have the necessary access level or the deck is not found.

---

### 2. `@PostMapping("/update")`
#### Description
Updates an existing flashcard.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestBody FlashcardUpdateRequest request`: Contains flashcard ID, updated front, and back content.
#### Response
- 200: Returns the updated flashcard.
- 400: Returns an error message if the user does not have the necessary access level or the flashcard is not found.

---

### 3. `@DeleteMapping("/delete")`
#### Description
Deletes a flashcard.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int flashcardId`: ID of the flashcard to delete.
#### Response
- 200: Returns a success message.
- 400: Returns an error message if the user does not have the necessary access level or the flashcard is not found.

---

### 4. `@PostMapping("/copyFlashcardToDeck")`
#### Description
Copies a flashcard to another deck.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int deckId`: ID of the destination deck.
- `@RequestParam int flashcardId`: ID of the flashcard to copy.
#### Response
- 200: Returns a success message.
- 400: Returns an error message if the user does not have the necessary access level for the deck or flashcard.

---

### 5. `@PostMapping("/moveFlashcardToOtherDeck")`
#### Description
Moves a flashcard from one deck to another.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int sourceDeckId`: ID of the source deck.
- `@RequestParam int destinationDeckId`: ID of the destination deck.
- `@RequestParam int flashcardId`: ID of the flashcard to move.
#### Response
- 200: Returns a success message.
- 400: Returns an error message if the user does not have the necessary access level for the decks or flashcard, or if the flashcard is not in the source deck.

## Security
Access control is enforced using the `ResourceAccessService`. Only users with appropriate access levels (e.g., OWNER, EDITOR) can modify resources.

## Error Handling
Custom exceptions like `ResourceNotFoundException` are used to handle cases where decks or flashcards are not found.

## Annotations Used
- `@RestController`: Marks this class as a REST controller.
- `@RequestMapping`: Maps HTTP requests to handler methods.
- `@RequiredArgsConstructor`: Generates a constructor for the class's dependencies.

---

# Links
For the complete Java file, refer to the generated link [here](./flashcard_controller.java).

---


# API Documentation: Folder

The `FolderController` handles folder-related operations for a flashcard application. It provides endpoints to manage folders, including creating, updating, deleting, and retrieving folder structures.

## Base URL

`/folder`

## Endpoints

### 1. **Get Folder Structure**
Retrieves the folder structure of the authenticated user.

- **URL:** `/getFolderStructure`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
    - `page` (int, optional, default: `0`) - The page number for pagination.
    - `size` (int, optional, default: `5`) - The size of each page.
    - `sortBy` (String, optional, default: `id`) - The field to sort by.
    - `ascending` (boolean, optional, default: `true`) - Sorting order.
- **Response:**
    - **200 OK** - The root folder structure of the authenticated user.
    - **400 Bad Request** - No user found.

---

### 2. **Create Folder**
Creates a new folder for the authenticated user under a specified parent folder.

- **URL:** `/create`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `FolderCreationRequest`:
        - `name` (String) - The name of the folder.
        - `parentId` (int) - The ID of the parent folder.
- **Response:**
    - **200 OK** - Folder created successfully.
    - **400 Bad Request** - User or parent folder not found, or insufficient permissions.

---

### 3. **Update Folder**
Updates an existing folder.

- **URL:** `/update`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `Folder` - The folder entity with updated details.
- **Response:**
    - **200 OK** - Folder updated successfully.
    - **400 Bad Request** - Folder already exists.

---

### 4. **Delete Folder**
Deletes a folder by ID.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
    - `folderId` (int) - The ID of the folder to delete.
- **Response:**
    - **200 OK** - Folder deleted successfully.
    - **400 Bad Request** - Folder not found, or insufficient permissions.

---

### 5. **Get Decks in Folder**
Retrieves all decks in a specified folder.

- **URL:** `/getDecks`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
    - `page` (int, optional, default: `0`) - The page number for pagination.
    - `size` (int, optional, default: `5`) - The size of each page.
    - `sortBy` (String, optional, default: `id`) - The field to sort by.
    - `ascending` (boolean, optional, default: `true`) - Sorting order.
    - `folderId` (int) - The ID of the folder.
- **Response:**
    - **200 OK** - List of decks in the folder.
    - **400 Bad Request** - Folder not found, invalid sort field, or insufficient permissions.

---

### 6. **Get Folder Children**
Retrieves all child folders of a specified folder.

- **URL:** `/children`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
    - `folderId` (int) - The ID of the folder.
- **Response:**
    - **200 OK** - List of child folders.
    - **400 Bad Request** - Folder or user not found, or insufficient permissions.

---

### 7. **Get Folder Access Levels**
Retrieves access levels for a specified folder.

- **URL:** `/accessLevels`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
    - `folderId` (int) - The ID of the folder.
- **Response:**
    - **200 OK** - Access levels for the folder.
    - **400 Bad Request** - Folder or user not found, or insufficient permissions.

---

## Notes
- Access level checks ensure that only authorized users can perform actions on folders.
- Pagination and sorting options are supported for fetching folders and decks.
- JSON views are used to control the visibility of sensitive data.

---

# API Documentation: FriendshipController

The `FriendshipController` manages friendships between users in the flashcard application. It allows for creating, retrieving, updating, and deleting friendships.

## Base URL

`/friendship`

## Endpoints

### 1. **Get Friendship**
Retrieves details of a specific friendship by its ID.

- **URL:** `/getFriendship/{id}`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Path Variables:**
    - `id` (int) - The ID of the friendship to retrieve.
- **Response:**
    - **200 OK** - Details of the friendship.
    - **400 Bad Request** - Friendship or user not found, or user does not have access.

---

### 2. **Create Friendship**
Creates a new friendship between two users.

- **URL:** `/create`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `FriendshipCreationRequest`:
        - `senderId` (int) - The ID of the sender initiating the friendship.
        - `receiverId` (int) - The ID of the receiver of the friendship request.
- **Response:**
    - **200 OK** - Friendship created successfully.
    - **400 Bad Request** - User not found or user does not have access.

---

### 3. **Update Friendship**
Updates the status of an existing friendship (e.g., accepting a request).

- **URL:** `/update`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `FriendshipUpdateRequest`:
        - `friendshipId` (int) - The ID of the friendship to update.
        - `accepted` (boolean) - Whether the friendship request is accepted.
- **Response:**
    - **200 OK** - Friendship updated successfully.
    - **400 Bad Request** - Friendship or user not found, or user does not have access.

---

### 4. **Delete Friendship**
Deletes an existing friendship.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
    - `friendshipId` (int) - The ID of the friendship to delete.
- **Response:**
    - **200 OK** - Friendship deleted successfully.
    - **400 Bad Request** - Friendship or user not found, or user does not have access.

---

## Dependencies
- **Repositories:**
    - `FriendshipRepository`
    - `CustomerRepository`
- **Entities:**
    - `Customer`
    - `Friendship`
- **Configuration:**
    - `JsonViewConfig`

---

## Notes
- Only the sender or receiver of a friendship can access or modify it.
- All actions require authentication.
- Friendships can only be created, updated, or deleted by authorized users.
- JSON views ensure that only relevant data is exposed in the response.

---

# API Documentation: Notification

The `NotificationController` handles the management of user notifications in the flashcard application. It provides endpoints to retrieve, create, update, and delete notifications.

## Base URL

`/notification`

## Endpoints

### 1. **Get Notification**
Retrieves a specific notification by its ID.

- **URL:** `/getNotification/{id}`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Path Variables:**
    - `id` (int) - The ID of the notification to retrieve.
- **Response:**
    - **200 OK** - The requested notification.
    - **400 Bad Request** - Notification or user not found, or the notification does not belong to the user.

---

### 2. **Create Notification**
Creates a new notification for a user.

- **URL:** `/create`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `NotificationCreationRequest`:
        - `userId` (int) - The ID of the user to whom the notification belongs.
        - `text` (String) - The content of the notification.
        - `received` (boolean) - Indicates whether the notification has been received.
        - `receivedDate` (Date) - The date the notification was received.
- **Response:**
    - **200 OK** - Notification created successfully.
    - **400 Bad Request** - User not found or the notification does not belong to the user.

---

### 3. **Update Notification**
Updates the status of a notification (e.g., marking it as received).

- **URL:** `/update`
- **Method:** `POST`
- **Parameters:**
    - **Body:** `NotificationUpdateRequest`:
        - `notificationId` (int) - The ID of the notification to update.
        - `received` (boolean) - Indicates the updated status of the notification.
- **Response:**
    - **200 OK** - Notification updated successfully.
    - **400 Bad Request** - Notification or user not found, or the notification does not belong to the user.

---

### 4. **Delete Notification**
Deletes a specific notification by its ID.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
    - `notificationId` (int) - The ID of the notification to delete.
- **Response:**
    - **200 OK** - Notification successfully deleted.
    - **400 Bad Request** - Notification or user not found, or the notification does not belong to the user.

---

## Dependencies
- **Repositories:**
    - `NotificationRepository`
    - `CustomerRepository`
- **Entities:**
    - `Notification`
    - `Customer`
- **Configuration:**
    - `JsonViewConfig`

---

## Notes
- Notifications are user-specific, and actions can only be performed by the owner of the notification.
- All actions require authentication.
- The `JsonViewConfig.Public` ensures only public fields of the notification are exposed when retrieved.
- Validation checks are performed to ensure notifications belong to the authenticated user.

---

# API Documentation PdfGeneratorController

The `PdfGeneratorController` handles the generation of PDF files for decks. It provides an endpoint to generate and download a PDF containing information about a specified deck.

## Endpoints

### 1. **Generate PDF**
Generates a PDF document for a specific deck by its ID.

- **URL:** `/generatePdf/{id}`
- **Method:** `GET`
- **Path Variables:**
    - `id` (int) - The ID of the deck for which the PDF will be generated.
- **Response:**
    - **200 OK** - Returns a byte array containing the PDF file. Includes headers for file download:
        - `Content-Disposition`: `attachment; filename={deckName}.pdf`
        - `Content-Type`: `application/pdf`
    - **404 Not Found** - Deck with the specified ID was not found.

---

## Dependencies
- **Repositories:**
    - `DeckRepository` - For retrieving the deck by its ID.
- **Utilities:**
    - `PdfGenerator` - For converting the deck's data into a PDF format.

---

## Implementation Details
- The endpoint uses the `PdfGenerator` service to generate a PDF based on the data contained in the specified `Deck`.
- HTTP headers are set to:
    - Trigger a file download with the name `{deckName}.pdf`.
    - Indicate the file type as a PDF.
- If the deck with the given ID does not exist, a `404 Not Found` status is returned.

---

## Example Request and Response

### Request
**GET** `/generatePdf/1`

### Successful Response
- **Headers:**
    - `Content-Disposition`: `attachment; filename=SampleDeck.pdf`
    - `Content-Type`: `application/pdf`
- **Body:** Binary data of the PDF file.

### Error Response
- **404 Not Found**:
  ```json
  {
    "error": "Deck not found"
  }

# API Documentation: ReviewLogController

The `ReviewLogController` manages operations on review logs, such as retrieval, creation, updating, and deletion. Each review log is associated with a specific flashcard and contains information about user reviews.

---

## Endpoints

### 1. **Get Review Log**
Retrieve a review log by its ID.

- **URL:** `/reviewLog/getReviewLog/{id}`
- **Method:** `GET`
- **Path Variables:**
    - `id` (int) - The ID of the review log to retrieve.
- **Response:**
    - **200 OK** - Returns the review log.
    - **400 Bad Request** - Errors include:
        - User not found.
        - Review log not found.
        - Access denied to the flashcard.

---

### 2. **Create Review Log**
Create a new review log.

- **URL:** `/reviewLog/create`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `flashcardId` (int) - ID of the flashcard.
    - `userId` (int) - ID of the user creating the review log.
    - `userAnswer` (String) - The answer provided by the user.
- **Response:**
    - **200 OK** - Returns the created review log.
    - **400 Bad Request** - Errors include:
        - User not found.
        - Flashcard not found.
        - Access denied to the flashcard.

---

### 3. **Update Review Log**
Update the user’s answer in a review log.

- **URL:** `/reviewLog/update`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `reviewLogId` (int) - ID of the review log to update.
    - `userAnswer` (String) - Updated answer by the user.
- **Response:**
    - **200 OK** - Returns the updated review log.
    - **400 Bad Request** - Errors include:
        - User not found.
        - Review log not found.
        - Review log does not belong to the user.

---

### 4. **Delete Review Log**
Delete a review log by its ID.

- **URL:** `/reviewLog/delete`
- **Method:** `DELETE`
- **Query Parameters:**
    - `reviewLogId` (int) - ID of the review log to delete.
- **Response:**
    - **200 OK** - Confirms successful deletion.
    - **400 Bad Request** - Errors include:
        - User not found.
        - Review log not found.
        - Review log does not belong to the user.

---

# API Documentation: UserPreferencesController

The `UserPreferencesController` manages the user preferences, including actions such as retrieving, creating, updating, and deleting user preferences. Each set of user preferences is associated with a specific user.

---

## Endpoints

### 1. **Get User Preferences**
Retrieve a user's preferences by ID.

- **URL:** `/userPreferences/getUserPreferences/{id}`
- **Method:** `GET`
- **Path Variables:**
    - `id` (int) - The ID of the user preferences to retrieve.
- **Response:**
    - **200 OK** - Returns the user preferences.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User preferences not found.
        - User preferences do not belong to the authenticated user.

---

### 2. **Create User Preferences**
Create new user preferences.

- **URL:** `/userPreferences/create`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `userId` (int) - The ID of the user for whom preferences are being created.
    - `darkMode` (boolean) - Preference for dark mode.
    - `language` (String) - Preferred language of the user.
- **Response:**
    - **200 OK** - Returns the created user preferences.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User preferences do not belong to the authenticated user.

---

### 3. **Update User Preferences**
Update an existing user's preferences.

- **URL:** `/userPreferences/update`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `userPreferencesId` (int) - The ID of the user preferences to update.
    - `darkMode` (boolean) - Updated preference for dark mode.
    - `language` (String) - Updated preferred language.
- **Response:**
    - **200 OK** - Returns the updated user preferences.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User preferences not found.
        - User preferences do not belong to the authenticated user.

---

### 4. **Delete User Preferences**
Delete user preferences by ID.

- **URL:** `/userPreferences/delete`
- **Method:** `DELETE`
- **Query Parameters:**
    - `userPreferencesId` (int) - The ID of the user preferences to delete.
- **Response:**
    - **200 OK** - Confirms successful deletion.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User preferences not found.
        - User preferences do not belong to the authenticated user.

---

## Dependencies
- **Repositories:**
    - `UserPreferencesRepository` - For managing user preferences entities.
    - `CustomerRepository` - For retrieving customer data.
- **Security:**
    - The controller ensures that the authenticated user can only access or modify their own preferences by comparing the `userId` in the preferences with the authenticated user's ID.

---

## Security Considerations
- Authentication is required for all endpoints.
- Ensures that user preferences belong to the authenticated user before allowing access or modifications.

---

# API Documentation: UserStatistics Controller

The `UserStatisticsController` handles operations for managing user statistics, including retrieving, creating, updating, and deleting user statistics records.

---

## Endpoints

### 1. **Get User Statistics**
Retrieve the statistics for a specific user by ID.

- **URL:** `/userStatistics/getUserStatistics/{id}`
- **Method:** `GET`
- **Path Variables:**
    - `id` (int) - The ID of the user statistics to retrieve.
- **Response:**
    - **200 OK** - Returns the user statistics object.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User statistics not found.
        - User statistics do not belong to the authenticated user.

---

### 2. **Create User Statistics**
Create a new user statistics record.

- **URL:** `/userStatistics/create`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `userId` (int) - The ID of the user for whom the statistics are being created.
    - `totalTimeSpent` (long) - The total time the user has spent in the application (in seconds or milliseconds as appropriate).
    - `loginCount` (int) - The number of times the user has logged in.
    - `lastLogin` (String) - Timestamp of the user's last login.
- **Response:**
    - **200 OK** - Returns the created user statistics object.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User statistics do not belong to the authenticated user.

---

### 3. **Update User Statistics**
Update an existing user statistics record.

- **URL:** `/userStatistics/update`
- **Method:** `POST`
- **Request Body:** (JSON)
    - `userStatisticsId` (int) - The ID of the user statistics to update.
    - `totalTimeSpent` (long) - Updated total time spent.
    - `loginCount` (int) - Updated login count.
    - `lastLogin` (String) - Updated last login timestamp.
- **Response:**
    - **200 OK** - Returns the updated user statistics object.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User statistics not found.
        - User statistics do not belong to the authenticated user.

---

### 4. **Delete User Statistics**
Delete user statistics by ID.

- **URL:** `/userStatistics/delete`
- **Method:** `DELETE`
- **Query Parameters:**
    - `userStatisticsId` (int) - The ID of the user statistics to delete.
- **Response:**
    - **200 OK** - Confirms successful deletion.
    - **400 Bad Request** - Errors include:
        - User not found.
        - User statistics not found.
        - User statistics do not belong to the authenticated user.

---