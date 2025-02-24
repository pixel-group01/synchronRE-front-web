pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVER_IP = '137.74.199.79'
        SERVER_USER = 'root' // Change si ton utilisateur est différent
        PUTTY_PATH = 'C:\\Program Files\\PuTTY' // Adapte si ton installation de PuTTY est ailleurs
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

        stage('Save and Transfer Image') {
            steps {
                script {
                    echo "📤 Sauvegarde et transfert de l'image vers le serveur..."

                    // Sauvegarde l'image Docker en .tar
                    bat "docker save -o %IMAGE_NAME%.tar %IMAGE_NAME%"

                    // Transfère le fichier via pscp.exe (Putty SCP)
                    bat "\"%PUTTY_PATH%\\pscp.exe\" -i C:\\chemin\\vers\\ta_cle.ppk %IMAGE_NAME%.tar %SERVER_USER%@%SERVER_IP%:/root/"

                    // Nettoyage du fichier temporaire après transfert
                    bat "del /F /Q %IMAGE_NAME%.tar"
                }
            }
        }

        stage('Deploy on Server') {
            steps {
                script {
                    echo "🚀 Déploiement sur le serveur distant..."
                    bat "\"%PUTTY_PATH%\\plink.exe\" -i C:\\chemin\\vers\\ta_cle.ppk %SERVER_USER%@%SERVER_IP% \"docker load -i /root/%IMAGE_NAME%.tar && docker stop %IMAGE_NAME% || true && docker rm %IMAGE_NAME% || true && docker image prune -f && docker run -d -p 80:80 --name %IMAGE_NAME% %IMAGE_NAME%\""
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
