# Splitly

## Project Overview

Splitly is a web app for splitting bills with friends! 🥰

## Features

- **App**:
  - Data persistence with `localStorage`.
  - User-friendly UX for managing shared bills.
- **Bill Management**:
  - Create and manage shared bills.
  - View, select, and divide expenses among friends.
  - Automatic calculation of each user's share based on the total bill amount.
- **Transaction Handling**:
  - Manage users, bank accounts, and transactions.
- **Error Handling**:
  - Input validation for user contributions.
  - Display error messages for invalid inputs or failed payment requests.

## App Setup

- Create a `.env` file in both the frontend and backend directories using the `.env.example` file as a template.

### Frontend

- Navigate to the frontend directory and run:
  - `pnpm install`
  - `pnpm dev` (App will be available at [http://localhost:5173](http://localhost:5173))

### Backend

The backend requires **Docker** and **Docker Compose** to run the database.

- Navigate to the backend directory and:
  - For first-time setup:
    - `make init` to install dependencies and load the database fixtures.
    - `make start` to start the container, generate the schema, migrate & seed the database, and start the server.
    - Use `make db-stop` to stop the container.
    - Refer to the Makefile for additional commands.
  - For subsequent runs:
    - `pnpm dev` to start the server.
    - `pnpm db:push` to push schema updates to the database.

## Schema

The app uses **PostgresDB** due to the relational nature of the entities involved, and **Drizzle ORM** for database interactions and migrations.

### Users Table (`users`)

- Stores user data: `userId`, `email`, `fullName`.
- Relates to accounts, transactions, bill participants, friends, and bill splits.

#### Accounts Table (`accounts`)

- Stores bank account details: `accountId`, `accountNumber`, `userId`, `balance`, `accountType`.
- Relates to users (account owner) and transactions.

#### Transactions Table (`transactions`)

- Stores transaction data: `transactionId`, `accountId`, `amount`, `vendor`, `category`, `transactionDate`.
- Linked to accounts and bill splits.

#### Bill Splits Table (`bill_splits`)

- Tracks bill splits: `splitId`, `transactionId`, `payerId`, `totalAmount`, `splitDate`.
- Relates to transactions, payer (user), and bill participants.

#### Bill Participants Table (`bill_participants`)

- Represents participants in a split bill: `billParticipantId`, `splitId`, `userId`, `amountOwed`, `paymentStatus`.
- Linked to bill splits and users (participants).

#### Enums

- **`paymentStatusEnum`**: Manages bill payment statuses (e.g., `pending`, `paid`, `rejected`).
- **`categoryEnum`**: Categorizes transactions (e.g., `dining`, `groceries`).
- **`accountTypeEnum`**: Categorizes accounts (e.g., `checking`, `savings`).

#### Lifecycle Dates

- Helper function to generate `createdAt` and `updatedAt` timestamps for record management (in UTC).

## Technologies

### Frontend

The frontend is built with **Vue 3** and **Vite** using the Composition API.

- **Pinia** for global state and async data management.
- **Vue Router** for navigation.
- App state is persisted to `localStorage`.
- **`ofetch`** for API calls.

## Limitations

To reduce scope and complexity:

- Most backend data is generated for faster development.
- No authentication or authorization (but includes a helpful user management button).
- Bill split functionality currently only supports dividing the total amount.
- No payment request/management features - bill payments are assumed to be paid immediately.
- For users with multiple accounts, deductions from friends are currently processed by selecting the first account found in the database. This could be improved by allowing friends to choose which account they’d like the bill subtracted from.
- No user account management/authentication.

## Future Improvements

- Add tests!
- Implement user authentication and authorization.
- Enhance error handling and user feedback.
- Improve UI for better user experience.
- Enable users to create and manage their own accounts.
- Implement payment request/management, custom split options.
- Bill reminders/notification system.
- Enhance database performance and scalability (e.g., prepared statements, query optimization, indexing).
- Use caching to reduce database load.
- Add shared tabs for groups

## Technologies

- **Frontend**:
  - **Vue** for the UI.
  - **Tailwind CSS** for styling.
  - **Pinia** for state management and async actions.
  - **Vue Router** for routing.
- **Backend**:
  - **Node.js** for server-side logic.
  - **Express.js** for the API.
  - **Drizzle ORM** for database operations.
  - **PostgreSQL** for the database.
  - **Docker** for containerization.
  - **Pino** for logging.

## Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Hero Icons](https://heroicons.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/) - [Tailwind CSS Cheatsheet](https://www.creative-tim.com/twcomponents/cheatsheet)

Thanks for checking out *Splitly*!
The project took roughly 12 hours so far, and I really enjoyed working on it! It's my first time using Vue, and I'm proud of how it turned out.

That said, it’s still a work in progress and far from finished, but it’s ready to ship! 🎉

Please let me know if you have any feedback or suggestions for improvement.
If you encounter any issues or need more information, feel free to [email me](mailto:patrick.nzediegwu@gmail.com).
