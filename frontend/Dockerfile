# Build Stage
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/dist/ecommerce /usr/share/nginx/html
EXPOSE 80
