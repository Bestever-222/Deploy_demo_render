# Stage 1: Build the application using Maven
FROM maven:3.8.7-eclipse-temurin-17 AS builder

# Set working directory in the container
WORKDIR /app

# Copy the Maven files
COPY pom.xml /app/
# Download dependencies (this will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

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

# Set environment variables for MongoDB connection (optional)
# You can set these dynamically in your deployment environment as well
ENV SPRING_DATA_MONGODB_URI=mongodb+srv://Payal:abcd@cre8hub.fa6t0.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=cre8hub
ENV SPRING_PROFILES_ACTIVE=prod

# Command to run the application
CMD ["java", "-jar", "/app/demo.jar"]
