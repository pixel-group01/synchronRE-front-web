pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8586'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                         docker build --cache-from=${env.IMAGE_NAME}:latest -t ${env.IMAGE_NAME}:latest .
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
                            docker service create --name ${env.SERVICE_NAME} --replicas 2 --publish 8585:80 --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('localhost.com') --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                     echo "Arrêt et suppression de l'ancien conteneur..."

                               // Arrêter et supprimer l'ancien conteneur (s'il existe)
                               bat """
                                   docker stop ${env.CONTAINER_NAME} || echo "Aucun conteneur à arrêter."
                                   docker rm ${env.CONTAINER_NAME} || echo "Aucun conteneur à supprimer."
                               """

                               echo "Démarrage du nouveau conteneur..."

                               // Taguer l'image Docker
                               bat "docker tag ${env.IMAGE_NAME}:latest ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                               // Démarrer un nouveau conteneur avec la nouvelle image
                               echo "Démarrage du nouveau conteneur avec l'image : ${env.IMAGE_NAME}:${BUILD_NUMBER}"
                               bat """
                                   docker run -d --name ${env.CONTAINER_NAME} -p 8586:80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                               """
                               echo "Nouveau conteneur démarré et vérifié avec succès !"
                }
            }
        }
    }
}
