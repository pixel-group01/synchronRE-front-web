pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        CONTAINER_NAME = 'synchronre-front-web'
        PORT_MAPPING = '8585:80'
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
                    bat "docker build -t ${env.IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    bat """
                    @echo off
                    for /f %%i in ('docker ps -a --format "{{.Names}}"') do (
                        if "%%i"=="${env.CONTAINER_NAME}" (
                            echo "Container exists. Stopping and removing..."
                            docker stop ${env.CONTAINER_NAME}
                            docker rm ${env.CONTAINER_NAME}
                        )
                    )
                    echo "Deploying new container..."
                    docker run -d --name ${env.CONTAINER_NAME} -p ${env.PORT_MAPPING} ${env.IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
}
