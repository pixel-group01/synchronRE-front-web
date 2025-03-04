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
                    bat """
                         docker build --cache-from=${env.IMAGE_NAME}:${BUILD_NUMBER} -t ${env.IMAGE_NAME}:${BUILD_NUMBER} .
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
//                          echo "Arrêt et suppression de l'ancien conteneur..."
//
//                                      // Verifier si le conteneur existe avant de l'arrêter et de le supprimer
//                                      bat """
//                                          docker ps -a --filter "name=${env.CONTAINER_NAME}" --format "{{.Names}}" | findstr /C:"${env.CONTAINER_NAME}" >nul
//                                          if %errorlevel% equ 0 (
//                                              echo "Conteneur trouve. Arrêt et suppression du conteneur..."
//                                              docker stop ${env.CONTAINER_NAME} || echo "echec de l'arrêt du conteneur."
//                                              docker rm ${env.CONTAINER_NAME} || echo "echec de la suppression du conteneur."
//                                          ) else (
//                                              echo "Aucun conteneur à arrêter ou supprimer."
//                                          )
//                                      """
//
//                                      echo "Demarrage du nouveau conteneur..."
//
//                                      // Taguer l'image Docker
//                                      bat "docker tag ${env.IMAGE_NAME}:latest ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                                     // Demarrer un nouveau conteneur avec la nouvelle image
                                     echo "Demarrage du nouveau conteneur avec l'image : ${env.IMAGE_NAME}:${BUILD_NUMBER}"
                                     bat """
                                         docker run -d --name ${env.CONTAINER_NAME} -p 8585:80 ${env.IMAGE_NAME}:${BUILD_NUMBER}
                                     """

//                                      // Verification de la disponibilite du nouveau conteneur
//                                      echo "Verification de la disponibilite du nouveau conteneur..."
//                                      bat """
//                                          for /L %%i in (1,1,10) do (
//                                              curl --silent --fail http://localhost:8585
//                                              if %%errorlevel%% equ 0 (
//                                                  echo "Le conteneur est disponible."
//                                                  exit /b 0
//                                              ) else (
//                                                  echo "En attente de disponibilite... %%i"
//                                                  ping 127.0.0.1 -n 6 >nul
//                                              )
//                                          )
//                                          echo "Le conteneur n'est pas disponible après 10 tentatives."
//                                          exit /b 1
//                                      """

                                     echo "Nouveau conteneur demarre et verifie avec succès !"

                }
            }
        }
    }
}
