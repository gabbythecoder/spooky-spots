# How to run Spooky Spot on your local system

## Step 1: Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (LTS version is recommended)
- npm (comes with Node.js) or Yarn

You can verify your installations by running:

```bash
node -v

npm -v
```

## Step 2: Installation and Setup

Follow these steps to get your local environment running:

- Clone the Repository
  Open your terminal and clone the project to your local machine:
  ```bash
  git clone git@github.com:gabbythecoder/spooky-spots.git
  ```
- Navigate to the Project Directory
  Change into the project folder:
  ```bash
  cd spooky-spots
  ```
- Install Dependencies
  Install all the necessary packages defined in your package.json file:

  ```bash
  npm install
  ```

Configure Environment Variables for Local Use

- Locate the Example File: Find the file named `.env.example` within the Setup-Guide folder. It lists all the required environment variables.
- Create Your Local File: Create a new file named `.env.local` in the root directory.
- Populate Secrets: Open the newly created `.env.local` file and replace the placeholder values with your own keys for local testing and development.

## Step 3: Database Setup

This application requires a PostgreSQL database.

- Schema Overview: A visual representation of the database schema is available here: [Database.png](/personal-docs/Setup-Guide/DataBase.png).
- Create Database Tables: To easily set up the necessary tables, use the provided SQL script: [SQL_Editor.sql](/personal-docs/Setup-Guide/SQL_Editor.sql).
- You can open this file with any basic SQL editor and execute its contents in your own PostgreSQL database.

**Note:** Ensure your PostgreSQL server is running and you have created an empty database before running the script.

## Step 4: Running the Application

Once the installation is complete, you can run the application in development mode:

- Start the Development Server
  Execute the following command in your terminal:
  ```bash
  npm run dev
  ```
- View the App
  The Next.js development server will typically start on port 3000. Open your web browser and navigate to: http://localhost:3000

The app should now be running locally!
