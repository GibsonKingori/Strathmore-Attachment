# School Attachment System - Backend API

A comprehensive Node.js/Express.js backend API for managing student attachments, applications, reports, and evaluations.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Support for multiple user roles (Admin, Student, School Supervisor, Host Supervisor)
- **Application Management**: Students can apply to organizations, supervisors can approve/reject
- **Report System**: Students submit weekly reports, supervisors review them
- **Evaluation System**: Host supervisors evaluate student performance
- **Attendance Tracking**: Host supervisors mark student attendance
- **Dashboard Analytics**: Comprehensive statistics and analytics for all user types

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-Origin Resource Sharing enabled

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd backen_atm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `src/config/` directory:
   ```env
   # Database Configuration
   DB_USER=postgres
   DB_HOST=127.0.0.1
   DB_NAME=attachment_db
   DB_PASSWORD=your_password
   DB_PORT=5432

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=4h

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8080
   ```

4. **Set up the database**
   - Create a PostgreSQL database named `attachment_db`
   - Run the database schema (see Database Schema section below)

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Database Schema

The system uses the following main tables:

- `admin` - Admin users
- `students` - Student users
- `school_supervisor` - School supervisor users
- `host_supervisor` - Host supervisor users
- `users` - General users
- `organizations` - Attachment organizations
- `applications` - Student applications to organizations
- `reports` - Student weekly reports
- `evaluations` - Host supervisor evaluations
- `attendance` - Student attendance records

## API Endpoints

### Authentication
- `POST /api/auth/create-user` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard
- `GET /api/dashboard/student` - Student dashboard
- `GET /api/dashboard/school-supervisor` - School supervisor dashboard
- `GET /api/dashboard/host-supervisor` - Host supervisor dashboard

### Applications
- `POST /api/applications` - Create application (Student)
- `GET /api/applications/student` - Get student's applications
- `GET /api/applications` - Get all applications (Admin)
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/:id/status` - Update application status
- `DELETE /api/applications/:id` - Delete application (Student)

### Organizations
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/search` - Search organizations
- `GET /api/organizations/:id` - Get organization by ID
- `POST /api/organizations` - Create organization (Admin)
- `PUT /api/organizations/:id` - Update organization (Admin)
- `DELETE /api/organizations/:id` - Delete organization (Admin)

### Reports
- `POST /api/reports` - Create report (Student)
- `GET /api/reports/student` - Get student's reports
- `GET /api/reports/supervisor` - Get supervisor's reports
- `GET /api/reports` - Get all reports (Admin)
- `GET /api/reports/:id` - Get report by ID
- `PUT /api/reports/:id/status` - Update report status
- `PUT /api/reports/:id` - Update report (Student)
- `DELETE /api/reports/:id` - Delete report (Student)

### Students
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/supervisor/students` - Get supervisor's students
- `GET /api/students/search` - Search students (Admin)
- `GET /api/students/:id` - Get student by ID (Admin)
- `POST /api/students` - Create student (Admin)
- `PUT /api/students/:id` - Update student (Admin)
- `DELETE /api/students/:id` - Delete student (Admin)

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/analytics` - Get system analytics
- `GET /api/admin/activities` - Get recent activities
- `GET /api/admin/supervisors` - Get all supervisors
- `POST /api/admin/supervisors` - Create supervisor
- `PUT /api/admin/supervisors/:id` - Update supervisor
- `DELETE /api/admin/supervisors/:id` - Delete supervisor

### Supervisor (Host Supervisor)
- `GET /api/supervisor/organization` - Get organization details
- `GET /api/supervisor/students` - Get assigned students
- `POST /api/supervisor/attendance` - Mark attendance
- `GET /api/supervisor/attendance` - Get attendance records
- `POST /api/supervisor/evaluations` - Create evaluation
- `GET /api/supervisor/evaluations` - Get evaluations
- `PUT /api/supervisor/evaluations/:id` - Update evaluation

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/password` - Change password
- `GET /api/profile/activity` - Get user activity

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/search` - Search users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## User Roles

### Admin
- Full system access
- Manage all users, organizations, and data
- View system analytics and statistics
- Approve/reject applications and reports

### Student
- Apply to organizations
- Submit weekly reports
- View their applications and reports
- Update their profile

### School Supervisor
- View assigned students
- Review student reports
- Manage student evaluations
- View student progress

### Host Supervisor
- Manage organization details
- Mark student attendance
- Create student evaluations
- View assigned students

## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Success Responses

Standardized success responses:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "statusCode": 200
}
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000
- http://localhost:5173 (Vite dev server)
- http://localhost:8080

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Health Check
```bash
GET http://localhost:3000/api/health
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS protection
- SQL injection prevention with parameterized queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the development team. 