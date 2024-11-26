backend:
npm install express mongoose cors
node server.js
frontend:

Development Mode
    npm install nodemon --save-dev
    global-
    npm install -g nodemon

Backend:
    Start MongoDB locally.
    Start the backend in development mode:
    npm run dev
Frontend:
    Navigate to the frontend folder.
    Install dependencies and start the development server:
    npm install
    npm start

    - Production Build
Build the frontend:


cd frontend
npm run build
npm install -g serve
serve -s build

Move the frontend build folder to the backend:

The backend already serves static files from the frontend/build directory.
Start the backend in production:

bash
Copy code
NODE_ENV=production node server.js

Deployment (Heroku Example)
Install Heroku CLI:

bash
Copy code
npm install -g heroku
Login to Heroku:

bash
Copy code
heroku login
Create a Heroku App:

bash
Copy code
heroku create
Add MongoDB with Heroku Add-Ons:

bash
Copy code
heroku addons:create mongolab
Set Environment Variables:

bash
Copy code
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret
Deploy:

bash
Copy code
git add .
git commit -m "Initial commit"
git push heroku main
Your application will now be live on Heroku.


=============
npm install react-chartjs-2@5.2.0
