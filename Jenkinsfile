pipeline {
    agent any
    stages {
        stage('Build images') {
            steps {
                dir('hip-api') {
                    bat "docker buildx build --platform linux/arm64 -t ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID} ."
                }
            }
        }
        stage('Push images') {
            steps {
                bat "docker push ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
            }
        }
        stage('Cleanup local images') {
            steps {
                bat "docker rm ${env.REGISTRY}/hip-ai:0.1.${env.BUILD_ID}"
            }   
        }
    }
}
