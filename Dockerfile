FROM node:20-alpine as build

WORKDIR /app
COPY . .
# Pass REACT_APP_BACKEND_URL as a build-arg and expose it during the build process
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm install && npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
