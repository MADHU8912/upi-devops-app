pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    environment {
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
                bat 'dir'
                bat 'dir backend'
                bat 'dir frontend'
            }
        }

        stage('Start Report') {
            steps {
                bat 'echo Build started > build-report.txt'
                bat 'echo Image: %FULL_IMAGE% >> build-report.txt'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %FULL_IMAGE% .'
                bat 'echo Docker build successful >> build-report.txt'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '@echo off && echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
                bat 'echo Docker login successful >> build-report.txt'
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %FULL_IMAGE%'
                bat 'echo Docker push successful >> build-report.txt'
            }
        }

        stage('Docker Pull Test') {
            steps {
                bat 'docker pull %FULL_IMAGE%'
                bat 'echo Docker pull successful >> build-report.txt'
            }
        }

        stage('Final Report') {
            steps {
                bat 'echo Pipeline completed successfully >> build-report.txt'
                bat 'type build-report.txt'
            }
        }
    }

    post {
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            bat 'echo Check Docker Hub credential dockerhub-creds >> build-report.txt'
        }
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}