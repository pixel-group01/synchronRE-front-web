pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'
        HEALTHCHECK_URL = 'http://localhost:8580'
        CONTAINER_NAME  = 'synchronre-front'
        STACK_NAME = 'synchronre-stack'  // Définir la variable ici
        VERSION = '1.0.0'  // Exemple de version pour l'argument VERSION
    }
//
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                         docker build --cache-from=${env.IMAGE_NAME}:${BUILD_NUMBER} --build-arg VERSION=${env.VERSION} -t ${env.IMAGE_NAME}:${BUILD_NUMBER} .
                        """
                }
            }
        }

        stage('Push to Local Registry') {
                   steps {
                       script {
                           bat """
                               docker tag ${BUILD_TAG} ${IMAGE_NAME}:latest
                               docker image ls
                           """
                       }
                   }
               }

       stage('Deploy to Docker Swarm') {
                   steps {
                       script {
                           echo "Déploiement de la stack Docker Swarm..."
                           bat """
                               docker stack deploy -c docker-compose.yml --with-registry-auth ${STACK_NAME}
                           """
                       }
                   }
               }

        stage('Cleanup Old Images') {
                   steps {
                       script {
                           echo "Suppression des anciennes images..."
                           bat """
                           @echo off
                                   for /F "tokens=1" %%i in ('docker images --format "{{.ID}}" --filter "reference=${IMAGE_NAME}" --sort=created ^| tail -n +2') do docker rmi -f %%i
                      """
                           echo "Anciennes images supprimées avec succès."
                       }
                   }
               }
           }
}
