# Use Maven to build the project
FROM maven:3.8.7-eclipse-temurin-17 AS builder


# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src /app/src

# Package the application using Maven
RUN mvn clean package -DskipTests

# Use OpenJDK to run the packaged application
FROM openjdk:17-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the builder image
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# Expose the port your app will run on (default Spring Boot port is 8080)
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/app/demo-0.0.1-SNAPSHOT.jar"]
