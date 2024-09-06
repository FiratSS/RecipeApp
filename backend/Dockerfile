# Use Node.js 16 official image as base (to support optional chaining and nullish coalescing assignment)
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Copy secrets (if any)
COPY secrets ./secrets

# Copy the certificates
COPY ./certs /etc/ssl/certs

# Add script to print environment variables
RUN echo "printenv" >> printenv.sh
RUN chmod +x printenv.sh

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["./printenv.sh", "&&", "node", "server.js"]