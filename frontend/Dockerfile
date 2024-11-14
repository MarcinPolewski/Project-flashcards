# =========== BUILD ==============
FROM node:18 as build-stage

WORKDIR /react-front-end
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# # # =========== CREATE A SERVER =============
FROM nginx:1.27.2 as server-stage

#copy server configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

#copy built files to server files
COPY --from=build-stage /react-front-end/build/ /usr/share/nginx/html

# for security reasons, changing ownership of files, to run as normal user
WORKDIR /react-server
RUN chown -R nginx:nginx /react-server && chmod -R 755 /react-server && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# this file will store Nginx's PID 
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]