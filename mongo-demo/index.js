const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground')
    .then(()=> console.log('Connected'))
    .catch((err) => console.error('Could not connect', err));

const courseSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required: true,
        enum: ['web', 'mobile'],
        lowercase: true, 
        trim:true
    },
    author: String,
    tags: {
        type:Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'Should have at least one tag'
        }
    },
    date: {type:Date, default: Date.now},
    isPublished:Boolean,
    price: {
        type: Number,
        required: function(){return this.isPublished},
        get:(x) => Math.round(x),
        set:(x) => Math.round(x)

    }
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse(){
    const course = new Course({
        name: 'c78',
        author: 'mosh',
        tags: ['ksk'],
        isPublished:true,
        price:15.8,
        category:'web'
    });
    
    try{
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch(err){
        for(field in err.errors){
            console.log(err.errors[field].message);
        }
    }
}

async function getCourse(){
    const courses = await Course
        .find({author:'mosh'})
        //.find({price:{$gte:10, $lte:20}})
        //.find({price: {$in:[10,15,25]}})

        //or
        //.find().or([{},{}])

        //regex
        //.find({author:/pattern/})
        //starts -> /^kdkd/
        //ends --> /kdkdk$/
        //has in it --> /.*skksks.*/
        //insensitive /pattern/i
        .limit(10)
        .sort({name:1}) // -1 for ascending
        .select({name:1, tags:1});
        //to count no select but .count()
    console.log(courses);
}
async function updateCourse(id){
    const courses = await Course.findById(id);
    if(!courses) return;
    courses.set({
        isPublished:false
    });
    const result = await courses.save();
    console.log(result);
}
createCourse();
// updateCourse("5f4e6ca2641f953fe1c2a233");