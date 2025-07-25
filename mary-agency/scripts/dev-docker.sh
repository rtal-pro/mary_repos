#!/bin/bash

# Mary Agency - Development Docker Script
# This script starts the development environment with hot reload

echo "🚀 Starting Mary Agency Development Environment with Hot Reload..."
echo ""

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if port 3000 is available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3000 is already in use. Would you like to stop existing processes? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "🛑 Stopping existing processes on port 3000..."
        lsof -ti:3000 | xargs kill -9 2>/dev/null || true
        sleep 2
    else
        echo "❌ Exiting. Please free port 3000 and try again."
        exit 1
    fi
fi

# Stop any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

# Build and start development environment
echo "🔨 Building and starting development environment..."
docker-compose -f docker-compose.dev.yml up --build --remove-orphans

echo ""
echo "✅ Development environment started!"
echo "🌐 Access your application at: http://localhost:3000"
echo "🔥 Hot reload is enabled - changes will be reflected automatically"
echo ""
echo "To stop the environment, press Ctrl+C or run:"
echo "   npm run docker:dev:down"