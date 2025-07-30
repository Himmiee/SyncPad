# parent image
FROM node:22-alpine

# Set the working directory 
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3030

RUN npm run build
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "--require", "tsconfig-paths/register", "src/server.ts"]

