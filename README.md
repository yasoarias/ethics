# GE11 Ethics Chatbot

A web application for searching and exploring ethics topics from GE11 (ETHICS) subject.

## Features

- Search through ethics topics
- Filter topics by category
- View detailed topic information
- Responsive design for all devices

## Technology Stack

- Frontend: Vue.js 3 with Vite
- Backend: Laravel 10
- Database: SQLite (default)

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16 or higher
- npm

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Use the search bar to find specific ethics topics
3. Browse through the topics list
4. Click on a topic to view its detailed information

## API Endpoints

- `GET /api/topics` - Get all topics
- `GET /api/topics/{id}` - Get a specific topic
- `GET /api/topics/search?query={search_term}` - Search topics
- `POST /api/topics` - Create a new topic
- `PUT /api/topics/{id}` - Update a topic
- `DELETE /api/topics/{id}` - Delete a topic

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 