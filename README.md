# Custom Codeforces Clone

![Custom Codeforces](https://img.shields.io/badge/React-18.x-blue?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.x-green?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Container-blue?style=flat-square)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Integration](#docker-integration)
- [File Structure](#file-structure)
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
- **Frontend**: 
  - React.js (with TypeScript)
  - Tailwind CSS (for styling)
  - Recoil (for state management)
  - Shadcn 
  
- **Backend**:
  - Node.js with Express.js
  - MySQL with Sequelize ORM
  - Docker (for containerized code execution)
  - RabbitMq for queueing submissions/runs
  
- **Other**:
  - JWT for Authentication
  - WebSockets for real-time notifications of code execution results
  
## Installation

### Prerequisites
- **Node.js** (v14+)
- **Docker**
- **MySQL** (or any SQL-based DB supported by Sequelize)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/codeforces-clone.git
   cd codeforces-clone
