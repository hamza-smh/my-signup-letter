const https = require('https');
const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static('public2'));
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
  )
);


app.get("/",function(request,response){
    response.sendFile(__dirname + "/sign-up.html");
})

app.post("/",function(req,res){
        // console.log("Hi");
        // response.send("Hello");
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
   // const pass  = req.body.pword;
    
    

        var data = {
            members:[
                {
                    email_address : email,
                    status: "subscribed",
                    merge_fields : {
                        FNAME: fname,
                        LNAME : lname
                    }
                }
            ]
        };

         jsonData = JSON.stringify(data);
  
        const url= 'https://us9.api.mailchimp.com/3.0/lists/3b87a27dd2';

        const options = {
            method : "POST",
            auth: "hamza1:b845b8969c3dda0d8ec7f9f31b286e4e-us97"
        }

        const request = https.request(url, options, function(response){

             if(response.statusCode === 200){
                res.sendFile(__dirname + "/failure.html")
                
             }
             else{
                 res.sendFile(__dirname + "/success.html")
            }


            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })

request.write(jsonData);
request.end();

    // response.on("data",function(data){
    //        const fname = JSON.parse(data);
    //        console.log("Name: "+fname+" " +lname+"\nEmail: " +email+"\nPassword: "+pass);
    // } 
    // )

    
} )

app.post("/failure",function(req,res){

    res.redirect("/");

});



// For Local deployment
// app.listen(3000,function(){
//     console.log("Server deployed at port # 3000" );
// })

//Global heroku deployment + local
app.listen(process.env.PORT || 3000,function(){
    console.log("Server deployed at port # 3000" );
})






 
// API KEY
// b845b8969c3dda0d8ec7f9f31b286e4e-us9

// Audience ID
// 3b87a27dd2.