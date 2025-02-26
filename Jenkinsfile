pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        OLD_CONTAINER_NAME = 'synchronre-front-web-1'
        NEW_CONTAINER_NAME = 'synchronre-front-web-2'
        PORT_MAPPING_OLD = '8585:80'
        PORT_MAPPING_NEW = '8586:80'
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'test', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
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
                    @echo off
                    echo "Starting new container..."
                    docker run -d --name ${env.NEW_CONTAINER_NAME} -p ${env.PORT_MAPPING_NEW} ${env.IMAGE_NAME}:latest

                    echo "Waiting for new container to be ready..."
                    timeout /t 5

                    echo "Updating Nginx to route traffic to new container..."
                    docker exec nginx_container nginx -s reload

                    echo "Stopping and removing old container..."
                    docker stop ${env.OLD_CONTAINER_NAME}
                    docker rm ${env.OLD_CONTAINER_NAME}

                    echo "Switching container names for next deployment..."
                    docker rename ${env.NEW_CONTAINER_NAME} ${env.OLD_CONTAINER_NAME}
                    """
                }
            }
        }
    }
}
