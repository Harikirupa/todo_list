# To-Do List Application

A simple yet full-stack web application that allows users to manage their daily tasks. Users can add new tasks, view all their tasks, mark tasks as complete, and remove them from the list. The application is built with a Java Spring Boot backend and a clean, responsive HTML/CSS/JavaScript frontend.

# Features

# ✅ Create new tasks

# 👀 View a list of all tasks

# 👍 Mark tasks as completed

# 🗑️ Delete tasks

Tech Stack
Backend: Java (Spring Boot, Spring Data JPA)

Frontend: HTML, CSS, JavaScript

Database: MySQL

Build Tool: Maven

Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Make sure you have the following installed:

Java Development Kit (JDK) 17 or newer

Apache Maven

MySQL Server

Local Setup
Clone the repository:

Shell

git clone https://github.com/Harikirupa/my-java-todolist.git
cd my-java-todolist
Create the MySQL Database:

Open your MySQL client and run the following command:

SQL

CREATE DATABASE todo_app_db;
Configure the Application:

Open the src/main/resources/application.properties file.

Update the spring.datasource properties with your MySQL username and password:

Properties

# MySQL Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/todo_app_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
Run the Application:

Open a terminal in the project's root directory and run:

Shell

# For Windows
.\mvnw spring-boot:run

# For Mac/Linux
./mvnw spring-boot:run
Access the Application:

Open your web browser and go to http://localhost:8080.
