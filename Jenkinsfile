pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/upi-app'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Files') {
            steps {
                bat 'dir'
                bat 'dir backend'
                bat 'dir frontend'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Build started > build-report.txt'
                bat 'echo Project: UPI DevOps App >> build-report.txt'
                bat 'echo Build successful so far >> build-report.txt'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Docker Pull Test') {
            steps {
                bat 'docker pull %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}