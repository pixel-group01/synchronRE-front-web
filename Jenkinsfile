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
                           // Arrête et supprime le conteneur s'il existe déjà
                                              sh "docker stop ${CONTAINER_NAME} || true"
                                              sh "docker rm ${CONTAINER_NAME} || true"

                                              // Lance le conteneur Docker avec les variables définies
                                              sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT_MAPPING} ${IMAGE_NAME}:latest"
                        }
            }
        }

//         stage('Capture Logs') {
//             steps {
//                 bat "docker logs -f %CONTAINER_NAME%"
//             }
//         }
    }
}
