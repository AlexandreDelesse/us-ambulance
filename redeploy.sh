#!/bin/bash

set -e

# Usage : ./redeploy.sh [dev|beta|prod] [version|latest]
ENV=$1
VERSION=$2

if [ -z "$ENV" ] || [ -z "$VERSION" ]; then
  echo "Usage: $0 [dev|beta|prod] [version|latest]"
  exit 1
fi

# Définir les tags selon la version
if [ "$VERSION" = "latest" ]; then
  IMAGE_TAG="latest-${ENV}"
else
  IMAGE_TAG="v${VERSION}-${ENV}"
fi

IMAGE_NAME="alexandredelesse/usclient"
CONTAINER_NAME="us-client-${ENV}"

# Définir le port en fonction de l'environnement
case "$ENV" in
  dev)
    PORT_MAPPING="3010:80"
    ;;
  beta)
    PORT_MAPPING="3011:80"
    ;;
  prod)
    PORT_MAPPING="3012:80"
    ;;
  *)
    echo "❌ Environnement inconnu : $ENV"
    exit 1
    ;;
esac

echo "📦 Déploiement de $CONTAINER_NAME avec l'image $IMAGE_NAME:$IMAGE_TAG"
docker login

echo "📥 Récupération de l'image..."
docker pull "$IMAGE_NAME:$IMAGE_TAG"

# Arrêt et suppression de l'ancien conteneur s'il existe
if docker ps -a | grep -q "$CONTAINER_NAME"; then
  echo "🛑 Arrêt du conteneur $CONTAINER_NAME"
  docker stop "$CONTAINER_NAME" || true

  echo "🧹 Suppression du conteneur $CONTAINER_NAME"
  docker rm "$CONTAINER_NAME" || true
fi

# Lancer le nouveau conteneur
echo "🚀 Démarrage du conteneur $CONTAINER_NAME sur le port $PORT_MAPPING"
docker run -d \
  -p "$PORT_MAPPING" \
  --name "$CONTAINER_NAME" \
  "$IMAGE_NAME:$IMAGE_TAG"

# Vérification
echo "🔍 État du conteneur :"
docker ps --filter "name=$CONTAINER_NAME"

echo "✅ Déploiement terminé : $CONTAINER_NAME actif avec l’image $IMAGE_TAG"
