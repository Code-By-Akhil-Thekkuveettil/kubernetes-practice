# Stage 1: Build the Angular application
FROM ubuntu AS base
WORKDIR /app/Angular
COPY . /app
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  lsb-release \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Add Node.js 20 repository
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js 20
RUN apt-get update && apt-get install -y nodejs

# Verify installation
RUN node -v && npm -v

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=base /app/Angular/dist/angular/browser /usr/share/nginx/html
EXPOSE 80