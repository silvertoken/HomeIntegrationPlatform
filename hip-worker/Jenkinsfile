pipeline {
    agent any
    stages {
        stage('Build images') {
            dir('hip-api') {
                sh "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
            }
        }
        stage('Push images') {
            sh "docker push ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
        }
        stage('Cleanup local images') {
            sh "docker rm ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
        }
    }
}
