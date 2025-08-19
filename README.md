# Weight Tracker Web App (Node.js Edition)

This project is a full‑stack CRUD application for tracking body weight entries over time.  It consists of a React front‑end and a Node.js back‑end using Express and PostgreSQL.  Users can add, edit and delete weight entries, view them in a table and visualize their progress with a line chart.

## Project Structure

```
weight-tracker-node-app/
├── backend/             # Node.js REST API
│   ├── package.json
│   ├── src/
│   │   ├── db.js              # PostgreSQL connection
│   │   ├── server.js          # Express server setup
│   │   ├── routes/
│   │   │   └── weightEntries.js  # CRUD routes for weight entries
│   │   └── services/
│   │       └── weightEntryService.js  # In‑memory service used in unit tests
│   └── tests/
│       └── weightEntryService.test.js  # Jest tests for the service
└── frontend/            # React application (same as the previous version)
    ├── public/
    └── src/
```

## Getting Started

### Prerequisites

- **Node.js** v18 or newer and npm
- **PostgreSQL** running locally or accessible via a connection string
- (For the front‑end) npm packages installed (see below)

### Database Setup

Create a PostgreSQL database (e.g. `weighttracker`) and a table called `weight_entries`:

```sql
CREATE TABLE weight_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  weight DECIMAL NOT NULL
);
```

Alternatively, you can name the database however you like; just update the connection string accordingly.

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Provide a PostgreSQL connection string.  The API reads the `DATABASE_URL` environment variable; if it’s not set it defaults to `postgres://postgres:postgres@localhost:5432/weighttracker`.  You can create a `.env` file in the `backend` directory:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/weighttracker
   PORT=5000
   ```

4. Start the API server:

   ```bash
   npm start
   ```

   The API will listen on the port defined by `PORT` (default 5000) and expose endpoints under `/api/WeightEntries`.

5. Run unit tests with Jest:

   ```bash
   npm test
   ```

### Front‑end Setup

The React front‑end lives in the `frontend` directory and is unchanged from the C# version.

1. Navigate to the `frontend` directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

2. Define the API base URL using a `.env` file:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The application will open at `http://localhost:3000` with the Node.js backend serving data.  Use the **My Weights** page to manage entries and see the chart updated in real time.

Enjoy tracking your progress with a fully JavaScript stack!