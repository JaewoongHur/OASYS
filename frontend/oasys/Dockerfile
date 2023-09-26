FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY .env.production ./.env
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]