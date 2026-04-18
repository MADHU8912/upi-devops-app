pipeline {
    agent any

    environment {
        IMAGE = 'nikhilabba12/upi-app:latest'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat '@echo off && echo %PASS% | docker login -u %USER% --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE%'
            }
        }

        stage('Docker Pull Test') {
            steps {
                bat 'docker pull %IMAGE%'
            }
        }

        stage('Run Container (Test)') {
            steps {
                bat 'docker rm -f upi-test || exit 0'
                bat 'docker run -d -p 5001:5000 --name upi-test %IMAGE%'
            }
        }

    }

    post {
        success {
            echo 'SUCCESS: Build + Push + Pull + Run completed'
        }
        failure {
            echo 'FAILED: Check Docker Login credentials'
        }
    }
}