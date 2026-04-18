ARG VARIANT=4-24-bullseye
FROM mcr.microsoft.com/devcontainers/typescript-node:${VARIANT}

RUN ["/bin/bash", "-c", "npm install -g typescript"]
RUN ["/bin/bash", "-c", "npm install -g @angular/cli"]
RUN ["/bin/bash", "-c", "npm cache verify"]
