# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY backend/ .

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY frontend/ .

# Expose the port the app runs on
EXPOSE 3000

#expose the port the backend runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]