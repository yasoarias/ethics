# GE11 Ethics Search Engine

A web application for searching and exploring ethics topics from GE11 (ETHICS) subject.

## Features

- Search through ethics topics
- Filter topics by category
- View detailed topic information
- Responsive design for all devices

## Technology Stack

- Frontend: Vue.js 3 with Vite
- Backend: Node
- Database: MySQL (default)

## Prerequisites

- Node.js 16 or higher
- npm

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL=your_database_url
   ```

3. Start the development server:
   ```bash
   npm start
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

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Testing

To run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 

