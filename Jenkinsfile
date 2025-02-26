pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        MINIKUBE_HOME = 'C:\\minikube'  // Assure-toi que Minikube est installé ici
        KUBECONFIG = "${MINIKUBE_HOME}\\kubeconfig"
        PATH = "${MINIKUBE_HOME}\\bin;${env.PATH}"  // Ajouter Minikube au PATH
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
                                powershell """
                                    \$env:DOCKER_TLS_VERIFY = '1'
                                    \$env:DOCKER_HOST = 'tcp://$(minikube -p minikube ip):2376'
                                    \$env:DOCKER_CERT_PATH = (minikube -p minikube docker-env | Select-String -Pattern 'DOCKER_CERT_PATH=(.*)' | ForEach-Object { \$_.Matches.Groups[1].Value }).Trim()
                                    \$env:DOCKER_MACHINE_NAME = 'minikube'
                                    docker info
                                """
                                echo "Docker config applied"
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
