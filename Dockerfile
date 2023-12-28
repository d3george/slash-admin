# Stage 1: build stage
FROM node:16-alpine as build-stage
# make the 'app' folder the current working directory
WORKDIR /app
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . ./
# config node options
ENV NODE_OPTIONS=--max_old_space_size=8192
# config pnpm, install dependencies and build
RUN npm install pnpm -g && \
    pnpm install && \
    pnpm build
RUN echo "build successful  🎉 🎉 🎉"


# Stage 2: production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
RUN echo "deploy to nginx successful  🎉 🎉 🎉"

