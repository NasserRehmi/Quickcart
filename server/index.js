import express from 'express';
import cors from 'cors';
import { clientRouter } from './Routes/ClientRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path'; // For handling file paths   

const app = express();

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Configure CORS
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-parser middleware
app.use(cookieParser());

// Routes
app.use('/auth', clientRouter);

// Handle preflight requests for all routes
app.options('*', cors());

// Start the server
app.listen(3000, () => {
  console.log('Server is running');
});
