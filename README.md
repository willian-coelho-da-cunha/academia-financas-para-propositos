# Finanças para Propósitos

Keywords: "academia".

A containerized development environment for an Angular/TypeScript frontend application focused on finance purposes.

## Overview

This project provides a Docker-based development setup for building and running a frontend application using Angular and TypeScript. The environment is orchestrated using Docker Compose and runs within a consistent, isolated container.

## Tech Stack

- **Runtime:** Node.js (v4-24 on Debian Bullseye)
- **Language:** TypeScript
- **Framework:** Angular CLI
- **Package Manager:** npm
- **Containerization:** Docker & Docker Compose

## Project Structure

```
.
├── Dockerfile                    # Development container definition.
├── docker-compose.yml            # Docker Compose service configuration.
└── README.md                     # This file.
```

## Requirements

- Docker
- Docker Compose

## Getting Started

### Build and Start the Development Container

```bash
docker-compose up -d
```

This command will:
1. Build the Docker image from the Dockerfile.
2. Start the `front-end-app` service in the background.
3. Mount the workspace directory for development.

### Access the Container

```bash
docker-compose exec front-end-app /bin/bash
```

### Stop the Container

```bash
docker-compose down
```

## Development

The development container includes:
- **Node.js** with npm pre-installed.
- **TypeScript Compiler (tsc)** globally available.
- **Angular CLI** globally available for Angular development.

### Available Commands Inside Container

Once inside the container, you can run common npm and Angular commands:

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test
```

## Container Configuration

- **Service Name:** front-end-app
- **User:** node
- **Working Directory:** /workspace
- **Memory Limit:** 3GB (reservation: 512MB)
- **CPU Limit:** 3 cores (reservation: 0.5 cores)
- **Volume:** Current directory mapped to `/workspace` (cached mode)
- **Restart Policy:** On failure with 5s delay (max 1 attempt)

## Volume Mounting

The project directory is mounted as a cached volume to `/workspace` inside the container, enabling live code editing and hot-reload development workflows.

## Debugging

The container is designed to stay alive, allowing you to:
- Run development servers
- Execute build commands
- Debug applications in real-time
- Install additional packages as needed

## License

Not specified

## Contributing

Please refer to the project guidelines for contribution procedures.
