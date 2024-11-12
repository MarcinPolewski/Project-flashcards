# Step 1: Build the React app
FROM node:18 

WORKDIR /react-front-end
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
RUN npm run build

# # Step 2: Serve the React app with Nginx
# FROM nginx:alpine

# # Copy the build output from the build stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose the default port for HTTP
# EXPOSE 80