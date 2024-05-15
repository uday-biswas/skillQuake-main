pipeline {
    agent any
    stages {
        stage('Building image') {
            when {
                expression {
                  BRANCH_NAME == 'master'
                }
            }
            steps {
                echo "building the docker image"
                withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
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
                script {
                echo 'Deploying the app'
                def dockerCmd = 'docker run --env-file skillquake/backend/.env --env-file skillquake/frontend/.env -p 3000:3000 -p 4000:4000 -t udaybiswas944/skillquake'
                sshagent(['azure-skillquake-ssh-private-key']) {
                    sh "ssh -o StrictHostKeyChecking=no azureuser@20.224.165.213 ${dockerCmd}"
                }
                }
            }
        }
    }
}
