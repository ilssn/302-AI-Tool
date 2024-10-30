# Base image
FROM node:20.14-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Set mirror source to USTC mirror
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update
# Install compatibility libraries
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies according to package manager
RUN \
    if [ -f yarn.lock ]; then \
        corepack enable && \
        yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm config set registry https://registry.npmmirror.com && \
        npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && \
        pnpm config set registry https://registry.npmmirror.com && \
        pnpm i --frozen-lockfile; \
    else \
        echo "Lock file not found." && exit 1; \
    fi

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Execute build according to build mode
RUN corepack enable pnpm && pnpm run build;


# Production image, copy all files and run Next.js
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static files
COPY --from=builder /app/public ./public

# Set permissions for pre-rendered cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy .env file
COPY --chown=nextjs:nodejs .env .env

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT=3000

# Start command
CMD HOSTNAME="0.0.0.0" node server.js
