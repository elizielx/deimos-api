# Define variables
DOCKER_IMAGE_NAME := deimos-api
DOCKER_BUILD_ARGS := --build-arg user=aeviterna --build-arg uid=1000
KUBE_DEPLOYMENT := k8s/deployment.yml
KUBE_SERVICE := k8s/service.yml

# -- POSTGRESQL

# Access PostgreSQL database
psql:
	@read -p "Enter username: " username; \
    	psql --host=0.0.0.0 --d=deimos --username=$$username

# -- DOCKER COMPOSE

# Start Docker Compose
compose-up:
	docker-compose -f ./docker-compose.yaml --env-file ./.env up -d

# Stop Docker Compose
compose-down:
	docker-compose -f ./docker-compose.yaml down

# -- DOCKER

# Build Docker image
build:
	docker build $(DOCKER_BUILD_ARGS) -t $(DOCKER_IMAGE_NAME) .

# Run the Docker container
run:
	docker run -p 3000:3000 --name $(DOCKER_IMAGE_NAME) $(DOCKER_IMAGE_NAME)

# Stop and remove the Docker container
stop:
	docker stop $(DOCKER_IMAGE_NAME)
	docker rm $(DOCKER_IMAGE_NAME)

# Clean up Docker images and containers
clean:
	docker stop $(DOCKER_IMAGE_NAME) || true
	docker rm $(DOCKER_IMAGE_NAME) || true
	docker rmi $(DOCKER_IMAGE_NAME) || true

# -- KUBERNETES

# Load Docker image into a minkube Kubernetes cluster
k8s-load:
	eval $(minikube -p minikube docker-env)
	docker build $(DOCKER_BUILD_ARGS) -t $(DOCKER_IMAGE_NAME) .

# Apply Kubernetes deployment and service
k8s-apply:
	kubectl apply -f $(KUBE_DEPLOYMENT)
	kubectl apply -f $(KUBE_SERVICE)

# Get pod status
k8s-get-pods:
	kubectl get pods

# Delete Kubernetes deployment and service
k8s-delete:
	kubectl delete -f $(KUBE_DEPLOYMENT)
	kubectl delete -f $(KUBE_SERVICE)

# Default target when just running `make` without specifying a target
default: compose-up

.PHONY: psql compose-up compose-down build run stop clean default k8s-load k8s-apply k8s-get-pods k8s-delete