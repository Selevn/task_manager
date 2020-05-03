const sql = require("mysql2/promise");

const pool = sql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "tasksDB",
    password: require("../settings").sql_password
});

module.exports.register_user = async function () {
 var wer = await pool.query("INSERT INTO users (username, email, password,activated, online) VALUES (?,?,?,?,?)", [...arguments]);
    return wer;
};
module.exports.get_descs = async function (id) {
 var wer = await pool.query("SELECT tasks_id FROM users WHERE id = ?", [id]);
    return wer[0][0].tasks_id;
};
module.exports.get_descs_by_name = async function () {
 var wer = await pool.query("SELECT tasks_id FROM users WHERE username = (?)", [...arguments]);
    return wer[0][0].tasks_id;
};

module.exports.check_user = async function (email, password) {
 const wer = await pool.query("SELECT * FROM users WHERE email = (?) AND password = (?)",[email, password]);
 if(wer[0][0])
    return wer[0][0];
 else
     return false;
};
module.exports.get_id_by_nick = async function (username) {
 const wer = await pool.query("SELECT id FROM users WHERE username = ?",[username]);
 if(wer[0][0]!=undefined)
    return wer[0][0];
 else
     return false;
};
module.exports.get_nick_by_id = async function (id) {
 const wer = await pool.query("SELECT username FROM users WHERE id = ?",[id]);
 if(wer[0][0]!=undefined)
    return wer[0][0].username;
 else
     return false;
};

module.exports.get_friend_list = async function () {
 const wer = await pool.query("SELECT friends FROM users WHERE username = (?)",[...arguments]);
 return wer[0][0].friends;
};

module.exports.add_friend = async function (first, second) {
 var wer = await pool.query("SELECT friends FROM users WHERE username = (?)",[first]);
 let tmp = JSON.parse(wer[0][0].friends);
 tmp.push(second);
 tmp = JSON.stringify(tmp);
 ans = await pool.query("UPDATE users SET friends = (?) WHERE username = (?)",[tmp,first]);

 wer = await pool.query("SELECT friends FROM users WHERE username = (?)",[second]);
tmp = JSON.parse(wer[0][0].friends);
tmp.push(first);
tmp = JSON.stringify(tmp);
ans = await pool.query("UPDATE users SET friends = (?) WHERE username = (?)",[tmp,second]);

};
module.exports.del_friend = async function (first, second) {
    console.log(first)
    console.log(second)
 var wer = await pool.query("SELECT friends FROM users WHERE username = (?)",[first]);
 let tmp = JSON.parse(wer[0][0].friends);
 //tmp = tmp.slice(1+tmp.indexOf(second),1);
 tmp.splice(tmp.indexOf(second),1);
 tmp = JSON.stringify(tmp);
 ans = await pool.query("UPDATE users SET friends = (?) WHERE username = (?)",[tmp,first]);

wer = await pool.query("SELECT friends FROM users WHERE username = (?)",[second]);
tmp = JSON.parse(wer[0][0].friends);
tmp.splice(tmp.indexOf(first),1);
tmp = JSON.stringify(tmp);
ans = await pool.query("UPDATE users SET friends = (?) WHERE username = (?)",[tmp,second]);

};

module.exports.add_tasks = async function (user_id, task_id) {

    if(typeof(user_id)===typeof({}) && user_id.hasOwnProperty('id'))
        user_id=user_id.id;

 const wer = await pool.query("SELECT tasks_id FROM users WHERE id = (?)",[user_id]);

 if(wer[0][0].hasOwnProperty('tasks_id'))
 {
     var base_tasks = JSON.parse(wer[0][0].tasks_id);

     if (base_tasks === null)
     {
         base_tasks = [];
         base_tasks.push(Number(task_id))
     }
     else
     {
         console.log('type base_tasks = '+typeof(base_tasks));
         base_tasks.push(Number(task_id));
     }
     ans = await pool.query("UPDATE users SET tasks_id = (?) WHERE id = (?)",[JSON.stringify(base_tasks),user_id]);
 }
 else
 {
     console.log("Can not parse tasks_id from answer")
 }

 if(wer[0][0])
    return wer[0][0];
 else
     return false;
};

module.exports.upd_user_descs = async function(user, descs)
{
    try
    {
        await pool.query("UPDATE users SET tasks_id = (?) WHERE id = (?)",[descs,user]);
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }

}