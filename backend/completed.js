// completed.js
import nodemailer from 'nodemailer';

export const Completed = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "daveram2273@gmail.com",
    pass: "xysx llmc grdn iwik",
  },
});
