pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-app'
        MEMORY_LIMIT = '4g'
        CPU_LIMIT = '2'
    }
    stages {
        stage('Vérification Docker') {
            steps {
                script {
                    // Vérification de la version de Docker
                    echo 'Vérification de la version de Docker...'
                    sh 'docker --version'

                    // Vérification des conteneurs en cours d'exécution
                    echo 'Vérification des conteneurs Docker en cours d\'exécution...'
                    sh 'docker ps'
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    // Construction de l'image Docker avec des ressources limitées
                    echo 'Construction de l\'image Docker...'
                    docker.build(DOCKER_IMAGE, "--memory=${MEMORY_LIMIT} --cpus=${CPU_LIMIT}")
                }
            }
        }

        stage('Test Docker') {
            steps {
                script {
                    // Test pour vérifier l'image construite
                    echo 'Test de l\'image Docker...'
                    sh 'docker images'

                    // Lancer le conteneur pour tester son fonctionnement
                    echo 'Lancement du conteneur Docker...'
                    sh 'docker run -d --name my-container ${DOCKER_IMAGE}'

                    // Vérifier si le conteneur fonctionne correctement
                    sh 'docker ps -a'
                }
            }
        }
    }
    post {
        always {
            // Nettoyage après l'exécution (optionnel)
            echo 'Nettoyage des conteneurs Docker...'
            sh 'docker rm -f my-container || true'  // Supprime le conteneur s'il existe
            sh 'docker rmi -f ${DOCKER_IMAGE} || true'  // Supprime l'image construite
        }
    }
}
