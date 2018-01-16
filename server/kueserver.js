const kue = require('kue');
const queue = kue.createQueue();
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS  // generated ethereal password
    }
});

queue.process('email', 20, function(job, done){
  let mailOptions = job.data
  transporter.sendMail(job.data, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      done()
  });
});

queue.on('job complete', (id, result) => {
  kue.Job.get(id, (err, job) => {
    if (err) throw err;
    job.remove((err) => {
      if (err) throw err;
      console.log(`Removed completed job ${job.id}`);
    });
  });
});

kue.app.listen(3002);