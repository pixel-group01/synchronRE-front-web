pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVER_IP = '137.74.199.79'
        SSH_USER = 'Administrator'  // Utilisateur pour Windows
        SSH_KEY = 'C:\\putty-key\\id_rsa.ppk'  // Chemin vers la clé privée PuTTY
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
                    bat "docker build -t %IMAGE_NAME% ."
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installation des dépendances npm..."

                    // Installation de npm latest pour éviter les problèmes avec package-lock.json
                    bat "npm install -g npm@latest"

                    // Supprimer le node_modules et package-lock.json avant de faire une installation propre
                    bat "del /F /Q node_modules"
                    bat "del /F /Q package-lock.json"

                    // Installer les dépendances en utilisant --legacy-peer-deps
                    bat "npm install --legacy-peer-deps"
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                script {
                    echo "💾 Sauvegarde de l'image Docker..."
                    bat "docker save -o %IMAGE_NAME%.tar %IMAGE_NAME%"
                }
            }
        }

        stage('Transfer Image to Server') {
            steps {
                script {
                    echo "📤 Transfert de l'image vers le serveur..."

                    // Transfert du fichier avec PSCP (PuTTY SCP)
                    bat """
                        pscp.exe -i "%SSH_KEY%" %IMAGE_NAME%.tar %SSH_USER%@%SERVER_IP%:/root/
                    """
                }
            }
        }

        stage('Load and Deploy Image') {
            steps {
                script {
                    echo "🚀 Chargement et déploiement de l'image sur le serveur..."

                    // Commandes exécutées via SSH (PuTTY PLINK)
                    bat """
                        plink.exe -i "%SSH_KEY%" %SSH_USER%@%SERVER_IP% "
                        docker stop %IMAGE_NAME% || true &&
                        docker rm %IMAGE_NAME% || true &&
                        docker load -i /root/%IMAGE_NAME%.tar &&
                        docker run -d -p 80:80 --name %IMAGE_NAME% %IMAGE_NAME%
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Déploiement réussi !'
        }
        failure {
            echo '❌ Déploiement échoué.'
        }
    }
}
