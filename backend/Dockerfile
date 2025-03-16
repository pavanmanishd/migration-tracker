FROM --platform=linux/amd64 maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /workspace/app

# Copy pom.xml and source code
COPY pom.xml .
COPY src src

# Package the application
RUN mvn package -DskipTests

# Runtime stage with a supported JRE image (non-Alpine)
FROM --platform=linux/amd64 eclipse-temurin:17-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /workspace/app/target/*.jar app.jar

# Make the H2 database directory
RUN mkdir -p /app/data

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
EXPOSE 8080
