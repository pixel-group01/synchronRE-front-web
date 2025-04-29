pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Nom de l'installation Node.js dans Jenkins (à configurer dans Jenkins Global Tool Configuration)
    }

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}\\.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev_venance', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Copy Build to Nginx Directory') {
            steps {
                // Copie les fichiers de 'dist/main' (ou autre sous-répertoire) directement dans 'C:\\nginx-1.24.0\\html\\synchronre'
                bat '''
                if not exist C:\\nginx-1.24.0\\html\\synchronre mkdir C:\\nginx-1.24.0\\html\\synchronreDev
                xcopy /s /e /y dist\\main\\* C:\\nginx-1.24.0\\html\\synchronreDev\\
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
