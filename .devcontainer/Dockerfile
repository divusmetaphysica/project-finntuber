FROM node:20-slim

RUN apt-get update \
 && apt-get install -y git curl

RUN npm i -g azure-functions-core-tools@4 --unsafe-perm true \
 && npm install -g @azure/static-web-apps-cli

ENTRYPOINT ["/bin/bash"]