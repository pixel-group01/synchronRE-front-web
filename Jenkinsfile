pipeline {
    agent any

    environment {
        // Nom de l'image Docker
        IMAGE_NAME = 'synchronre-front-web'
        // Nom de ton serveur de production
        SERVER_IP = '137.74.199.79'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code source
                git branch: 'test', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Push Docker Image to Registry') {
            steps {
                script {
                    // Si tu veux pousser l'image dans un registre Docker (par exemple DockerHub ou GitHub)
                    // docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                    // sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    // Stopper le conteneur en cours (si existe)
                    sh "docker stop $IMAGE_NAME || true"
                    sh "docker rm $IMAGE_NAME || true"

                    // Lancer le nouveau conteneur avec l'image Docker
                    sh "docker run -d -p 80:80 --name $IMAGE_NAME $IMAGE_NAME"
                }
            }
        }
    }

    post {
        success {
            echo 'Le déploiement a réussi !'
        }
        failure {
            echo 'Le déploiement a échoué.'
        }
    }
}
