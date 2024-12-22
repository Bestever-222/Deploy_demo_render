# Stage 1: Build the application using Maven
FROM maven:3.8.7-eclipse-temurin-17 AS builder

# Set working directory in the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml /app/
RUN mvn dependency:go-offline

# Copy the source code
COPY src /app/src/

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application using JDK
FROM eclipse-temurin:17-jdk

# Set working directory in the container
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

# Expose the application's port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "/app/demo.jar"]
