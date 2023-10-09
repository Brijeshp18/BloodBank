const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;
require("dotenv").config();
const dbConfig = require("./config/dbconfig");
app.use(express.json());
app.use(cors()); // connect between different ports
const userRoutes = require("./routes/usersRoutes");
app.use("/api/users", userRoutes);
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Bloodbank",
      version: "1.0.0",
      description: "API documentation for my Blood bank application.",
    },
    contact: {
      name: "Brijeshp",
      email: "mailto:brijesh@pumexinfotech.com",
    },
    servers: [
      {
        url: "http://localhost:5001/",
      },
    ],
  },

  apis: ["./routes/usersRoutes.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`node server is listening on port ${port}`);
});
