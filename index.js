

const Joi = require('joi');
const express = require('express');
const app = express();

// This is declare express uses JSON objects.
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];


app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const { error } = ValidateCourse(req.body); // result.error

    if(error) return res.status(400).send(error.details.map(o => o.message).concat()); // 400 Bad Request

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Lookup the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Thes course with given ID was not found.');

    // Validate
    //If invalid, return 400 - Bad Request

    //const validationResult = ValidateCourse(req.body);
    const { error } = ValidateCourse(req.body); // result.error

    if(error) return res.status(400).send(error.details.map(o => o.message).concat());  // 400 Bad Request

    // Update the course
    course.name = req.body.name;
    // Return updated course
    res.send(course);

});

const ValidateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.delete('/api/courses/:id', (req, res) => {
    // Lookup the course
    // Not exisitng, retunr 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Thes course with given ID was not found.');

    // Delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params);
    //res.send(req.query);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Thes course with given ID was not found.'); // 404
    res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

