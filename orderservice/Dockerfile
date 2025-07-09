# FROM openjdk:17
# COPY target/orders-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8084
# ENTRYPOINT ["java", "-jar", "app.jar"]


FROM openjdk:17-jdk-slim

COPY target/orders-0.0.1-SNAPSHOT.jar /app.jar
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENTRYPOINT ["/wait-for.sh", "mysql-order", "java", "-jar", "/app.jar"]
