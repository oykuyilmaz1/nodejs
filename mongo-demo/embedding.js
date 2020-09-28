const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(console.log('Connected to playground'))
    .catch(err => console.error(err))

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});
const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find()
        .populate('author', 'name -_id')
        .select('name author');
    console.log(courses);
}
async function updateAuthor(courseId){
    const result = await Course.update({_id: courseId}, { 
        $set: {
        'author.name':'John Smith'
    }});
    console.log(result);
}
// createAuthor('name', 'bio', 'website');
// createCourse('course1', new Author({name:'mosh'}));
// listCourses();
updateAuthor("5f52581e51610d6bd85405ad");