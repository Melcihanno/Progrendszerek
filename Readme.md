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
403-as cache hiba miatt, valószínüleg ez a windowsos jogosultsági hiba, amit nem sikerült megoldani

![Jenkins-1](https://github.com/user-attachments/assets/6d84a737-a9d0-4574-8544-48ec9dbc4842)
![Jenkins-2](https://github.com/user-attachments/assets/ae815090-8165-486b-b54c-6e0db859e64b)
![Jenkins-3](https://github.com/user-attachments/assets/219be4cf-f6d3-4f60-b23e-5d0bed41f904)
