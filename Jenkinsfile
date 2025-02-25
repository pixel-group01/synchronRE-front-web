pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronRE-front-web'
        CONTAINER_NAME = 'synchronRE-front-web'
        PORT_MAPPING = '8585:80'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'test', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Install Node.js and npm') {
            steps {
                script {
                    // Vérifie si node et npm sont installés
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances
                    sh 'npm install'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    sh 'npm run build --configuration=production'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT_MAPPING} -v angular_build:/usr/share/nginx/html ${IMAGE_NAME}"
                }
            }
        }

        stage('Capture Logs') {
            steps {
                script {
                    sh "docker logs -f ${CONTAINER_NAME}"
                }
            }
        }
    }
}
