## Authentication & Authorization System

This repository implements a secure authentication and authorization system using Prisma, Next.js, and JWT (JSON Web Tokens). The system provides features such as user registration, login, and logout, with role-based access control (RBAC) to manage user permissions.

# Features
User Registration: Allows users to sign up with their credentials.

User Login & Logout: Secure login using JWT and logout functionality.

Role-Based Access Control (RBAC): Admin, User, and Moderator roles with different access privileges.

Secure Session Management: Uses JWT for session management, ensuring that users are authenticated securely.

Authorization: Based on user roles, specific resources and endpoints are accessible to different users.

# Technologies Used

Next.js: React framework used for building server-side rendered and statically generated web applications.

Prisma: ORM for database management, providing type safety and a streamlined workflow.

JWT (JSON Web Tokens): Secure method for handling authentication and authorization via tokens.

PostgreSQL: The relational database used to store user information and roles.

## Setup & Installation
Follow these steps to get the application running locally:

1. Clone the repository
```bash
git clone https://github.com/yourusername/repo-name.git
cd repo-name
```

2. Install dependencies
```bash
npm install
```
3. Set up environment variables

Create a .env file in the root of the project and add the following environment variables:

```
DATABASE_URL="your-database-connection-url"
JWT_SECRET="your-secret-key"
DATABASE_URL: The URL of your PostgreSQL database.
JWT_SECRET: A secret key used to sign and verify JWT tokens.
```
4. Run Prisma migrations

If you haven't set up your database yet, run the following Prisma commands to create and migrate your database schema.

```
npx prisma migrate dev
npx prisma generate
```
5. Run the application

To start the Next.js development server, run:

```
npm run dev
```
This will start the app locally at http://localhost:3000.


