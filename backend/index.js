import { Completed  } from "./completed.js";
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
const app=express()

app.use(cors())

app.use(bodyParser.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/booking").then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("not connected to database")
})

const User=mongoose.model("User",{
    userId:String,
    userName:String,
    emailId:String,
    password:String,
    confirmPassword:String,
    phoneNumber:String,
    
},"details")

const Order=mongoose.model("Order",{
  userId:String,
  desc:String,
  price:String,
  userName:String,
  emailId:String,
  password:String,
  vehicleModel:String,
  address:String,
  date:String
},"order")



app.post("/User/login", function (req, res) {
    const { emailId, password, userId } = req.body;
   
    

    User.findOne({ password:password,
      userId:userId,
      emailId:emailId,})
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found or incorrect password' });
        }
        console.log(user);
        res.status(200).json({ message: 'Login successful', user });
      })
      .catch((err) => {
        console.error("Error during login:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  

app.get("/User/signUp",function(req,res){

  User.find().then((retdata)=>{
    console.log(retdata)
    res.send(retdata)
})

})

app.get("/User/order/all/:userId", function(req, res) {
  User.find().then((retdata) => {
    console.log(retdata);
    res.send(retdata);
  }).catch((error) => {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  });
});


app.get("/User/GetOrders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    
    const orders = await Order.find({ userId }).select('desc price');
    
    if (orders.length > 0) {
      res.status(200).json(orders);
      console.log(orders);
    } else {
      res.status(404).json({ message: "No orders found for this user." });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



app.delete("/User/DeleteOrder/:userId", async (req, res) => {
  const { userId } = req.params;
  // const { emailId } = req.query; 

  try {
    const result = await Order.deleteOne({ userId });
    if (result.deletedCount > 0) {
      console.log("Order Deleted");
      res.status(200).json({ message: "Order successfully deleted." });
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.get("/User/booking/allUser", async function(req, res) {
  try {
    const retdata = await Order.find({});
    res.status(200).send(retdata);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
});



app.post("/User/booking",function(req,res){
  const {desc,price,password,userId,emailId,address,userName,vehicleModel,date}=req.body

  const newOrder=new Order({
    desc:desc,
    price:price,
    password:password,
    userId:userId,
    emailId:emailId,
    address:address,
    userName:userName,
    vehicleModel:vehicleModel,
    date:date
  })

  newOrder.save()
  .then(()=>{
    console.log("User created order successfully");
        res.status(201).json( 'User created order successfully');
  })
  .catch((err) => {
    console.error("Error ordering:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
})

app.post("/User/signUp", function(req, res) {
    const { userName, emailId, password, confirmPassword, phoneNumber } = req.body;
  
     const newUser = new User({
      userName: userName,
      emailId: emailId,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber
    });
  
    newUser.save()
      .then(() => {
        console.log("User created successfully");
        res.status(201).json( 'User created successfully');
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });





  //Mail Functionality

  app.post("/completed", async (req, res) => {
    const { emailId, subject, message } = req.body;
  
    try {
      
      if (!emailId) {
        return res.status(400).json({ error: "emailId is required" });
      }
  
      const user = await Order.findOne({ emailId }).select('emailId');
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      
      const dynamicEmail = user.emailId;
  
      const info = await Completed.sendMail({
        from: {
          name: 'Enter The Sender Name',
          address: "Enter the Senders E-mail here ",
        },
        to: dynamicEmail, 
        subject: subject || "Order Status", 
        text: message || "Your order is ready for delivery...", 
        html: "<b>Your order is ready for delivery</b>", 
      });
  
      console.log(`Email sent to ${dynamicEmail}`);
      console.log("Message sent: %s", info.messageId);
  
      res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });




app.post("/Pending", async (req, res) => {
  const { emailId, subject, message } = req.body;

  try {
    
    if (!emailId) {
      return res.status(400).json({ error: "emailId is required" });
    }

    const user = await Order.findOne({ emailId }).select('emailId');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    const dynamicEmail = user.emailId;

    const info = await Completed.sendMail({
      from: {
        name: 'Enter the Sender Name ',
        address: "Enter The Senders E-mail",
      },
      to: dynamicEmail, 
      subject: subject || "Order Status", 
      text: message || "Your order is ready for delivery...", 
      html: "<b>Your order is ready for delivery</b>", 
    });

    console.log(`Email sent to ${dynamicEmail}`);
    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Failed to send email' });
    }
  });

app.listen(3001,function(){
    console.log("server is running on port 3001")
})
