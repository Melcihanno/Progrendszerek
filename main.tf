terraform {
    required_providers{
        docker = {
            source = "kreuzwerker/docker"
            version = "~> 3.0.0"
        }
    }
}

resource "docker_image" "node_app" {
    name = "nodejs-sample-app:latest"
    build {
        context     = "."
        dockerfile  = "Dockerfile_angular"
        tag         = ["nodejs-sample-app:latest"]
    }
}

resource "docker_container" "node_app" {
    name = "nodejs-sample-app"
    image = docker_image.node_app.image_id

    ports {
        internal = 4200
        external = 4200
    }

    restart = "unless-stopped"
}