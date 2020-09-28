const express = require('express');
const router = express.Router();

const courses = [
    {id:1, name:'c1'},
    {id:2, name:'c2'},
    {id:3, name:'c3'},
]

router.get('/:year/:month', (req, res) => {
    res.send(req.query);
});
router.get('/', (req, res) => {
    res.send(courses);
});
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // const course = courses.find(c => c.name=== req.params.id);

    if(!course) res.status(404).send('Not found');
    // res.send(course.name)
    res.send(JSON.stringify(course.id));
});


router.post('/', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(404).send(result.error.details[0].message);
        return;
    }
    console.log(result);
    // if(!req.body.name || req.body.name.length <2){
    //     res.status(400).send('Name has to be given and be > 1 char');
    //     return;
    // }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

router.put('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // const course = courses.find(c => c.name=== req.params.id);

    if(!course) return res.status(404).send('Not found');
    const {error} = validateCourse(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Not found');
    const index = array.indexOf(course);
    array.splice(index,1);
    res.send(course);
});
//since it is a dublicate
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    return schema.validate(course);
}
module.exports = router;