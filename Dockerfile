# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory for the backend
WORKDIR /app/backend

# Copy package.json and package-lock.json for backend to the working directory
COPY backend/package*.json ./

# Install backend project dependencies
RUN npm install

# Copy the rest of the backend files to the working directory
COPY backend/ .

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json for frontend to the working directory
COPY frontend/package*.json ./

# Install frontend project dependencies
RUN npm install

# Copy the rest of the frontend files to the working directory
COPY frontend/ .

# Set the working directory for the application
WORKDIR /app

# Copy the rest of the files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Stage 2: Create the production image
FROM node:20

# Set the working directory for the application
WORKDIR /app

# Copy built backend files from the builder stage
COPY --from=builder /app/backend /app/backend

# Copy built frontend files from the builder stage
COPY --from=builder /app/frontend /app/frontend

# Copy built application files from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on (3000 for frontend, 4000 for backend)
EXPOSE 3000
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]
