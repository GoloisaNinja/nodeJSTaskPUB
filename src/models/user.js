const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const JWT_SECRET = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        min: [0, 'Age must be a positive value']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [7, 'Password must be at least 7 characters'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain any case variation of the word "password"')
                }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token 
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( {email} )
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// HASH THE PLAIN TEXT PASSWORD BEFORE SAVING
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) 
    }

    next()
})
// DELETE ALL USER TASKS WHEN USER IS REMOVED
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema) 

module.exports = User