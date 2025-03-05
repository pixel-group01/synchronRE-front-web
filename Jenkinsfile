pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8586'
        CONTAINER_NAME  = 'synchronre-front'
        VERSION = '1.0.0'  // Exemple de version pour l'argument VERSION
    }

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
                        echo "Le service ${env.SERVICE_NAME} existe dejà. Mise à jour..."
                        bat "docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}"
                    } else {
                        echo "Creation d'un nouveau service..."
                        bat """
                            docker service create --name ${env.SERVICE_NAME} --replicas 1 --publish 8585:80 --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('localhost.com') --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                         // Vérifier si le conteneur existe
            def containerExists = bat(script: "docker ps -a -q -f name=${env.CONTAINER_NAME}", returnStdout: true).trim()

            if (containerExists) {
                echo "Un conteneur avec le nom ${env.CONTAINER_NAME} existe. Arrêt et suppression..."

                // Arrêter et supprimer le conteneur s'il existe
                bat """
                    docker stop ${env.CONTAINER_NAME}
                    docker rm ${env.CONTAINER_NAME}
                """
            } else {
                echo "Aucun conteneur existant trouvé. Déploiement direct."
            }

            // Démarrer un nouveau conteneur avec la nouvelle image
            echo "Démarrage du nouveau conteneur avec l'image : ${env.IMAGE_NAME}:${BUILD_NUMBER}"
            bat """
                docker run -d --name ${env.CONTAINER_NAME} -p 8585:80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
            """

            echo "Nouveau conteneur démarré avec succès !"
                }
            }
        }
    }
}
