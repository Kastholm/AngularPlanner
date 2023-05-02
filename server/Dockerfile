# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json /app/

# Install the application dependencies inside the container
RUN npm install

# Copy the rest of the application into the container
COPY . /app/

# Make the container listen on port 4000 at runtime
EXPOSE 4000

# Define the command that should be run when the container starts
CMD [ "node", "main.js" ]