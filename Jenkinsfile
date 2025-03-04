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
                   echo "Démarrage du nouveau conteneur..."

                               bat "docker tag ${env.IMAGE_NAME}:latest ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                               // Mettre à jour le service avec la nouvelle image
                               echo "Mise à jour du service Docker avec l'image : ${env.IMAGE_NAME}:${BUILD_NUMBER}"
                               bat """
                                   docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}
                               """

                               // Vérification de la disponibilité du nouveau conteneur
                               echo "Vérification de la disponibilité du nouveau conteneur..."
                               bat """
                                   for /L %%i in (1,1,10) do (
                                      curl --silent --fail http://localhost:8586
                                              if %%errorlevel%% equ 0 (
                                                  echo "Le conteneur est disponible."
                                                  exit /b 0
                                              ) else (
                                                  echo "En attente de disponibilité... %%i"
                                                  ping 127.0.0.1 -n 6 >nul
                                              )
                                   )
                                   echo "Le conteneur n'est pas disponible après 10 tentatives."
                                   exit /b 1
                               """

                               echo "Rolling update terminé avec succès !"
                }
            }
        }
    }
}
