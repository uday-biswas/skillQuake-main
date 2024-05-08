pipeline {
    agent any
    stages {
        stage('Building image') {
            steps {
                echo "building the docker image"
                withCredentials([string(credentialsId: 'dockerhub_credentials', userVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh 'docker build -t udaybiswas944/skillquake:latest .'
                    sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"
                    sh 'docker push udaybiswas944/skillquake:latest'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'testing the app'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
            }
        }
    }
}
