pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8580'
        CONTAINER_NAME  = 'synchronre-front'
        STACK_NAME = 'synchronre-stack'  // Définir la variable ici
        VERSION = '1.0.0'  // Exemple de version pour l'argument VERSION
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image avec un tag basé sur BUILD_NUMBER
                    bat """
                         docker build --cache-from=${env.IMAGE_NAME}:${BUILD_NUMBER} --build-arg VERSION=${env.VERSION} -t ${env.IMAGE_NAME}:${BUILD_NUMBER} .
                    """
                }
            }
        }

        stage('Push to Local Registry') {
            steps {
                script {
                    // Taguer l'image avec 'latest' pour Docker Swarm
                    bat """
                        docker tag ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.IMAGE_NAME}:latest
                        docker image ls
                    """
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                script {
                    echo "Déploiement de la stack Docker Swarm..."
                    bat """
                        docker stack deploy -c docker-compose.yml --with-registry-auth ${env.STACK_NAME}
                    """
                }
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                script {
                    echo "Suppression des anciens conteneurs éteints..."
                    bat """
                        FOR /F "tokens=*" %%i IN ('docker ps -a --filter "name=${env.STACK_NAME}" --format "{{.ID}}"') DO (
                            docker rm -f %%i
                        )
                    """
                    echo "Anciens conteneurs supprimés avec succès."
                }
            }
        }

        stage('Cleanup Old Images') {
            steps {
                script {
                    echo "Suppression des anciennes images..."
                    bat """
                        FOR /F "tokens=*" %%i IN ('docker images ${env.IMAGE_NAME} --format "{{.Repository}}:{{.Tag}}" ^| findstr /v "${BUILD_NUMBER}"') DO (
                            docker rmi -f %%i
                        )
                    """
                    echo "Anciennes images supprimées avec succès."
                }
            }
        }
    }
}
