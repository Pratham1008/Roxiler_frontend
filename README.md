# Store Rating Application: Client-Side Interface

## Introduction
This repository contains the source code for the client-side component of the Store Rating application. It is a sophisticated, responsive, and full-featured user interface developed utilizing React and TypeScript. The design facilitates a fluid user experience for interacting with the backend API, presenting distinct dashboards and functionalities that are contingent upon the authenticated user's role.

## Core Features
- **Modular Architecture**: The application is structured utilizing a component-based architecture, a paradigm that enhances code reusability and simplifies long-term maintenance.

- **Role-Based User Interface**: The user interface is rendered dynamically, presenting customized dashboards and functionalities tailored to the specific roles of Administrator, Store Owner, or standard User.

- **Secure Authentication Protocol**: The application incorporates dedicated pages for user login, registration, and password modification, ensuring a secure and intuitive authentication process.

- **Centralized State Management**: Global application state, particularly for user authentication, is managed through the React Context API.

- **Interactive Rating System**: A dynamic star-based component allows users to submit and update store ratings efficiently.

- **Dynamic Data Rendering**: The system fetches and displays lists of users, stores, and ratings, incorporating capabilities for data filtering and searching.

- **Responsive Design Implementation**: The user interface has been developed with Tailwind CSS to ensure full responsiveness and an optimal viewing experience across a wide range of devices, from mobile platforms to desktop computers.

- **System Notifications**: User feedback for critical operations, such as successful authentication or data submission, is provided through non-intrusive toast notifications.

## Technology Stack
The frontend of this application is constructed with the following technologies:

- **Primary Library**: React (initialized with Create React App)  
- **Programming Language**: TypeScript  
- **Styling Framework**: Tailwind CSS  
- **Navigation**: React Router for client-side routing  
- **API Client**: Axios for handling HTTP requests to the backend service  
- **Iconography**: Lucide React  
- **User Notifications**: React Hot Toast  

## Project Setup and Execution Guide

### System Prerequisites
- Installation of Node.js (version 16 or a subsequent release is recommended).
- The npm package manager.
- A running instance of the corresponding backend server on `http://localhost:3000`.

### Installation and Configuration
1. **Navigate to the Frontend Directory**: From the project's root directory, change the current directory to the frontend subdirectory.
   ```bash
   cd frontend
    ````

2. **Install Project Dependencies**: Execute the following command to install all the required packages as specified in the `package.json` file.

   ```bash
   npm install
   ```

3. **Initiate the Development Server**: This command will compile the application and start a local development server.

   ```bash
   npm start
   ```

   The application will then be accessible at `http://localhost:3001` or the next available port indicated in the terminal output. The server supports hot-reloading, which automatically reflects code modifications in the browser.

## Available Execution Scripts

Within the frontend project directory, the following commands are available for execution:

* `npm start`: Executes the application in a development environment.
* `npm test`: Initiates the test runner in an interactive watch mode.
* `npm run build`: Compiles and bundles the application for a production environment into the build directory.
* `npm run eject`: A permanent operation that removes the single build dependency and exposes the underlying configuration files.

## API Service Integration

The frontend application is configured to interface with the NestJS backend API, which is presumed to be operational at `http://localhost:3000`. All asynchronous data requests are managed via a centralized Axios instance, which is configured in the `src/services/api.ts` file.
