# 🚀 Maxlence Assignment – Backend

This is the backend API for the **Maxlence Assignment** project. It handles user authentication, profile image uploads, admin functionality, and secure data access using Node.js, Express, Sequelize, and MySQL.

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MySQL** with **Sequelize ORM**
- **JWT** (Access & Refresh Tokens)
- **Multer** (Image upload)
- **Express Validator** (Request validation)

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your backend project with the following values:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173/

# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-password

# MySQL Configuration
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=localhost
DB_PASS=localhost
DB_NAME=maxlence_assignment

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# (Optional) Redis if used
UPSTASH_REDIS_URL=


📂 Project Structure

.
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── middleware/
│   ├── authorization.js
│   └── upload.js
├── models/
    ├── user.model.js
├── routes/
│   ├── auth.route.js
│   └── user.route.js
├── utils/
├── config/
├── server.js
├── .env
└── README.md

🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/abhinayy58/maxlence_assignment.git
cd maxlence_assignment
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set up MySQL Database
Make sure MySQL is running locally. Create a database named:

nginx
Copy
Edit
maxlence_assignment
Sequelize will handle the table creation automatically on server start.

🧪 Run the Server
bash
Copy
Edit
npm run dev
Server will run at http://localhost:4000

🔐 API Endpoints
🔑 Auth Routes
Method	Endpoint	Description
POST	/auth/signup	Register new user with image
POST	/auth/login	Login
POST	/auth/logout	Logout
POST	/auth/refresh-token	Refresh JWT token
GET	/auth/profile	Get logged-in user's profile
POST	/auth/forgot-password	Request password reset
POST	/auth/reset-password/:token	Reset password

👮 Admin Routes
Method	Endpoint	Description
GET	/user/admin/users	List all users
DELETE	/user/admin/delete/:id	Delete a user

📁 Profile Image Upload
Uses multer to handle image uploads under the field name profilePic.

✅ Validation
All inputs are validated using express-validator.

📄 License
This project is open-source and available under the MIT License.

✍️ Author
Abhinay Yadav