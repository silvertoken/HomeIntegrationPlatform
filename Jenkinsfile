pipeline {
    agent any
    environment {
        VERSION = "0.1"
    }
    stages {
        stage('Build images') {
            steps {
                dir('hip-api') {
                    bat "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-api:${env.VERSION}.${env.BUILD_ID} ."
                }
            }
        }
        stage('Push images') {
            steps {
                bat "docker push ${env.REGISTRY}/hip-api:${env.VERSION}.${env.BUILD_ID}"
            }
        }
        stage('Cleanup local images') {
            steps {
                bat "docker rmi ${env.REGISTRY}/hip-api:${env.VERSION}.${env.BUILD_ID}"
            }   
        }
    }
}
