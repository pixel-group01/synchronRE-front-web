pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        OLD_CONTAINER_NAME = 'synchronre-front-web-1'
        NEW_CONTAINER_NAME = 'synchronre-front-web-2'
        PORT_OLD = '8585'
        PORT_NEW = '8586'
        NGINX_CONTAINER = 'nginx_container'
        HEALTHCHECK_URL = 'http://localhost:8586'
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
                    echo "Démarrage du nouveau conteneur..."
                    docker run -d --name ${env.NEW_CONTAINER_NAME} -p ${PORT_NEW}:80 ${env.IMAGE_NAME}:latest

                    echo "Vérification du statut du conteneur..."
                    for /L %%i in (1,1,10) do (
                        docker inspect -f "{{.State.Running}}" ${env.NEW_CONTAINER_NAME} 2>nul | find "true" >nul && exit /b 0
                        echo "En attente de disponibilité..."
                        timeout /t 5 >nul
                    )

                    echo "Vérification de Nginx..."
                    docker ps -q -f name=${env.NGINX_CONTAINER} || (
                        echo "Erreur: Le conteneur Nginx n'existe pas."
                        exit /b 1
                    )

                    echo "Mise à jour de Nginx..."
                    docker exec ${env.NGINX_CONTAINER} sh -c "sed -i 's/:${PORT_OLD}/:${PORT_NEW}/' /etc/nginx/nginx.conf && nginx -s reload"

                    echo "Arrêt et suppression de l'ancien conteneur..."
                    docker stop ${env.OLD_CONTAINER_NAME}
                    docker rm ${env.OLD_CONTAINER_NAME}

                    echo "Renommage des conteneurs..."
                    docker rename ${env.NEW_CONTAINER_NAME} ${env.OLD_CONTAINER_NAME}

                    echo "Déploiement terminé avec succès !"
                    """
                }
            }
        }
    }
}
