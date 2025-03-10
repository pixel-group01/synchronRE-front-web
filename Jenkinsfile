pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8586'
        CONTAINER_NAME  = 'synchronre-front'
        VERSION = '1.0.0'  // Exemple de version pour l'argument VERSION
    }
//
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                         docker build --cache-from=${env.IMAGE_NAME}:${BUILD_NUMBER} --build-arg VERSION=${env.VERSION} -t ${env.IMAGE_NAME}:${BUILD_NUMBER} .
                        """
                }
            }
        }

        stage('Create Docker Service') {
            steps {
                script {
                       def serviceExists = bat(script: "docker service ls --filter name=${env.SERVICE_NAME} -q", returnStdout: true).trim()

                                           if (serviceExists) {
                                               echo "Le service ${env.SERVICE_NAME} existe déjà. Mise à jour..."
                                               bat "docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}"
                                           } else {
                                               echo "Création d'un nouveau service..."
                                               bat """
                                                   docker service create --name ${env.SERVICE_NAME} --replicas 1 --publish 8585:80 --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('localhost.com') --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                                               """
                    }
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                script {
                       def serviceExists = bat(script: "docker service ls --filter name=${SERVICE_NAME} -q", returnStdout: true).trim()

                                           if (serviceExists) {
                                               echo "Le service ${SERVICE_NAME} existe déjà. Mise à jour..."
                                               bat "docker service update --force --image ${BUILD_TAG} ${SERVICE_NAME}"
                                           } else {
                                               echo "Création d'un nouveau service..."
                                               bat """
                                                   docker service create --name ${SERVICE_NAME} --replicas 1 --publish 8585:80 \
                                                   --label traefik.enable=true \
                                                   --label traefik.http.routers.synchronre.rule=Host('localhost.com') \
                                                   --label traefik.http.services.synchronre.loadbalancer.server.port=80 \
                                                   ${BUILD_TAG}
                                               """
                }
            }
        }
    }

     stage('Cleanup Old Images') {
                steps {
                    script {
                        echo "Suppression des anciennes images..."
                        bat """
                            for /F "tokens=1" %%i in ('docker images ${IMAGE_NAME} --format "{{.ID}}" --filter before=${BUILD_TAG}') do docker rmi -f %%i
                        """
                        echo "Anciennes images supprimées avec succès."
                    }
                }
            }
        }
}
