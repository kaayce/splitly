# Splitly
## Project overview
Splitly is a Web app for splitting bills with friends!🥰

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

## App Setup
  - Create a .env file in both the frontend and backend directory using the .env.example file as a template.
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
        - Use `make db-stop` to stop the container.
        - You can find useful information about the Makefile commands within the Makefile itself.
      - For subesequent runs:
          - `pnpm dev`  to start the server.
          - `pnpm db:push` to push the schema to the database.

## Schema
I went with PostgresDB for this project, due to the relational model of the entities involved
I used Drizzle ORM for database interactions and migrations.

#### Users Table (users):
- Stores user data like userId, email, and fullName.
- Has relations with accounts, transactions, billParticipants, friends, and billSplits.

#### Accounts Table (accounts):
- Stores user bank account details such as accountId, accountNumber, userId, balance, and accountType.
- Relates to users (account owner) and transactions.

#### Transactions Table (transactions):
- Stores transaction data like transactionId, accountId, amount, vendor, category, and transactionDate.
- Linked to accounts and participates in bill splits.

#### Bill Splits Table (bill_splits):
- Tracks the split of a bill, with fields like splitId, transactionId, payerId, totalAmount, and splitDate.
- Relates to transactions, payer (user), and billParticipants.

#### Bill Participants Table (bill_participants):
- Represents participants in a split bill with billParticipantId, splitId, userId, amountOwed, and paymentStatus.
- Linked to billSplits and users (participants).

#### Enums:
- paymentStatusEnum manages bill payment statuses (e.g., pending, paid, rejected).
- categoryEnum categorizes transactions (e.g., dining, groceries).
- accountTypeEnum categorizes accounts (e.g., checking, savings).

#### Lifecycle Dates:
- Helper fucntion to generate createdAt and updatedAt timestamps for record management. The timestamps are set in UTC.

## Frontend
The frontend is built with Vue 3 and Vite using the composition API.
- Pinia stores to handle global application state and async daata maangement
- Vue Router for navigation between pages.
- App state is saved to localStorage for persistence.
-  Uses `ofetch` for API calls.

## Limitations:
To reduce scope and complexity, the app has the following limitations:
- Most of the data on the backend is generated for faster development.
- There is no authentication or authorization, However there is a helpful user management button to manage users.
- The split functionality is limited to splitting bills equally among friends.
- The split functionality automatically calculates the share of each user based on the total bill amount and updates balance for each user based on their contributions.

## Future Improvements
- Add Tests!
- Implement user authentication and authorization.
- Enhance error handling and user feedback.
- Implement a more robust and user-friendly UI.
- Users can create and manage their own accounts.
- Users can request/decline and manage payment requests
- Enhance Database performance and scalability - prepared statements, indexing etc

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

Thanks for checking out Splitly!
The project took roughly 12 hours so far (not including time spent on loking at documentation).
I really enjoyed working on this project and hope you enjoy using it.
It's my frst time working with Vue and I'm really proud of how it turned out.

That said, it’s definitely not finished and is still a work in progress!

Please let  me know if you have any feedback or suggestions for improvements!
If you run into any issues or require additional information, please [email](mailto:patrick.nzediegwu@gmail.com)