# FROM openjdk:17
# COPY target/users-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8081
# ENTRYPOINT ["java", "-jar", "app.jar"]

FROM openjdk:17-jdk-slim

COPY target/userservice-0.0.1-SNAPSHOT.jar /app.jar
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENTRYPOINT ["/wait-for.sh", "mysql-user", "java", "-jar", "/app.jar"]

