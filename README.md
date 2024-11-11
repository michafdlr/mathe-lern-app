# Math Learning App

Welcome to the **Math Learning App**! This project is a math tutoring application designed to help students prepare for their exams by providing personalized learning paths, exercises, and AI-assisted feedback.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About the Project

This app is my first major project using **Next.js** and serves as a learning experience to deepen my understanding of React and modern web development practices. The goal is to create an interactive platform where students can enhance their math skills with the support of artificial intelligence.

## Features

- **Personalized Learning Paths**: Create custom courses tailored to individual learning needs.
- **Interactive Exercises**: Practice math problems with instant feedback.
- **AI Assistance**: Leverage AI to optimize learning progress and identify areas for improvement.
- **User Authentication**: Secure login and registration powered by Clerk.
- **Responsive Design**: Accessible on various devices with a user-friendly interface.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Clerk**: Authentication and user management solution.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **SQLite with Drizzle ORM**: Lightweight database solution with an ORM for data management.
- **React Icons**: Icon library for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React KaTeX**: Display mathematical equations in React components.
- **YouTube API**: Embedded YouTube videos for instructional content.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **npm or yarn**: Package manager that comes with Node.js (npm) or install yarn [here](https://yarnpkg.com/).

### Installation

1. **Clone the Repository**

   `git clone https://github.com/yourusername/math-learning-app.git`

2. **Navigate to the Project Directory**

   `cd math-learning-app`

3. **Install Dependencies**

   ```sh
   npm install # or yarn install
   ```

4. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory and add your environment variables. For example:
   ```sh
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

5. **Run the Development Server**

   ```sh
   npm run dev # or yarn dev
   ```

6. **Visit the App**

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Usage

- **Home Page**: Introduction and overview of the app with options to sign in or register.
- **Dashboard**: Access personalized courses and track learning progress.
- **Create Course**: Generate new learning paths by selecting categories and customizing options.
- **Exercises**: Practice problems with instant feedback and AI-generated hints.
- **Profile Management**: Edit personal information and view learning statistics.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-source and available under the MIT License.

Note: This project is intended as a learning exercise in Next.js and React development. While it may not be a production-ready application, it demonstrates foundational concepts and practices in modern web development.
