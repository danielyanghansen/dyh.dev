# Use an official Node.js image as parent image
FROM node:14

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json if applicable
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite project
RUN npm run bundle

# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "serve"]
