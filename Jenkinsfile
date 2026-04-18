pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    environment {
        IMAGE_NAME = 'nikhilabba12/upi-app'
        IMAGE_TAG = 'latest'
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
                bat 'echo Current directory:'
                bat 'cd'
                bat 'echo Root files:'
                bat 'dir'
                bat 'echo Backend files:'
                bat 'dir backend'
                bat 'echo Frontend files:'
                bat 'dir frontend'
            }
        }

        stage('Start Report') {
            steps {
                bat 'echo Build started > build-report.txt'
                bat 'echo Project: UPI DevOps App >> build-report.txt'
                bat 'echo Image: %FULL_IMAGE% >> build-report.txt'
                bat 'echo Checkout completed >> build-report.txt'
                bat 'echo File check completed >> build-report.txt'
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
        success {
            echo 'Pipeline finished successfully'
        }
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            bat 'echo Check Jenkins console output for failed stage >> build-report.txt'
        }
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}