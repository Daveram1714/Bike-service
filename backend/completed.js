// completed.js
import nodemailer from 'nodemailer';

export const Completed = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "Enter your E-mail",
    pass: "Enter Your PassKey",
  },
});
