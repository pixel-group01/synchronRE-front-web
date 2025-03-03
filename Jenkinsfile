pipeline {
    agent any

    environment {
        IMAGE_NAME = 'synchronre-front-web'
        SERVICE_NAME = 'synchronre-front'  // Nom du service dans Docker Swarm
        HEALTHCHECK_URL = 'http://localhost:8586'  // URL pour verifier la disponibilite du service
        REGISTRY_URL = 'docker.io' // L'URL de ton registre Docker privé
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'test-docker', url: 'https://github.com/pixel-group01/synchronRE-front-web.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                    script {
                        // Vérifie si l'archive node_modules.tar.gz existe et restaure le cache si disponible
//                                     if (fileExists('node_modules.tar.gz')) {
//                                         echo "Restauration du dossier node_modules depuis le cache..."
//                                         bat 'tar -xzf node_modules.tar.gz'
//                                     } else {
//                                         echo "Aucun cache trouvé. Le dossier node_modules sera créé lors de l'installation des dépendances."
//                                     }
//
//                                     // Vérifie si node_modules existe et contient des fichiers
//                                     def nodeModulesExists = fileExists('node_modules')
//                                     def nodeModulesNotEmpty = nodeModulesExists && bat(script: 'dir /b node_modules | findstr /r /c:"."', returnStdout: true).trim()
//
//                                     if (nodeModulesNotEmpty) {
//                                         echo "Le dossier node_modules existe et n'est pas vide. Les dépendances sont déjà installées."
//                                     } else {
//                                         echo "Installation des dépendances avec npm ci..."
                                        bat 'npm ci'

//                                         echo "Sauvegarde du dossier node_modules dans le cache..."
//                                         bat 'tar -czf node_modules.tar.gz node_modules'
//                                         archiveArtifacts artifacts: 'node_modules.tar.gz', onlyIfSuccessful: true
//                         }
                    }
                }
        }

        stage('Build Angular App') {
            steps {
                bat 'ng build --configuration=production --optimization=true --buildOptimizer=true --aot=true'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${env.IMAGE_NAME}:latest ."
                     // Taguer l'image avec l'URL du registre
                      bat "docker tag ${env.IMAGE_NAME}:latest ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}"

                     // Pousser l'image vers le registre Docker
                     bat "docker push ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Create Docker Service') {
            steps {
                script {
                    // Vérifier si le service existe déjà
                               def serviceExists = bat(script: "docker service ls --filter name=${env.SERVICE_NAME} -q", returnStdout: true).trim()

                               if (serviceExists) {
                                   // Si le service existe déjà, le mettre à jour avec l'image du registre
                                   echo "Le service ${env.SERVICE_NAME} existe déjà. Mise à jour avec la nouvelle image..."
                                   bat """
                                       docker service update --image ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}
                                   """
                               } else {
                                   // Sinon, créer un nouveau service avec l'image du registre
                                   echo "Le service ${env.SERVICE_NAME} n'existe pas. Création d'un nouveau service..."
                                   bat """
                                       docker service create --name ${env.SERVICE_NAME} --replicas 2 --publish 8585:80 --label traefik.enable=true --label traefik.http.routers.synchronre.rule=Host('yourdomain.com') --label traefik.http.services.synchronre.loadbalancer.server.port=80 ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}
                                   """
                    }
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                    echo "Démarrage du nouveau conteneur..."

                               // Pousser l'image vers Docker registry si nécessaire
                               echo "Taguer l'image avec le numéro de build et le registre..."
                               bat "docker tag ${env.IMAGE_NAME}:latest ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}"

                               // Pousser l'image vers le registre Docker
                               echo "Pousser l'image vers Docker Hub..."
                               bat "docker push ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}"

                               // Mettre à jour le service Docker avec la nouvelle image
                               echo "Mise à jour du service Docker avec l'image : ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER}"
                               bat """
                                   docker service update --image ${env.REGISTRY_URL}/salif2021/${env.IMAGE_NAME}:${BUILD_NUMBER} ${env.SERVICE_NAME}
                               """

                               // Vérifier la disponibilité du nouveau conteneur
                               echo "Vérification de la disponibilité du nouveau conteneur..."
                               bat """
                                   for /L %%i in (1,1,10) do (
                                       curl --silent --fail ${env.HEALTHCHECK_URL} && exit /b 0 || (
                                           echo "En attente de disponibilité... %%i"
                                           timeout /t 5 >nul
                                       )
                                   )
                               """

                               echo "Rolling update terminé avec succès !"
                }
            }
        }
    }

    post {
        success {
            // Sauvegarde le dossier node_modules dans le cache
            echo "Sauvegarde du dossier node_modules dans le cache..."
            bat 'tar -czf node_modules.tar.gz node_modules'
            archiveArtifacts artifacts: 'node_modules.tar.gz', onlyIfSuccessful: true
        }
    }
}
