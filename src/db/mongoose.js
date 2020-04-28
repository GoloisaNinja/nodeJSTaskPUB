const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})





// const task = new Task({
//     description: 'Get some sleep',
    

// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error', error)
// }) 

// const user = new User({
//     name: '  Brandy    ',
//     email: '    Brandy@blove.io',
//     age: 33,
//     password: 'niceBoobs'
// })

// user.save().then(() => {
//     console.log(user)
// }).catch((error) => {
//     console.log('Error', error)
// })