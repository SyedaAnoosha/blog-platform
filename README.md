# Scroll Space

A full-stack blog management platform with a pink-themed, responsive UI using Django REST Framework and React, with JWT authentication.

## Features

- User authentication (register, login) with JWT
- Blog CRUD operations with a rich-text editor (ReactQuill)
- Commenting system
- Responsive design with Tailwind CSS and a pink color scheme
- Home page with platform features and login/register options
- Dashboard with welcome message, blog count, and create blog button

## Technology Stack

- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, Redux, Axios, ReactQuill, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### Backend

1. **Install dependencies**:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install django djangorestframework psycopg2-binary django-cors-headers djangorestframework-simplejwt python-dotenv
   ```

2. **Create `.env` file in `blog_platform/`**:
   ```plaintext
   SECRET_KEY=your-secret-key-here-please-replace-with-a-secure-value
   DB_NAME=blog_platform_db
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Set up PostgreSQL**:
   - Create a database named `blog_platform_db`.
   - Update `.env` with your PostgreSQL credentials.

4. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```

### Frontend

1. **Install dependencies**:
   ```bash
   npm create vite@latest frontend -- --template react

   cd frontend

   npm install

   npm uninstall react react-dom

   npm install react@^18.3.1 react-dom@^18.3.1 react-quill@^2.0.0 react-router-dom@^7.6.3

   npm install -D @types/react@^18.2.0 @types/react-dom@^18.2.0

   npm install -D tailwindcss@3.4.3

   npm install axios react-redux @reduxjs/toolkit postcss autoprefixer

   npm install
   ```

2. **Create `.env` file in `blog-frontend/`**:
   ```plaintext
   API_URL=http://localhost:8000/api
   ```

3. **Set up Tailwind CSS**:
   - Run `npx tailwindcss init -p` and configure `tailwind.config.js` and `src/index.css` as shown in the code.

4. **Start the React server**:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/register/`: Register a new user (returns JWT access and refresh tokens)
- `POST /api/token/`: Login and get JWT tokens
- `POST /api/token/refresh/`: Refresh JWT access token
- `GET/POST /api/blogs/`: List or create blogs (user-specific)
- `GET/PUT/DELETE /api/blogs/<id>/`: Retrieve, update, or delete a blog
- `GET/POST /api/comments/`: List or create comments

## Troubleshooting

- **Login/Register not working**:
  - Ensure the backend server is running at `http://localhost:8000`.
  - Check browser console for error messages.
  - Verify `CORS_ALLOWED_ORIGINS` in `settings.py` includes `http://localhost:5173` and `http://localhost:3000`.
  - Ensure PostgreSQL is running and `.env` credentials are correct.

- **JWT Token Issues**:
  - Ensure `Authorization: Bearer <access_token>` is used in API requests.
  - Use the `/api/token/refresh/` endpoint to refresh expired access tokens.

- **Styling issues**:
  - Confirm Tailwind CSS is properly configured.
  - Clear browser cache or restart the React server.

## Notes

- The UI uses a pink color scheme with Tailwind CSS and Inter font for a modern look.
- The frontend assumes the backend is running at `http://localhost:8000`.