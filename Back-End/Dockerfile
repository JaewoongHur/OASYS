FROM openjdk:11
VOLUME /tmp
COPY target/*.jar back.jar
ENTRYPOINT ["java", "-jar", "back.jar"]