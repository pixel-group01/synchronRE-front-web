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

                     echo "Démarrage du nouveau conteneur..."

                                 bat "docker tag ${env.IMAGE_NAME}:latest ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                                 // Mettre à jour le service avec la nouvelle image
                                 echo "Mise à jour du service Docker avec l'image : ${env.IMAGE_NAME}:${BUILD_NUMBER}"
                                 bat """
                                     docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}
                                 """

                                 // Vérification de la disponibilité du nouveau conteneur
                                 echo "Vérification de la disponibilité du nouveau conteneur..."
                                 powershell """
                                     \$attempts = 10
                                     \$delay = 5
                                     \$url = "${env.HEALTHCHECK_URL}"
                                     for (\$i = 1; \$i -le \$attempts; \$i++) {
                                         try {
                                             \$response = Invoke-WebRequest -Uri \$url -UseBasicParsing -ErrorAction Stop
                                             if (\$response.StatusCode -eq 200) {
                                                 Write-Host "Le conteneur est disponible."
                                                 exit 0
                                             }
                                         } catch {
                                             Write-Host "En attente de disponibilité... \$i"
                                             Start-Sleep -Seconds \$delay
                                         }
                                     }
                                     Write-Host "Le conteneur n'est pas disponible après \$attempts tentatives."
                                     exit 1
                                 """

                                 echo "Rolling update terminé avec succès !"

                }
            }
        }
    }
}
