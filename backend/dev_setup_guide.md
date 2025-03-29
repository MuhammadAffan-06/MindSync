# Backend Setup Checklist

1. **Environment Variables (.env)**
   - Ensure you have created a `.env` file in the root directory.
   - Add all the required environment variables (e.g., DATABASE_URL, JWT_SECRET, etc.).
   - Example .env file:
     ```
     PORT=XXXX
     CLIENT_BASE_URL=XXXX
     SERVER_DOMAIN=XXXX
     NODE_ENV=development
     DATABASE_CONNECTION_STRING = mongodb+srv://XXXX.mongodb.net/XXXX
     JWT_SECRET= XXXX
     CLIENT_ID= XXXX.apps.googleusercontent.com
     CLIENT_SECRET= XXXX

     ```

2. **Install Dependencies**
   - Run `npm install` or `yarn install` to install the required packages.
   - Ensure the necessary dependencies are installed, such as `express`, `mongoose`, `dotenv`, etc.

3. **Database Setup**
   - Make sure your database is set up (MongoDB, PostgreSQL, etc.) and running.
   - Ensure the `.env` file contains the correct database connection string.

4. **Run Backend**
   - To start the backend server, run:
     ```
     npm run dev
     ```
   - Ensure you have a `start` script for production, for example:
     ```
     npm run start
     ```
