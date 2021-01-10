pipeline {
    agent any
    stages {
        stage('Build images') {
            dir('hip-api') {
                bat "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
            }
        }
        stage('Push images') {
            bat "docker push ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
        }
        stage('Cleanup local images') {
            bat "docker rm ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
        }
    }
}
