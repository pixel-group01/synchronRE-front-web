pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Nom de l'installation Node.js dans Jenkins (à configurer dans Jenkins Global Tool Configuration)
    }

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}\\.npm"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
