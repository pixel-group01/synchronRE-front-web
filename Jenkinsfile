pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        OLD_CONTAINER_NAME = 'synchronre-front-web-1'
        NEW_CONTAINER_NAME = 'synchronre-front-web-2'
        PORT_OLD = '8585'
        PORT_NEW = '8586'
        NGINX_CONTAINER = 'nginx_container'
        HEALTHCHECK_URL = "http://localhost:${PORT_NEW}"
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
                    echo "➡️ Démarrage du nouveau conteneur..."
                    docker run -d --name ${env.NEW_CONTAINER_NAME} -p ${PORT_NEW}:80 ${env.IMAGE_NAME}:latest

                    echo "🔄 Vérification du statut du conteneur..."
                    for /L %%i in (1,1,10) do (
                        docker inspect -f "{{.State.Running}}" ${env.NEW_CONTAINER_NAME} 2>nul | find "true" >nul && exit /b 0
                        echo "En attente de disponibilité..."
                        timeout /t 5 >nul
                    )

                    echo "✅ Conteneur lancé, vérification de l'application..."
                    for /L %%i in (1,1,10) do (
                        curl -s --head --request GET ${env.HEALTHCHECK_URL} | find "200" >nul && exit /b 0
                        echo "⏳ L'application n'est pas encore prête..."
                        timeout /t 5 >nul
                    )

                    echo "🌍 Mise à jour de Nginx..."
                    docker exec ${env.NGINX_CONTAINER} sh -c "sed -i 's/:${PORT_OLD}/:${PORT_NEW}/' /etc/nginx/nginx.conf && nginx -s reload"

                    echo "🚦 Vérification de la mise à jour de Nginx..."
                    timeout /t 2 >nul
                    docker exec ${env.NGINX_CONTAINER} sh -c "nginx -t" || exit /b 1

                    echo "🛑 Arrêt et suppression de l'ancien conteneur..."
                    docker stop ${env.OLD_CONTAINER_NAME} || echo "Ancien conteneur déjà arrêté"
                    docker rm -f ${env.OLD_CONTAINER_NAME} || echo "Ancien conteneur déjà supprimé"

                    echo "✅ Déploiement terminé avec succès !"
                    """
                }
            }
        }
    }
}
