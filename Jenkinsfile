pipeline {
    agent any

    tools {
        nodejs 'nodejs'  // Utilise le nom que tu as donné à ta configuration Node.js
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
    }
}
