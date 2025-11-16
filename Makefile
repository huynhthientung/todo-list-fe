DOCKERHUB_USER ?= tuilatung2001
APP_NAME       ?= todo-list-fe
BE_HOST        ?= http://localhost:3000

IMAGE_VERSION  ?= 0.0.3
PROD_VERSION   ?= 0.1.0

IMAGE          ?= $(DOCKERHUB_USER)/$(APP_NAME):$(IMAGE_VERSION)

PROD_IMAGE     ?= $(DOCKERHUB_USER)/$(APP_NAME):$(PROD_VERSION)
PROD_LATEST    ?= $(DOCKERHUB_USER)/$(APP_NAME):latest

CHART_PATH     ?= helm/$(APP_NAME)

.PHONY: build push build-prod push-prod

## Build docker image (dev)
build:
	@echo "Building DEV IMAGE: $(IMAGE)"
	docker build -t $(IMAGE) \
		--build-arg VITE_BE_HOST=$(BE_HOST) \
		.
	docker tag $(IMAGE)

## Push dev images
push:
	@echo "Pushing DEV images..."
	docker push $(IMAGE)

## Build production image
build-prod:
	@echo "Building PROD IMAGE: $(PROD_IMAGE)"
	docker build -t $(PROD_IMAGE) \
		--build-arg VITE_BE_HOST=$(BE_HOST) \
		--build-arg NODE_ENV=production \
		.
	docker tag $(PROD_IMAGE) $(PROD_LATEST)

## Push production images
push-prod:
	@echo "Pushing PROD images..."
	docker push $(PROD_IMAGE)
	docker push $(PROD_LATEST)
