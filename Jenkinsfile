pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost'
        STACK_NAME = 'synchronre-stack'
        VERSION = '1.0.0'
        BUILD_TAG = "latest-${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = "registry.local" // Remplace par ton registre
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                        docker buildx build --cache-to=type=local,dest=/cache \
                        --cache-from=type=local,src=/cache \
                        --build-arg VERSION=${VERSION} \
                        -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG} .
                    """
                }
            }
        }

        stage('Push to Local Registry') {
            steps {
                script {
                    bat """
                        docker tag ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                        docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG}
                        docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                script {
                    bat """
                        docker stack deploy -c docker-compose.yml ${STACK_NAME}
                    """
                }
            }
        }

        stage('Cleanup Old Images') {
            steps {
                script {
                    bat """
                        for /F "tokens=*" %%i in ('docker images ${IMAGE_NAME} --format "{{.Repository}}:{{.Tag}}"') do (
                            for /F "tokens=2 delims=:" %%j in ("%%i") do (
                                if %%j LSS ${BUILD_NUMBER} (
                                    docker rmi -f %%i
                                )
                            )
                        )
                    """
                }
            }
        }
    }
}
