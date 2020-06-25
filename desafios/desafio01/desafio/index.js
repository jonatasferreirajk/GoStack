const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Middleware

//Check if the project exists
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not Found!" });
  }

  return next();
}

//Middleware that logs the number of requests
function logRequests(req, res, next) {
  console.count("Number of Requests!");
  return next();
}

server.use(logRequests);

/*
Return All
GET -> http://localhost:4000/projects */
server.get("/projects", (req, res) => {
  return res.json(projects);
});

/**
 * register a new project -> Request body: id, title
 * POST -> http://localhost:4000/projects
 */
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.json(projects);
});

/* Change the project title with the id present in the route parameters 
Route params: id,
Request body: title
PUT -> http://localhost:4000/projects/2
*/

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);
  project.title = title;

  return res.json(projects);
});

/*Deletes the project associated with the id present in the route parameters.
Route params: id
DELETE -> http://localhost:4000/projects/2
*/
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((p) => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

/*Route params: id;
 *Adds a new task to the chosen project via id;
 POST -> http://localhost:4000/projects/1/tasks
 */
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find((p) => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(4000);
