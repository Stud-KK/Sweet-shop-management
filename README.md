# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, product management, and purchase functionality.

## 🍰 Features

### Backend (Spring Boot + MongoDB)
- **User Authentication**: JWT-based authentication with registration and login
- **Role-based Access Control**: User and Admin roles with different permissions
- **Sweet Management**: CRUD operations for sweets (Admin only)
- **Inventory Management**: Purchase and restock functionality
- **Search & Filter**: Advanced search by name, category, and price range
- **RESTful API**: Well-structured API endpoints with proper HTTP methods
- **Security**: Custom authentication filter, password hashing, JWT tokens, and CORS configuration

### Frontend (React)
- **Modern UI**: Responsive design with Tailwind CSS
- **Authentication**: Login and registration forms with validation
- **Dashboard**: Browse and search sweets with real-time updates
- **Admin Panel**: Complete inventory management interface
- **Purchase System**: One-click purchase with stock validation
- **Search & Filter**: Advanced filtering capabilities
- **Toast Notifications**: User feedback for all actions

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MongoDB 4.4 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweet-shop-management-system
   ```

2. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally and start the service
   ```

3. **Configure the application**
   ```bash
   cd backend
   # Update application.yml if needed (default MongoDB connection: mongodb://localhost:27017/sweetshop)
   ```

4. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   The backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweet Management Endpoints
- `GET /api/sweets` - Get all sweets (public)
- `GET /api/sweets/{id}` - Get sweet by ID (public)
- `POST /api/sweets` - Create new sweet (Admin only)
- `PUT /api/sweets/{id}` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (Admin only)

### Search & Filter
- `GET /api/sweets/search?name={name}&category={category}&minPrice={min}&maxPrice={max}` - Search sweets

### Inventory Management
- `POST /api/sweets/{id}/purchase` - Purchase sweet (Authenticated users)
- `POST /api/sweets/{id}/restock` - Restock sweet (Admin only)

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🏗️ Architecture

### Backend Architecture
```
backend/
├── src/main/java/com/sweetshop/
│   ├── model/          # Data models (User, Sweet)
│   ├── repository/      # MongoDB repositories
│   ├── service/         # Business logic
│   ├── controller/      # REST controllers
│   ├── security/        # JWT security configuration
│   └── dto/            # Data transfer objects
└── src/test/java/      # Unit tests
```

### Frontend Architecture
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── contexts/       # React contexts (Auth, Sweet)
│   ├── services/       # API service layer
│   └── styles/         # CSS and styling
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Database Configuration
The application uses MongoDB with the following default configuration:
- Database: `sweetshop`
- Collections: `users`, `sweets`
- Connection: `mongodb://localhost:27017/sweetshop`

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Real-time Updates**: Instant feedback for all user actions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: SHA-256 with salt for password security
- **Role-based Access**: Different permissions for users and admins
- **Custom Authentication Filter**: Lightweight authentication without Spring Security
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **MongoDB Security**: Parameterized queries and proper data handling

## 📱 Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Welcome page with feature overview and call-to-action*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing available sweets with search and filter*

### Admin Panel
![Admin Panel](screenshots/admin.png)
*Admin interface for managing inventory*

### Authentication
![Login](screenshots/login.png)
*User login and registration forms*

## 🤖 My AI Usage

### AI Tools Used
- **GitHub Copilot**: Used extensively for code completion and boilerplate generation
- **ChatGPT**: Used for architectural decisions, debugging assistance, and code review
- **Claude**: Used for documentation writing and test case generation

### How AI Was Used

#### 1. Code Generation and Completion
- **GitHub Copilot**: Assisted with generating boilerplate code for Spring Boot controllers, services, and React components. Copilot was particularly helpful in:
  - Creating REST API endpoints with proper annotations
  - Generating React component structures with hooks
  - Writing validation logic and error handling
  - Creating CSS classes and styling

#### 2. Architecture and Design Decisions
- **ChatGPT**: Used to brainstorm and validate architectural decisions:
  - Discussed JWT authentication implementation approach
  - Validated MongoDB schema design for User and Sweet models
  - Reviewed security configuration and best practices
  - Helped design the API structure and endpoint organization

#### 3. Testing and Quality Assurance
- **Claude**: Assisted with test case generation:
  - Created comprehensive unit tests for service layers
  - Generated test data and mock objects
  - Helped write integration test scenarios
  - Reviewed test coverage and suggested improvements

#### 4. Documentation and Code Review
- **ChatGPT**: Used for documentation and code review:
  - Helped write comprehensive README documentation
  - Reviewed code for potential security vulnerabilities
  - Suggested improvements for code organization and readability
  - Assisted with API documentation and examples

#### 5. Debugging and Problem Solving
- **GitHub Copilot**: Provided debugging assistance:
  - Helped identify and fix compilation errors
  - Suggested solutions for runtime issues
  - Assisted with dependency management and configuration

### Impact on Workflow

#### Positive Impacts
1. **Faster Development**: AI tools significantly accelerated the development process, especially for boilerplate code and repetitive tasks
2. **Better Code Quality**: AI suggestions helped maintain consistent coding patterns and best practices
3. **Learning Enhancement**: Working with AI tools provided insights into modern development practices and patterns
4. **Comprehensive Testing**: AI assistance in test generation led to better test coverage and more robust testing

#### Challenges and Limitations
1. **Context Understanding**: Sometimes AI suggestions didn't fully understand the project context, requiring manual refinement
2. **Over-reliance**: Had to be careful not to become overly dependent on AI suggestions without understanding the underlying logic
3. **Code Review**: AI-generated code still required thorough review to ensure it met project requirements

#### Responsible AI Usage
- **Transparency**: All AI-generated code was reviewed and modified as needed
- **Understanding**: Made sure to understand all AI-suggested code before implementation
- **Validation**: Tested all AI-assisted features thoroughly
- **Documentation**: Documented AI usage transparently in this README

### Reflection
The integration of AI tools into this development process was highly beneficial. It allowed for faster iteration, better code quality, and more comprehensive testing. However, it's important to maintain a balance between AI assistance and human oversight to ensure the final product meets all requirements and maintains high quality standards.

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   cd backend
   mvn clean package
   ```

2. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
<<<<<<< HEAD
   ```

2. Deploy to platforms like Vercel, Netlify, or AWS S3
=======
>>>>>>> e3d1dde80e90b2954d434b667d24e91b396d6d64

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

<<<<<<< HEAD
- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

Co-authored-by: AI Assistant <ai@users.noreply.github.com>

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- MongoDB team for the flexible database solution
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors who made this project possible
=======


Co-authored-by: AI Assistant <ai@users.noreply.github.com>
>>>>>>> e3d1dde80e90b2954d434b667d24e91b396d6d64
