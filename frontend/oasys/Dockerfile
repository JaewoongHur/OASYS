FROM node:lts
COPY build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]