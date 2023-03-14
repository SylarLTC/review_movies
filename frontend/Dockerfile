# Pull the Node image from Docker Hub
FROM alpine:3.17

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the API server
CMD ["npm", "start"]