DOCKERHUB_USER ?= tuilatung2001
APP_NAME       ?= todo-list-fe
BUILD_NUMBER   ?= 0.0.1
BE_HOST        ?= http://localhost:3000

IMAGE          ?= $(DOCKERHUB_USER)/$(APP_NAME):$(BUILD_NUMBER)
LATEST_IMAGE   ?= $(DOCKERHUB_USER)/$(APP_NAME):latest

CHART_PATH     ?= helm/$(APP_NAME)

.PHONY: build push

## Build docker image
build:
	@echo "Building: $(IMAGE)"
	docker build -t $(IMAGE) \
		--build-arg VITE_BE_HOST=$(BE_HOST) \
		.
	docker tag $(IMAGE) $(LATEST_IMAGE)

## Push Docker Hub
push:
	@echo "Pushing to Docker Hub..."
	docker push $(IMAGE)
	docker push $(LATEST_IMAGE)
