const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "daveram2273@gmail.com",
    pass: "asjy hidd iydf ofbr",
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: {
        name :'daveram',
        address: "daveram2273@gmail.com",
    },
    to: "daveram860@gmail.com",
    subject: "Status", 
    text: "Ready to Delevery ....", 
    html: "<b>Completed ....</b>", 
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);