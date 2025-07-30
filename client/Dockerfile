FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev"]
