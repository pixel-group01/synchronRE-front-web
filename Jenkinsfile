pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        MINIKUBE_HOME = 'C:\\minikube'  // Assure-toi que Minikube est installé ici
        KUBECONFIG = "${MINIKUBE_HOME}\\kubeconfig"
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
                    echo "Configuring Docker to use Minikube's Docker daemon"
                    bat '@FOR /f "tokens=*" %i IN (\'minikube -p minikube docker-env\') DO @%i'

                    echo "Building Docker image"
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Push Docker Image to Minikube') {
            steps {
                script {
                    echo "Pushing image to Minikube's Docker"
                    bat "minikube cache add ${env.IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    echo "Applying Kubernetes configurations"
                    bat "kubectl apply -f k8s/deployment.yaml"
                    bat "kubectl apply -f k8s/service.yaml"

                    echo "Verifying deployment"
                    bat "kubectl rollout status deployment/${env.IMAGE_NAME}"
                }
            }
        }
    }
}
