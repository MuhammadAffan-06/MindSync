# Frontend Setup Checklist (Next.js)

1. **Environment Variables (.env.local)**
   - Ensure you have created a `.env.local` file in the root directory for development.
   - Add all necessary environment variables like API URLs, analytics keys, etc.
   - Example .env.local file:
     ```
     CLIENT_ID=XXXX
     ```

2. **Install Dependencies**
   - Run `npm install` or `yarn install` to install all the required dependencies.
   - Make sure you have essential packages like `next`, `react`, `react-dom`, etc.

3. **Run Frontend**
   - To run the frontend server in development mode, execute:
     ```
     npm run dev
     ```
   - Your frontend should be accessible at `http://localhost:3000`.

4. **Build for Production**
   - When you're ready to deploy, build the project using:
     ```
     npm run build
     ```
   - Then run the production server:
     ```
     npm run start
     ```

5. **Linting and Formatting**
   - Make sure you run linters and formatters like ESLint and Prettier.
   - You can run the linter with:
     ```
     npm run lint
     ```
     Note: EsLint is not configured properly yet, to make full use of ESLint, make sure to use strict configurations.

6. **API Calls**
   - Make sure serverBaseUrl and API calls (via `fetchData` or 'fetchDataJSON`)
     in ./src/app/components/utils/api.ts are working properly, especially if you're
     connecting to the backend.

7. **CORS Setup (if backend and frontend are on different domains)**
   - Ensure that your frontend can communicate with your backend API.
     The backend should have CORS enabled (check backend setup).
---