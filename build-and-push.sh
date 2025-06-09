#!/bin/bash

set -e

# Exemple : ./deploy.sh dev
ENV=$1

if [[ -z "$ENV" ]]; then
  echo "Usage: $0 [dev|beta|prod]"
  exit 1
fi

# Lire la version depuis package.json (ex : 1.2.3)
VERSION=$(node -p "require('./package.json').version")

IMAGE_NAME="alexandredelesse/usclient"
TAG_VERSION="v${VERSION}-${ENV}"
TAG_LATEST="latest-${ENV}"

ENV_FILE=".env.${ENV}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Fichier $ENV_FILE introuvable."
  exit 1
fi

echo "🔐 Connexion au registre Docker..."
docker login

echo "🔧 Construction de l'image Docker..."
docker build \
  --platform linux/amd64 \
  --build-arg ENV_FILE="$ENV_FILE" \
  -t "$IMAGE_NAME:$TAG_VERSION" \
  -t "$IMAGE_NAME:$TAG_LATEST" .

echo "📤 Push des images : $TAG_VERSION et $TAG_LATEST..."
docker push "$IMAGE_NAME:$TAG_VERSION"
docker push "$IMAGE_NAME:$TAG_LATEST"

echo "✅ Déploiement terminé :"
echo "   - $IMAGE_NAME:$TAG_VERSION"
echo "   - $IMAGE_NAME:$TAG_LATEST"
