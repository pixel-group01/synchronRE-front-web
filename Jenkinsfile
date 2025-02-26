pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        OLD_CONTAINER_NAME = 'synchronre-front-web-1'
        NEW_CONTAINER_NAME = 'synchronre-front-web-2'
        PORT_MAPPING_OLD = '8585:80'
        PORT_MAPPING_NEW = '8586:80'
        MINIKUBE_HOME = 'C:\\minikube' // Chemin d'accès à Minikube sur ton système
        KUBECONFIG = "${MINIKUBE_HOME}\\kubeconfig" // Chemin vers le fichier kubeconfig
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
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    // Configure Docker to use Minikube's Docker daemon
                    echo "Configuring Docker to use Minikube's Docker daemon"
                    bat 'minikube -p minikube docker-env | Invoke-Expression'

                    // Build the Docker image and tag it
                    echo "Building Docker image for Minikube"
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."

                    // Apply Kubernetes deployment
                    echo "Deploying new version to Minikube"
                    bat "kubectl apply -f k8s/deployment.yaml"
                    bat "kubectl apply -f k8s/service.yaml"

                    // Verify the deployment
                    echo "Verifying the deployment"
                    bat "kubectl rollout status deployment/${env.IMAGE_NAME}"
                }
            }
        }

        stage('Cleanup Old Container') {
            steps {
                script {
                    // Optionally, you can clean up old deployments if needed
                    echo "Cleaning up old deployments"
                    bat "kubectl delete pod -l app=${env.IMAGE_NAME} --grace-period=0 --force"
                }
            }
        }
    }
}
