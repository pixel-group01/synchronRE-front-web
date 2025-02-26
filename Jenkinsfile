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
                    bat "docker build -t %IMAGE_NAME% ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                         /script {
                                              // Vérifie si le conteneur existe
                                              bat """
                                              docker ps -a --format "{{.Names}}" | findstr /R /C:"^%CONTAINER_NAME%$" > nul
                                              if %ERRORLEVEL% == 0 (
                                                  echo "Container exists. Stopping and removing..."
                                                  docker stop %CONTAINER_NAME%
                                                  docker rm %CONTAINER_NAME%
                                              )
                                              echo "Deploying new container..."
                                              docker run -d --name %CONTAINER_NAME% -p %PORT_MAPPING% %IMAGE_NAME%:latest
                                              """
                        }
            }
        }
    }
}
