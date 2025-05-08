import mysql from 'mysql' 
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reparili"

})

con.connect(function(err){
    if(err){console.log("database connection error ")}
    else{console.log("connected")}
})

export default con;