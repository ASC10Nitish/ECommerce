# FROM openjdk:17
# COPY target/cart-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8083
# ENTRYPOINT ["java", "-jar", "app.jar"]



FROM openjdk:17-jdk-slim

COPY target/cart-0.0.1-SNAPSHOT.jar /app.jar
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENTRYPOINT ["/wait-for.sh", "mysql-cart", "java", "-jar", "/app.jar"]
