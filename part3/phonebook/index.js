const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config(); // Load variables from .env
const Person = require("./models/person");

// Allows requests from other origins
app.use(cors());

// Serving static files
app.use(express.static("build"));

// Parse incoming requests with JSON payload
app.use(express.json());

// Define a body token
morgan.token("body", (request, response) => JSON.stringify(request.body));

// HTTP request logger
app.use(
  morgan(function (tokens, request, response) {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms ",
      tokens.body(request, response),
    ].join(" ");
  })
);

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Parameters is defined by using colon
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error); // next with parameter continue to error handler
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "The name or number is missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "The name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// Middleware here is called only when no routes handle HTTP request
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }

  next(error);
};

// Custom error handler * must be last loaded middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
