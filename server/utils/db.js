import mysql2 from 'mysql2' 
const con=mysql2.createConnection({
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