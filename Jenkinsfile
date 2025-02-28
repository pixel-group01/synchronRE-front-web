pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'  // Nom du service dans Docker Swarm
        HEALTHCHECK_URL = 'http://localhost:8586'  // URL pour vérifier la disponibilité du service
        DOCKER_STACK_FILE = 'docker-compose.yml'  // Nom du fichier Docker Compose pour Swarm
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

        stage('Deploy to Docker Swarm') {
            steps {
                script {
                    // Assurez-vous que le fichier docker-compose.yml est présent et configuré pour Swarm
                    bat "docker stack deploy -c ${env.DOCKER_STACK_FILE} ${env.SERVICE_NAME}"
                }
            }
        }
    }
}
