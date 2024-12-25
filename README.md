# Task Tracker Application

A full-stack Task Tracker Application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to manage their tasks efficiently with features such as adding, editing, deleting, and filtering tasks.

## Features

### Frontend
- **Task Listing**: Fetch and display a list of tasks stored in the MongoDB database with fields like Task Name, Description, Due Date, Status (Pending, In Progress, Completed), and Priority.
- **Add Task**: Use a modal form to add new tasks with fields for Task Name, Description, Due Date, Status (default: Pending), and Priority (Low, Medium, High).
- **Edit Task**: Enable editing of tasks using the same modal form and update tasks in the database.
- **Delete Task**: Implement task deletion with a confirmation dialog to remove tasks from the database.
- **Status Filter**: Add a dropdown or segmented control to filter tasks by status (e.g., Pending, In Progress, Completed).
- **Responsive Design**: Ensure the app works seamlessly across desktop and mobile devices.
- **Overdue Tasks Highlight**: Automatically highlight overdue tasks in red.
- **User  Authentication**: Use JWT-based authentication to secure task management endpoints.

### Backend
- **Environment**: Built with Node.js and Express for the backend.
- **Database**: Uses MongoDB for data storage.

## Database Schema

The application uses a `tasks` collection in MongoDB with the following fields:
- `name` (String): Name of the task.
- `description` (String): Detailed description of the task.
- `dueDate` (Date): Deadline for the task.
- `status` (Enum): Dropdown with values (Pending, In Progress, Completed).
- `priority` (Enum): Dropdown with values (Low, Medium, High).

## API Endpoints

The following API endpoints are available:

- `GET /tasks`: Fetch all tasks.
- `POST /tasks`: Add a new task.
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-tracker-app.git
   cd task-tracker-app

2. Install dependencies for both frontend and backend:
    ```bash
    cd backend
    npm install
    cd ../frontend/tasktracking
    npm install

3. Set up your MongoDB database and update the connection string in the backend configuration.

4. Start the backend server:
    ```bash
    cd backend
    npx nodemon app.js

5. Start the frontend application:
    ```bash
    cd frontend/tasktracking
    npm start