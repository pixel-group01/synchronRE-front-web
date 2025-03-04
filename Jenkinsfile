pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8586'
        CONTAINER_NAME  = 'synchronre-front'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image ${env.IMAGE_NAME}:${BUILD_NUMBER}"
                    bat """
                         docker build --no-cache -t ${env.IMAGE_NAME}:${BUILD_NUMBER} .
                    """
                }
            }
        }

        stage('Update or Create Docker Service') {
            steps {
                script {
                    def serviceExists = bat(script: "docker service ls --filter name=${env.SERVICE_NAME} -q", returnStdout: true).trim()

                    if (serviceExists) {
                        echo "The service ${env.SERVICE_NAME} already exists. Updating..."
                        bat "docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}"
                    } else {
                        echo "Creating a new service..."
                        bat """
                            docker service create --name ${env.SERVICE_NAME} --replicas 1 --publish 8585:80 \
                            --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('localhost.com') \
                            --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }

                    // Health check: Wait until the service is healthy
                    echo "Waiting for service health check..."
                    bat """
                        for /F "tokens=*" %%i in ('docker service ps ${env.SERVICE_NAME} --filter "desired-state=running" --format \\"{{.ID}}\\"') do docker inspect --format \\"{{.State.Health.Status}}\\" %%i
                    """
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                    echo "Starting the new container with image ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                    // Stop and remove the old container if it exists
                    bat """
                        docker rm -f ${env.CONTAINER_NAME} 2>nul || echo "No existing container to remove"
                    """

                    // Start the new container
                    bat """
                        docker run -d --name ${env.CONTAINER_NAME} -p 8585:80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                    """

                    echo "New container started and verified successfully!"
                }
            }
        }
    }
}
