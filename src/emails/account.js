const sgMail = require('@sendgrid/mail')
const sendgridAPIkey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'jack@goloisaninja.online',
        subject: 'Welcome to the Task App!',
        text: `${name}, thank you so much for signing up! Greatness awaits!`
    
    })

}

const sendDeleteMeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'jack@goloisaninja.online',
        subject: 'Sorry to see you go!',
        text: `${name}, thank you for being a part of our App! We are sorry to see you go, but hope you come back soon!`
    
    })

}



module.exports = {
    sendWelcomeEmail,
    sendDeleteMeEmail
}

