# Splitly
### App for splitting bills with friends🥰

## Project overview
Splitly is a Web app for splitting bills with friends🥰

## App Setup
### Frontend
    - Navigate to the frontend directory and run:
      - pnpm install
      - pnpm dev, app should be available on http://localhost:5173
### Backend
    The backend requires **Docker** and **Docker Compose** to run the database.
    - Navigate to the backend directory and do the following:
        - For first time setup:
          - `make init` to install dependencies, load the database fixtures
          - `make start` to start the container, generate schema, migrate & seed the database, and start the server.
          - You can find useful information about the Makefile commands within the Makefile itself.
        - For subesequent runs:
            - `pnpm dev`  to start the server.
            - `pnpm db:push` to push the schema to the database.

## Limitations:
To reduce scope and complexity, the app has the following limitations:
- Most of the data on the backend is generated for faster development.
- There is no authentication or authorization, However there is a helpful user management button to manage users.
- The split functionality is limited to splitting bills equally among friends.
- The split functionality automatically calculates the share of each user based on the total bill amount and updates balance for each user based on their contributions.
- The app

Improvements:
## Features
- App:
  - Data persistence to localStorage.
  - User-friendly UX/flows for managing shared bills.
- Bill Management:
  - Create and manage shared bills.
  - View, Select and divide expenses among friends.
  -  Automatic calculation of each user's share based on total bill amount.
- Transaction Handling:
  - Handle users, bank accounts, and transactions.
- Error Handling:
  - Input validation for user contributions.
  - Display of error messages for invalid inputs or failed payment requests.

## Technologies
- FE:
  - Vue for rendering the UI.
  - Tailwind CSS for styling.
  - Pinia for state management, async actions, and reactive state.
  - Vue Router for routing.
- BE:
  - Node.js for the backend.
  - Express.js for the API.
  - Drizzle ORM for database interactions.
  - PostgreSQL for the database.
  - Docker for containerization.
  - Pino for logging.

## Resources:
- Vue.js Documentation
- Hero Icons
- Tailwind CSS Documentation,  [Tailwind CSS Cheatsheet](https://www.creative-tim.com/twcomponents/cheatsheet)
- ChatGPT for prototyping ideas and generating code snippets.