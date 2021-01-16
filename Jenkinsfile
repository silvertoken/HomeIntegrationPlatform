pipeline {
    agent any
    environment {
        VERSION = "0.1"
    }
    stages {
        stage('Build images') {
            steps {
                dir('hip-certs') {
                    bat "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-certs:${env.VERSION}.${env.BUILD_ID} ."
                }
                dir('hip-requests') {
                    bat "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-requests:${env.VERSION}.${env.BUILD_ID} ."
                }
            }
        }
        stage('Push images') {
            steps {
                bat "docker push ${env.REGISTRY}/hip-certs:${env.VERSION}.${env.BUILD_ID}"
                bat "docker push ${env.REGISTRY}/hip-requests:${env.VERSION}.${env.BUILD_ID}"
            }
        }
        stage('Cleanup local images') {
            steps {
                bat "docker rmi ${env.REGISTRY}/hip-certs:${env.VERSION}.${env.BUILD_ID}"
                bat "docker rmi ${env.REGISTRY}/hip-requests:${env.VERSION}.${env.BUILD_ID}"
            }   
        }
    }
}
