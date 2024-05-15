pipeline {
    agent any
    stages {
        stage('Building image') {
            steps {
                echo "building the docker image in develop branch"
            }
        }
        stage('Test') {
            steps {
                echo 'testing the app in develop branch'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
            }
        }
    }
}
