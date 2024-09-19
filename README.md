# **Intern Sample Project - Asset Management System**

## **Prerequisites**

Before getting started, ensure the following prerequisites are installed:

- **MongoDB Shell Server:**
  Ensure that MongoDB is installed and the server is running to support the data storage needs of the application.

- **Node.js:**
  Make sure Node.js is installed to execute the server-side code and manage dependencies.

- **Visual Studio Code (VSCode) Editor:**
  It is recommended to use VSCode for code editing and debugging. Install necessary extensions for Node.js and MongoDB support.

- **Java (for MongoDB):**
  MongoDB might require Java for certain operations. Ensure that Java is installed on your machine.

## **Project Overview**

This project is an Asset Management System designed using MongoDB, ExpressJS, and NodeJS. It allows users to perform CRUD operations on assets and performance metrics through RESTful APIs. The system incorporates user authentication using the `passport-local` package for login, logout, and signup functionalities.

## **Getting Started**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rishisrivastava07/internProject.git
   cd internProject
   ```

2. **Install Node Modules:**
   ```bash
   npm install
   ```

3. **Initialize the Database:**
   ```bash
   cd init
   node assetInit.js
   node performanceInit.js
   cd ..
   ```
   - Navigate to the `init` folder and set up the initial data for assets and performance metrics.

4. **Run the Server:**
   - If `nodemon` is installed:
     ```bash
     nodemon index.js
     ```
   - Else, use `node` instead of `nodemon`:
     ```bash
     node index.js
     ```

5. **Access the Server:**
   Open your browser and go to `http://localhost:8080/`.

6. **Login Credentials:**
   First, sign up with an email username and password, then perform the following operations.

7. **Perform CRUD Operations:**
   Utilize the provided RESTful APIs to perform Create, Read, Update, and Delete operations on assets and performance metrics.

## **Technology Stack**

- **MongoDB:**
  - Utilized for storing data in collections such as assets, performance metrics, and users. [Documentation](https://www.mongodb.com/docs/)

- **ExpressJS:**
  - Framework used for building the web application, handling HTTP requests, and defining API routes. [Documentation](https://devdocs.io/express/)

- **NodeJS:**
  - JavaScript runtime used for executing server-side code. [Documentation](https://nodejs.org/docs/latest/api/)

- **Passport-local:**
  - Package used for user authentication, including login, logout, and signup functionalities. [Documentation1](https://www.passportjs.org/packages/passport-local/) [Documentation2](https://www.npmjs.com/package/passport-local-mongoose)

- **EJS Templates:**
  - Employed for creating and rendering web pages with dynamic content. [Documentation](https://www.npmjs.com/package/ejs)

- **Bootstrap:**
  - Library used for basic styling and responsiveness of the web pages. [Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

- **Mongoose:**
  - ODM (Object-Document Mapper) for MongoDB, facilitating the interaction between the application and the database. [Documentation](https://mongoosejs.com/docs/index.html)

## **Collections**

1. **Assets Collection:**
   - Fields include Asset ID, Asset Name, Asset Type, Location, Purchase Date, Initial Cost, Operational Status.

2. **PerformanceMetrics Collection:**
   - Fields include Asset ID (linking to assets), Uptime, Downtime, Maintenance Costs, Failure Rate, Efficiency.

3. **User Collection:**
   - Handles user authentication with fields like username, password, etc.

## **API Functionality**

- **CRUD Operations:**
  - Create, Read, Update, Delete operations for both Assets and PerformanceMetrics.

- **Endpoints for Aggregating Data:**
  - Calculate average downtime.
  - Calculate total maintenance costs.
  - Identify assets with high failure rates.

- **Authentication:**
  - Passport-local package is used for user authentication (login, logout, signup).

## **Data Aggregation and Insights**

- **Average Downtime:**
  - Endpoint to calculate and return the average downtime across all assets.

- **Total Maintenance Costs:**
  - Endpoint to calculate and return the total maintenance costs across all assets.

- **High Failure Rates:**
  - Endpoint to identify and return assets with high failure rates.

## **Development Considerations**

- **Clean and Efficient Code:**
  - Followed best practices for code organization, readability, and performance.

- **Thorough Documentation:**
  - Provided comprehensive documentation for setup, usage, and details of each API endpoint.

- **Testing:**
  - Included unit tests and integration tests to ensure the functionality of CRUD operations and endpoint logic.

- **Scalability:**
  - Designed the system with scalability in mind, considering potential future growth in data volume.

- **Error Handling:**
  - Implemented robust error handling mechanisms to provide meaningful error messages.

- **Security:**
  - Ensured security by using passport-local for user authentication, validating user inputs, and keeping dependencies up-to-date.

## **Conclusion**

This Asset Management System provides a robust solution for managing assets, performance metrics, and user authentication. It demonstrates proficiency in MongoDB, ExpressJS, NodeJS, and various other technologies, adhering to best practices in development.
