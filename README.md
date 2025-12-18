# Equipment Tracker

A full-stack web application for managing equipment inventory with CRUD operations.

## Features

- View a list of equipment in a table format
- Add new equipment with validation
- Edit existing equipment details
- Delete equipment items
- Responsive design that works on mobile and desktop
- Real-time updates

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Styling**: CSS (no external UI libraries)

## Prerequisites

- Node.js (v14 or later)
- MySQL Server (v8.0 or later)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the MySQL database:
   - Create a new MySQL database named `equipment_tracker`
   - Update the database configuration in `backend/db.js` if needed (default is root with no password)

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`

### 2. Frontend Setup

1. In a new terminal, navigate to the project root directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Project Structure

```
├── backend/                 # Backend server code
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API route definitions
│   ├── db.js              # Database configuration
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/        # Reusable React components
│   │   ├── EquipmentForm.jsx    # Form for adding/editing equipment
│   │   └── EquipmentList.jsx    # Table view of equipment
│   ├── context/           # React context providers
│   │   └── EquipmentContext.jsx  # Global state management
│   ├── services/          # API service layer
│   │   └── equipmentService.js
│   ├── utils/             # Utility functions
│   │   └── apiUtils.js
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   └── main.jsx           # Application entry point
├── public/                # Static files
├── .gitignore
├── package.json           # Frontend dependencies and scripts
└── README.md
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build

In the backend directory, you can run:

- `npm start` - Start the backend server

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=equipment_tracker
PORT=5000
```

## Testing the Application

1. The frontend will automatically open in your default browser when you run `npm run dev`
2. The backend API will be available at `http://localhost:5000/api/equipment`
3. Try adding, editing, and deleting equipment items to test all functionality

## Troubleshooting

- If you encounter database connection issues, verify your MySQL credentials in `backend/db.js`
- Make sure MySQL server is running before starting the backend
- Check the browser console for any frontend errors
- Check the terminal where the backend is running for any server errors

## Assumptions

1. **Database**:
   - MySQL is installed and running locally
   - Default MySQL credentials (root with no password) are used for development
   - The application will automatically create the required database table on first run

2. **Environment**:
   - Node.js v14 or later is installed
   - npm or yarn package manager is available
   - The application is meant for single-user or small team use (no authentication implemented)

3. **Data Handling**:
   - Equipment names are unique
   - Status can only be 'Active', 'Inactive', or 'Maintenance'
   - Date format follows the user's local system settings

4. **Browser Support**:
   - Modern browsers with ES6+ support (Chrome, Firefox, Edge, Safari latest versions)
   - No support for Internet Explorer

## License

This project is open source and available under the [MIT License](LICENSE).
