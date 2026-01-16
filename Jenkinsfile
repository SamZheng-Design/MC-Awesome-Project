pipeline {
  agent {
    node {
      label 'ecs'
    }
  }
  environment {
    NODE_VERSION=22
    BUILD_FLOW="DOCKER"
    TRIGGER_BUILD = "false"
    SONAR_SCAN = "false"
  }

  stages {
    stage("Build Initial") {
      steps {
        buildEntry()
      }
    }
  }
}