#!/bin/sh

cat > $HOME/.npmrc <<EOL
@codelitt:registry=https://pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/registry/
always-auth=true

//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/registry/:username=\${AZURE_REGISTRY_USERNAME}
//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/registry/:_password=\${AZURE_REGISTRY_PASSWORD}
//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/:username=\${AZURE_REGISTRY_USERNAME}
//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/:_password=\${AZURE_REGISTRY_PASSWORD}
//pkgs.dev.azure.com/codelittinc/_packaging/codelitt-npm/npm/:email=npm requires email to be set but doesn't use the value
EOL
