Jenkins elindítása:
docker pull jenkins/jenkins
docker run -it --rm -p 8080:8080 -p 50000:50000 -v ./jenkins_home:/var/jenkins_home jenkins/jenkins:lts

A tűzfalhoz szükséges image:
docker pull internetsystemsconsortium/bind9

Docker compose parancs:
Docker compose up

A Dockerfile_angular működik
A Dockerfile_mongo működik
A terraform main hibára fut

Terraform nem indul :(