# Social Gravity - Backend

The backend for Social Gravity is built with Java and Spring Boot. It provides RESTful APIs for user authentication, social account management, and post scheduling.

## Prerequisites

- **Java 17** or higher
- **Maven** 3.6+
- **PostgreSQL** 14+

## Setup

### 1. Database Configuration
1.  Install PostgreSQL and create a new database named `socialapp`.
2.  Update `src/main/resources/application.properties` with your database credentials:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/socialapp
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

### 2. App Configuration
In `src/main/resources/application.properties`, configure the following:

- **JWT Secret**: Set a secure secret key for `jwt.secret`.
- **Twitter API**: Add your Twitter Developer credentials.
    ```properties
    twitter.api.key=YOUR_API_KEY
    twitter.api.secret=YOUR_API_SECRET
    twitter.callback.url=http://localhost:8080/api/connections/callback/twitter
    ```

## Running the Application

To run the application locally:

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`.

## Key Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT.
- `GET /api/connections/{userId}`: Get connected social accounts.
- `GET /api/connections/connect/twitter`: Initiate Twitter OAuth flow.
