# syntax = hub.mcisaas.com/mcipub/docker/dockerfile:1.6.0
# ==========================================
# Stage 1: Builder - Build the application
# ==========================================
ARG NODE_VERSION=22
ARG FROM_IMAGE=hub.mcisaas.com/mcipub/node:${NODE_VERSION}
FROM $FROM_IMAGE AS builder
WORKDIR /application

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN <<-EOF
    npm config set registry https://registry.npmmirror.com/
    npm ci
EOF

# Copy source code and configuration
COPY . .

# Build the application with Vite
RUN npm run build

# ==========================================
# Stage 2: Runtime - Run with Wrangler
# ==========================================
# syntax = hub.mcisaas.com/mcipub/docker/dockerfile:1.6.0
FROM $FROM_IMAGE

WORKDIR /application

ARG NODE_ENV=production
ARG APPNAME
ENV APPNAME=${APPNAME}
ARG PORT=8080
ENV PORT=${PORT:-8080}
ARG HOST=0.0.0.0
ENV HOST=${HOST:-0.0.0.0}

# Copy built application from builder stage
COPY --from=builder /application/dist ./dist

# Copy necessary configuration files
COPY wrangler.jsonc ./
COPY migrations ./migrations

ENV TZ=Asia/Shanghai

RUN <<-EOF
    set -eux
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
    echo $TZ > /etc/timezone
    npm config set registry https://registry.npmmirror.com/
    npm install -g wrangler
    npm install -g pnpm
    mkdir -p .wrangler/state
    chown -R node:node /application
EOF

#RUN chown -R node:node /application
ENV PATH=/application/node_modules/.bin:$PATH
USER node

ENTRYPOINT ["sh", "-c", "yes | wrangler d1 migrations apply dgt-db --local && wrangler pages dev dist --ip ${HOST} --port ${PORT} --d1=dgt-db --local"]
EXPOSE ${PORT}
