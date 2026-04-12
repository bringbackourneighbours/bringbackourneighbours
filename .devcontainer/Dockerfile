FROM ubuntu:24.04

# TODO: use version from node-version
ARG NODE_VERSION=22

# install puppeteer deps
# see: https://pptr.dev/troubleshooting#running-puppeteer-in-docker
RUN apt-get update \
    && apt-get install -y curl wget gnupg openssh-client\
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV ASTRO_TELEMETRY_DISABLED=1

# set cmd to bash
CMD ["/bin/bash"]
