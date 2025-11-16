ARG NODE_VERSION=20
ARG VITE_BE_HOST=http://localhost:3000

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
ENV VITE_BE_HOST=${VITE_BE_HOST}
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
RUN npm install --global serve
COPY --from=builder /app/dist ./dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
