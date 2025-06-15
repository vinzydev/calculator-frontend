# Stage 1: Build the React application
FROM node:18-alpine as builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# --- IMPORTANT FOR REACT ENV VARS ---
# 1. Declare the build argument
ARG REACT_APP_BACKEND_URL
# 2. Set it as an environment variable for the build stage (npm run build)
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# --- Optional Debugging line (remove after confirmed working) ---
# RUN echo "REACT_APP_BACKEND_URL during build: $REACT_APP_BACKEND_URL"

# Build the React app (this is where process.env.REACT_APP_BACKEND_URL is evaluated)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]