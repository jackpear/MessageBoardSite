// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.
var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "127.0.0.1",// this will work
  user: "C4131F23U169",
  database: "C4131F23U169",
  password: "28611", // we really shouldn't be saving this here long-term -- and I probably shouldn't be sharing it with you...
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function addContact(data){
    // you CAN change the parameters for this function. please do not change the parameters for any other function in this file.
  return connPool.awaitQuery(`insert into contact (name, email, date, resident,tour) VALUES (?,?,?,?,?);`,[data.name,data.email,data.date,(data.resident)? 1:0,data.tour])
    
}

async function deleteContact(id){
  const result = await connPool.awaitQuery("delete from contact where id=?;",[id])
  if (result.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
}

async function getContacts() {
  return await connPool.awaitQuery("select * from contact;")
}

async function addSale(message) {
    return await connPool.awaitQuery(`insert into sales (message, startTime, endTime) VALUES (?, CURRENT_TIMESTAMP , NULL);`, [message])
}

async function endSale() {
  return await connPool.awaitQuery("update sales set endTime=CURRENT_TIMESTAMP where endTime is NULL")
}

async function getRecentSales() {
  return await connPool.awaitQuery("select * from sales order by startTime desc limit 3;")
}

module.exports = {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales}