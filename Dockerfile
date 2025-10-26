FROM node:16-alpine as builder
WORKDIR '/app'
COPY . .
RUN npm install
RUN npm run build 

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your custom Nginx configuration file
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
