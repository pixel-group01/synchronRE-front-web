pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronRE-front-web'
        CONTAINER_NAME = 'synchronRE-front-web'
        PORT_MAPPING = '8585:80'
    }

	tools {
        nodejs "NodeJS" // Nom de l'installation Node.js dans Jenkins (à configurer dans Jenkins Global Tool Configuration)
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
                script {
                    bat 'npm run build --configuration=production'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    bat "docker stop ${CONTAINER_NAME} || true"
                    bat "docker rm ${CONTAINER_NAME} || true"
                    bat "docker run -d --name ${CONTAINER_NAME} -p ${PORT_MAPPING} -v angular_build:/usr/share/nginx/html ${IMAGE_NAME}"
                }
            }
        }

        stage('Capture Logs') {
            steps {
                script {
                    bat "docker logs -f ${CONTAINER_NAME}"
                }
            }
        }
    }
}
