pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVER_IP = '137.74.199.79' // Assure-toi que c'est bien l'IP correcte pour accéder à ton serveur
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'test', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🔨 Construction de l'image Docker..."
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Push Docker Image to Registry') {
            steps {
                script {
                    echo "📤 (Optionnel) Pousser l'image Docker vers un registre..."
                    // Si tu veux pousser l'image vers Docker Hub ou un autre registre, ajoute l'authentification :
                    // sh "docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                    // sh "docker tag ${IMAGE_NAME} mydockerhub/${IMAGE_NAME}:latest"
                    // sh "docker push mydockerhub/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "🚀 Déploiement sur le serveur de production..."

                    // Vérifier si le conteneur existe et le stopper
                    sh """
                        if [ \$(docker ps -aq -f name=${IMAGE_NAME}) ]; then
                            docker stop ${IMAGE_NAME} || true
                            docker rm ${IMAGE_NAME} || true
                        fi
                    """

                    // Lancer un nouveau conteneur
                    sh "docker run -d -p 80:80 --name ${IMAGE_NAME} ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Le déploiement a réussi !'
        }
        failure {
            echo '❌ Le déploiement a échoué.'
        }
    }
}
