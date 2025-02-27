pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'  // Nom du service dans Docker Swarm
        HEALTHCHECK_URL = 'http://localhost:8586'  // URL pour vérifier la disponibilité du service
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'test-docker', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                bat 'npm run build --configuration=production'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Create Docker Service') {
            steps {
                script {
                    // Créer le service Docker dans Swarm si ce n'est pas déjà fait
                    bat """
                        docker service ls | findstr synchronre-front || docker service create --name synchronre-front --replicas 2 --publish 8585:80 --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('yourdomain.com') --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                    script {
                                echo "Démarrage du nouveau conteneur..."
                                // Pousser l'image vers Docker registry si nécessaire
                                bat "docker tag ${env.IMAGE_NAME}:latest ${env.IMAGE_NAME}:${BUILD_NUMBER}"

                                // Mettre à jour le service avec la nouvelle image
                                bat """
                                    docker service update --image ${env.IMAGE_NAME}:${BUILD_NUMBER} synchronre-front
                                """

                                // Vérifier la disponibilité du nouveau conteneur
                                echo "Vérification de la disponibilité du nouveau conteneur..."
                                bat """
                                    for /L %%i in (1,1,10) do (
                                        curl --silent --fail ${env.HEALTHCHECK_URL} && exit /b 0 || (
                                            echo "En attente de disponibilité... %%i"
                                            timeout /t 5 >nul
                                        )
                                    )
                                """

                                echo "Rolling update terminé avec succès !"
                }
            }
        }
    }
}
