# CooksCorner - Recipe Finder Website

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) recipe finder application with user authentication, admin panel, and recipe management features.

## 🚀 Features

### User Features
- User registration and authentication
- Browse recipes by categories (Breakfast, Main Course, Desserts, etc.)
- Search and filter recipes
- User profile management
- Premium cookbooks access
- Shopping cart functionality
- Contact form

### Admin Features
- Admin dashboard with statistics
- Recipe management (CRUD operations)
- User management
- Top recipes management
- Admin authentication

## 🔧 Security Fixes Implemented

### Authentication & Authorization
- ✅ Fixed broken JWT token generation
- ✅ Corrected admin login logic
- ✅ Added proper authentication middleware
- ✅ Implemented protected routes
- ✅ Added input validation and sanitization

### Security Headers & Configuration
- ✅ Added Helmet.js for security headers
- ✅ Implemented rate limiting
- ✅ Configured CORS properly
- ✅ Added request size limits
- ✅ Implemented proper error handling

### Data Validation
- ✅ Server-side input validation
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ XSS protection
- ✅ SQL injection prevention

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/cooks-corner
   SECRETKEY=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:5173
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
CooksCorner-Recipe-Finder/
├── Server/
│   ├── src/
│   │   ├── config/
│   │   │   └── Database.js
│   │   ├── controllers/
│   │   │   ├── adminControllers.js
│   │   │   ├── userControllers.js
│   │   │   ├── recipeControllers.js
│   │   │   └── topRecipeControllers.js
│   │   ├── middlewere/
│   │   │   └── authMiddlewere.js
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── recipeModel.js
│   │   │   └── topRecipes.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── recipeRoutes.js
│   │   │   └── topRecipesRoutes.js
│   │   └── utils/
│   │       └── generateToken.js
│   ├── index.js
│   └── package.json
├── Client/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── User/
│   │   │   └── Admin/
│   │   ├── Pages/
│   │   │   ├── User/
│   │   │   └── Admin/
│   │   ├── ProtectedRoutes/
│   │   ├── context/
│   │   └── Styles/
│   ├── App.jsx
│   └── package.json
└── README.md
```

## 🔐 Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Token expiration handling
- Protected routes for users and admins

### Input Validation
- Server-side validation for all inputs
- Email format validation
- Password strength requirements
- XSS protection

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Request size limits

## 🚀 API Endpoints

### User Routes
- `POST /users/user-register` - User registration
- `POST /users/user-login` - User login
- `GET /users/profile` - Get user profile (protected)
- `PUT /users/profile` - Update user profile (protected)

### Admin Routes
- `POST /admin/login` - Admin login
- `GET /admin/dashboard` - Admin dashboard (protected)
- `GET /admin/all-users` - Get all users (protected)
- `DELETE /admin/users/:id` - Delete user (protected)

### Recipe Routes
- `GET /recipes` - Get all recipes
- `POST /recipes` - Create recipe (admin only)
- `PUT /recipes/:id` - Update recipe (admin only)
- `DELETE /recipes/:id` - Delete recipe (admin only)

## 🎨 Frontend Features

### Components
- Responsive navigation with authentication status
- User profile management
- Protected route components
- Form validation with error handling
- Loading states and user feedback

### State Management
- React Context for authentication
- Local storage for token persistence
- Form state management
- Error handling

## 🔧 Development

### Running in Development
```bash
# Terminal 1 - Backend
cd Server
npm run dev

# Terminal 2 - Frontend
cd Client
npm run dev
```

### Building for Production
```bash
# Backend
cd Server
npm start

# Frontend
cd Client
npm run build
```

## 🐛 Known Issues & Fixes

### Fixed Issues
- ✅ Broken JWT token generation
- ✅ Admin login logic error
- ✅ Missing authentication middleware
- ✅ Incomplete form validation
- ✅ Security vulnerabilities
- ✅ Missing error handling

### Completed Tasks
- [x] Add recipe search functionality
- [x] Implement shopping cart features
- [x] Add recipe rating system
- [x] Implement image upload for recipes
- [x] Add email verification
- [x] Implement password reset functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Note:** This project has been significantly improved with security fixes and additional features. Make sure to update the environment variables and test all functionality before deployment.
