# Stage 1: Build the React application
FROM node:20 AS builder

WORKDIR /app

# Only copy package.json to completely ignore any corrupted package-lock.json
COPY package.json ./

# Force install bypassing any peer dependency errors
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
