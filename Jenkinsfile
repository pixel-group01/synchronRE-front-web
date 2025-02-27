pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        MINIKUBE_HOME = 'C:\\minikube'
        KUBECONFIG = "${MINIKUBE_HOME}\\kubeconfig"
        PATH = "${MINIKUBE_HOME}\\bin;${env.PATH}"
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

        stage('Setup Minikube Docker') {
            steps {
                script {
                    echo "Checking Minikube version"
                    bat 'minikube version'
                    echo "Configuring Docker to use Minikube's Docker daemon"
                    bat "FOR /f \"tokens=*\" %%i IN ('minikube -p minikube docker-env') DO %%i"
                    echo "Docker config applied"
                    bat 'docker info'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image"
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Apply Kubernetes Deployment') {
            steps {
                script {
                    echo "Applying Kubernetes Deployment"
                    bat 'kubectl apply -f deployment.yaml'
                }
            }
        }

        stage('Apply Kubernetes Service') {
            steps {
                script {
                    echo "Applying Kubernetes Service"
                    bat 'kubectl apply -f service.yaml'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Checking running pods"
                    bat 'kubectl get pods'
                    echo "Getting service details"
                    bat 'kubectl get svc'
                }
            }
        }
    }
}
