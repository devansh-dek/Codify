# Codify ![Express](https://img.shields.io/badge/Express-4.x-green?style=flat-square) ![Docker](https://img.shields.io/badge/Docker-Container-blue?style=flat-square)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is a **Codeforces clone** that provides an online platform for competitive programming. Built with **React** and **Express**, it allows users to submit code for various problems, which are then executed securely in **containerized Docker instances**. The platform includes user authentication, problem creation, real-time code execution, and results display, creating an environment similar to popular coding platforms like **Codeforces** and **CodeChef**.

## Features

- **User Authentication**: Secure JWT-based user authentication with session management using Recoil.
- **Problem Management**: Administrators can create problems with details like title, description, constraints, and sample inputs/outputs.
- **Code Submission and Evaluation**: Users can submit code in multiple programming languages for execution in Docker containers.
- **Real-Time Feedback**: Code is queued, executed in containers, and results (success/failure, runtime, memory usage) are displayed to users in real-time.
- **Problem Difficulty**: Problems are categorized by difficulty levels to help users choose challenges.
- **Dockerized Code Execution**: Each code submission is executed inside isolated Docker containers to ensure security and consistency.

## Tech Stack

### Frontend
- React.js (with TypeScript)
- Tailwind CSS (for styling)
- Recoil (for state management)
- Shadcn

### Backend
- Node.js with Express.js
- MySQL with Sequelize ORM
- Docker (for containerized code execution)
- RabbitMQ for queueing submissions/runs

### Other
- JWT for Authentication
- WebSockets for real-time notifications of code execution results

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v14+)
- Docker
- MySQL
- RabbitMQ

## Installation

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/codeforces-clone.git
   cd codeforces-clone 
2. **Install Dependencies**:
   ```# Install frontend dependencies
    cd client
    npm install
    # Install backend dependencies
    cd ../server
    npm install
3. **Environmental Configuration**:
   ```In both client and server directories
      cp .env.example .env
4. **Start the Services**:
      1. Ensure Docker is running
      2. Start RabbitMQ service
      3. Start MySQL service
3. **Run The Application**:
   ```# Start frontend (in client directory)
      npm run dev

      # Start backend worker (in server directory)
      npm run worker
# Update the .env files with your configurations
### Folder Structure
The project has the following folder structure:
- `client`: Contains the React frontend application.
- `server`: Contains the backend API and Docker-related services.

## Usage
Once the application is running, users can:
- **Register and Log in** to the platform.
- **Browse and submit code** for different programming problems.
- View **real-time execution results** such as success, failure, runtime, and memory usage.
- **Create and manage problems** (for admins only).

## Docker Integration
This project uses Docker to isolate and securely execute code submissions. Each submission is run in a separate Docker container to prevent security issues and ensure consistency in execution.

## Contributing
We welcome contributions! Please fork this repository, make your changes, and submit a pull request. Make sure to follow the coding standards and write tests for new features or bug fixes.

