pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        OLD_CONTAINER_NAME = 'synchronre-front-web-1'
        NEW_CONTAINER_NAME = 'synchronre-front-web-2'
        PORT_OLD = '8585'
        PORT_NEW = '8586'
        NGINX_CONTAINER = 'nginx_container'
        HEALTHCHECK_URL = 'http://localhost:8586'  // Vérifier si le conteneur est prêt
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

        stage('Deploy New Container') {
            steps {
                script {
                    bat """
                    echo "Démarrage du nouveau conteneur sur ${PORT_NEW}..."
                    docker run -d --name ${env.NEW_CONTAINER_NAME} -p ${PORT_NEW}:80 ${env.IMAGE_NAME}:latest

                    echo "Attente de l'initialisation du conteneur..."
                    for /L %%i in (1,1,10) do (
                        curl --silent --fail ${env.HEALTHCHECK_URL} >nul && exit /b 0
                        echo "En attente de disponibilité..."
                        timeout /t 5 >nul
                    )

                    echo "Mise à jour de Nginx pour diriger le trafic vers ${PORT_NEW}..."
                    docker exec ${env.NGINX_CONTAINER} sh -c "sed -i 's/:${PORT_OLD}/:${PORT_NEW}/' /etc/nginx/nginx.conf && nginx -s reload"

                    echo "Validation du nouveau conteneur..."
                    curl --silent --fail ${env.HEALTHCHECK_URL} || (
                        echo "Le nouveau conteneur ne répond pas ! Rollback..."
                        docker stop ${env.NEW_CONTAINER_NAME}
                        docker rm ${env.NEW_CONTAINER_NAME}
                        exit /b 1
                    )

                    echo "Arrêt et suppression de l'ancien conteneur..."
                    docker stop ${env.OLD_CONTAINER_NAME}
                    docker rm ${env.OLD_CONTAINER_NAME}

                    echo "Basculement des noms..."
                    docker rename ${env.NEW_CONTAINER_NAME} ${env.OLD_CONTAINER_NAME}

                    echo "Déploiement terminé avec succès !"
                    """
                }
            }
        }
    }
}
