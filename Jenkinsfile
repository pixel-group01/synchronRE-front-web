pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Nom de l'installation Node.js dans Jenkins (à configurer dans Jenkins Global Tool Configuration)
    }

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}\\.npm"//////
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
                echo "Workspace directory is: ${env.WORKSPACE}"
            }
        }

        stage('Copy Build to Nginx Directory') {
             steps {
                            // Crée le répertoire cible si nécessaire, puis copie les fichiers de build
                            bat '''
                            if not exist C:\\nginx-1.24.0\\html\\synch mkdir C:\\nginx-1.24.0\\html\\synch
                            xcopy /s /e /y dist\\* C:\\nginx-1.24.0\\html\\synch\\
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
