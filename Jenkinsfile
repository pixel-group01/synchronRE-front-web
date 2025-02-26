pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        CONTAINER_NAME = 'synchronre-front-web'
        PORT_MAPPING = '8585:80'
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
                    bat "docker build -t %IMAGE_NAME% ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    // Vérifier si le conteneur tourne et l'arrêter
                    bat "FOR /F %i IN ('docker ps -q --filter \"name=%CONTAINER_NAME%\"') DO docker stop %i"
                    bat "FOR /F %i IN ('docker ps -aq --filter \"name=%CONTAINER_NAME%\"') DO docker rm %i"


                    // Supprimer les images orphelines (dangling)
                    bat "FOR /F %%i IN ('docker images -f 'dangling=true' -q') DO docker rmi %%i"

                    // Lancer le conteneur
                    bat "docker run -d --name %CONTAINER_NAME% -p %PORT_MAPPING% %IMAGE_NAME%"
                }
            }
        }

        stage('Debug Docker') {
            steps {
                script {
                    bat "docker ps -a" // Voir tous les conteneurs, même arrêtés
                    bat "docker logs %CONTAINER_NAME%" // Voir les logs du conteneur
                }
            }
        }

//         stage('Capture Logs') {
//             steps {
//                 bat "docker logs -f %CONTAINER_NAME%"
//             }
//         }
    }
}
