pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/upi-app'
        IMAGE_TAG  = 'latest'
        FULL_IMAGE = 'nikhilabba12/upi-app:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Files') {
            steps {
                bat 'echo Current folder:'
                bat 'cd'
                bat 'echo Root files:'
                bat 'dir'
                bat 'echo Backend files:'
                bat 'dir backend'
                bat 'echo Frontend files:'
                bat 'dir frontend'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Build started > build-report.txt'
                bat 'echo Project: UPI DevOps App >> build-report.txt'
                bat 'echo Image: %FULL_IMAGE% >> build-report.txt'
                bat 'echo Docker build stage starting >> build-report.txt'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %FULL_IMAGE% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '@echo off && echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %FULL_IMAGE%'
            }
        }

        stage('Docker Pull Test') {
            steps {
                bat 'docker pull %FULL_IMAGE%'
            }
        }

        stage('Update Report') {
            steps {
                bat 'echo Docker login successful >> build-report.txt'
                bat 'echo Docker push successful >> build-report.txt'
                bat 'echo Docker pull successful >> build-report.txt'
                bat 'echo Pipeline completed successfully >> build-report.txt'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        success {
            echo 'Jenkins pipeline completed successfully'
        }
        failure {
            echo 'Jenkins pipeline failed'
        }
    }
}