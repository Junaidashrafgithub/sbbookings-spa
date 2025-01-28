# Use Node.js Alpine image
FROM node:19.6-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install including dev dependencies
RUN npm install --legacy-peer-deps

# Copy the current directory
COPY . .

# Expose the port of the app
EXPOSE 3000

# Run the dev commmand
CMD ["npm", "start"]