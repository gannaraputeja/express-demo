# Express-Demo Application

Implemented CRUD REST APIs for courses catalog along with error handling using Express library on Node.
Leveraged Joi library for schema and data validation.

## APIs
- GET /
- GET /api/courses
- GET /api/courses/:id 
- POST /api/courses
    body: {"name": "New Course"}
- PUT /api/courses/:id
- DELETE /api/courses/:id

## Steps to Run Application
- Clone the project
- Ensure Node runtime is available
- Execute below command.
    `node index.js`
- Navigate to POSTMAN to try above different APIs.

## References
- https://nodejs.org/dist/latest-v16.x/docs/api/documentation.html
- https://expressjs.com/en/4x/api.html
- https://www.npmjs.com/package/joi
