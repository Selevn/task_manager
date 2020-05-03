const sql = require("mysql2/promise");

const pool = sql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "tasksDB",
    password: require("../settings").sql_password
});

module.exports.add_desc = async function () {
    //name, desc, user_id
    var wer = await pool.query("INSERT INTO descplace (name, description, users) VALUES (?,?,?)", [...arguments]);
    return wer;
};
module.exports.kick_user = (username, desc_id)=>kick(username, desc_id);

var kick = async function (username, desc_id) {
    let users_count=-1;
    try
    {
        let err_counter = true;
        var wer = await pool.query("SELECT users FROM descplace WHERE id = (?)", [desc_id]);
        let users = JSON.parse(wer[0][0].users);
        let user_id = parseInt(username);
        if(isNaN(user_id))
            {
                let res = await require('../models/users').get_id_by_nick(username);
                user_id = res.id;
            }

        let index = 0;
        users.forEach(function(item)
        {
            if(String(item.id) == user_id)
            {
                return;
            }
            index++;
        });

        users.splice(index-1,1);
        users_count = users.length;
        users = JSON.stringify(users);
        await pool.query("UPDATE descplace SET users = ? WHERE id = ?",[users,desc_id]);
        let user_descs = JSON.parse(await require('../models/users').get_descs(user_id));//user_id.id
        user_descs.splice(user_descs.indexOf(desc_id),1);
        user_descs = JSON.stringify(user_descs);
        err_counter &= await require('../models/users').upd_user_descs(user_id, user_descs);
        return users_count;
    }
    catch(e)
    {
        console.log(e);
        return users_count;
    }

};

module.exports.add_task_in_desc = async function (task_id, desc_id) {
    //name, desc, user_id
    //ans = await pool.query("UPDATE users SET tasks_id = (?) WHERE id = (?)",[JSON.stringify(base_tasks),user_id]);
    var answer = await pool.query("SELECT tasks FROM descplace WHERE id = (?)", [desc_id]);
    console.log("answer[0][0]");
    console.log(answer[0][0]);
    var work_ans = JSON.parse(answer[0][0].tasks)
    if(work_ans === null)
        work_ans = [];
    work_ans.push(task_id);

    ans = await pool.query("UPDATE descplace SET tasks = (?) WHERE id = (?)",[JSON.stringify(work_ans),desc_id]);
};
module.exports.upd_tasks_in_deck = async function (tasks, desc_id) {
    ans = await pool.query("UPDATE descplace SET tasks = (?) WHERE id = (?)",[tasks,desc_id]);
};

module.exports.get_desc = async function () {
    //name, desc, user_id
    var wer = await pool.query("SELECT id,name,description FROM descplace WHERE id in (?)", [...arguments]);
    return wer;
};
module.exports.get_desc_id_by_name = async function (name) {
    //name, desc, user_id
    var wer = await pool.query("SELECT id FROM descplace WHERE name in (?)", [...arguments]);
    return wer[0][0].id;
};

module.exports.get_desc_tasks = async function () {
    var wer = await pool.query("SELECT tasks FROM descplace WHERE id = (?)", [...arguments]);
    return wer;
};

module.exports.check_user = async function (user_id, table_id) {
    var users = await pool.query("SELECT users FROM descplace WHERE id = (?)", [table_id]);
    users = JSON.parse(users[0][0].users);
    var bool = false;
    users.forEach(function (item)
    {
        if(Number(item.id) == Number(user_id))
            {
                bool = true;
                if(item.isadm == true)
                {
                    bool = 'admin';
                }
            }
    });
    return bool;
};
module.exports.add_user_in_desc = async function (user_id, table_id) {
    var users = await pool.query("SELECT users FROM descplace WHERE id = (?)", [table_id]);
    users = JSON.parse(users[0][0].users);
    users.push({id:user_id,isadm:false});
    try
    {
        await pool.query("UPDATE descplace SET users = (?) WHERE id = (?)",[JSON.stringify(users),table_id]);
        await require("../models/users").add_tasks(user_id, table_id);
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
};

module.exports.del_desc = async function(desc_id)
{
    var users = await pool.query("SELECT users FROM descplace WHERE id = (?)", [desc_id]);
    users = JSON.parse(users[0][0].users);

    users.forEach(function(item)
    {
        kick(item.id,desc_id)
    });
    await pool.query("DELETE FROM descplace WHERE id = (?)", [desc_id]);
};
