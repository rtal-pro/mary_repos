# Docker Development Guide - Mary Agency

## Overview

This project supports both development and production Docker environments with hot reload capabilities for development.

## Quick Start

### Development with Hot Reload

```bash
# Start development environment with hot reload
npm run docker:dev

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

### Production

```bash
# Start production environment
npm run docker:prod

# Or manually
docker-compose up --build
```

## Development Environment Features

- ✅ **Hot Reload**: File changes automatically trigger rebuilds
- ✅ **Volume Mounting**: Source code is mounted for instant updates
- ✅ **Fast Startup**: No need to rebuild container for code changes
- ✅ **Debug Support**: Full debugging capabilities
- ✅ **File Watching**: Optimized for Docker file system watching

## File Structure

```
.
├── Dockerfile              # Production optimized build
├── Dockerfile.dev          # Development with hot reload
├── docker-compose.yml      # Production configuration
├── docker-compose.dev.yml  # Development configuration
└── .dockerignore           # Optimized Docker ignore rules
```

## Configuration Details

### Development Configuration (docker-compose.dev.yml)

- **Port**: 3000 (mapped to host)
- **Volume Mounting**: Source code mounted for hot reload
- **Environment**: Development mode with file watching
- **Polling**: Enabled for Docker compatibility

### Production Configuration (docker-compose.yml)

- **Multi-stage Build**: Optimized for size and security
- **Standalone Output**: Next.js standalone mode
- **User Security**: Non-root user execution
- **Optimized Layers**: Efficient caching

## Environment Variables

### Development
- `NODE_ENV=development`
- `NEXT_TELEMETRY_DISABLED=1`
- `WATCHPACK_POLLING=true`
- `CHOKIDAR_USEPOLLING=true`

### Production
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run docker:dev` | Start development with hot reload |
| `npm run docker:dev:down` | Stop development environment |
| `npm run docker:prod` | Start production environment |
| `npm run docker:prod:down` | Stop production environment |
| `npm run docker:clean` | Clean Docker system |

## Hot Reload Technical Details

### Webpack Configuration
```typescript
webpack: (config, { dev, isServer }) => {
  if (dev && !isServer) {
    config.watchOptions = {
      poll: 1000,           // Check for changes every second
      aggregateTimeout: 300 // Wait 300ms after change
    }
  }
  return config
}
```

### Docker Volume Strategy
```yaml
volumes:
  - .:/app                 # Mount source code
  - /app/node_modules      # Exclude node_modules
  - /app/.next             # Exclude .next build cache
```

## Troubleshooting

### Hot Reload Not Working

1. **Check File Permissions**
   ```bash
   # Ensure files are readable
   chmod -R 755 src/
   ```

2. **Verify Polling is Enabled**
   ```bash
   # Check environment variables in container
   docker exec -it mary-agency-app-dev-1 env | grep WATCH
   ```

3. **Restart Container**
   ```bash
   npm run docker:dev:down
   npm run docker:dev
   ```

### Performance Issues

1. **Reduce Polling Frequency**
   ```typescript
   // In next.config.ts
   config.watchOptions = {
     poll: 2000, // Increase to 2 seconds
     aggregateTimeout: 500
   }
   ```

2. **Use .dockerignore**
   - Ensure large directories are excluded
   - Check that `node_modules` and `.next` are ignored

### Port Conflicts

1. **Change Port Mapping**
   ```yaml
   # In docker-compose.dev.yml
   ports:
     - "3001:3000"  # Use different host port
   ```

## Best Practices

### Development Workflow

1. **Start Development**
   ```bash
   npm run docker:dev
   ```

2. **Edit Files**
   - Changes in `src/` trigger hot reload
   - Changes in `package.json` require container rebuild

3. **View Logs**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

4. **Stop Development**
   ```bash
   npm run docker:dev:down
   ```

### Production Deployment

1. **Build and Test Locally**
   ```bash
   npm run docker:prod
   ```

2. **Verify Build**
   ```bash
   docker-compose exec app ls -la .next/
   ```

3. **Check Performance**
   - Monitor memory usage
   - Test load times
   - Verify asset optimization

## Docker Optimization

### Layer Caching
- Dependencies installed in separate layer
- Source code copied after dependencies
- `.dockerignore` excludes unnecessary files

### Security
- Non-root user execution
- Minimal base image (Alpine)
- No sensitive data in layers

### Size Optimization
- Multi-stage builds
- Standalone Next.js output
- Optimized package manager usage

## Integration with Other Services

### Supabase (Optional)
```yaml
# Uncomment in docker-compose.dev.yml
supabase-dev:
  image: supabase/postgres:15.1.0.117
  ports:
    - "5432:5432"
  environment:
    POSTGRES_PASSWORD: your-password
    POSTGRES_DB: postgres
```

### Redis (Optional)
```yaml
# Add to docker-compose.dev.yml
redis-dev:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

## Monitoring

### Health Checks
```dockerfile
# Add to Dockerfile.dev
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

### Logs
```bash
# Follow development logs
docker-compose -f docker-compose.dev.yml logs -f app-dev

# View specific service logs
docker logs mary-agency-app-dev-1
```

## Development Tips

1. **Use VS Code Docker Extension** for container management
2. **Mount .vscode folder** for consistent IDE settings
3. **Use Docker Desktop** for easy container monitoring
4. **Regular cleanup** with `npm run docker:clean`
5. **Test both environments** before deployment

---

For more information, check the main project README or CLAUDE.md configuration file.