const sql = require("mysql2/promise");

const pool = sql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "tasksDB",
    password: require("../settings").sql_password
});

module.exports.send_notification = async function (recipient, sender, data) {
    try
    {
        var nexts = true;
        var basic_notifications = await pool.query("SELECT notifications FROM users WHERE username = ?",[recipient]);
        if(basic_notifications[0][0])
        {
            basic_notifications[0][0].notifications = JSON.parse(basic_notifications[0][0].notifications);
            basic_notifications[0][0].notifications.forEach(function(item)
            {
                if(item['from']===sender)
                    nexts = false
            });
            if(nexts)
            {
                basic_notifications[0][0].notifications.push({from: sender, data: data});
                basic_notifications[0][0].notifications = JSON.stringify(basic_notifications[0][0].notifications);

                await pool.query("UPDATE users SET notifications = (?) WHERE username = (?)",[basic_notifications[0][0].notifications,recipient]);
                return "Request sended!";
            }
            else
                return "You have already send friend request!";
        }
        else return "User not found!";
    }
catch(e)    //await pool.query("UPDATE users SET  = (?) WHERE id = (?)",[JSON.stringify(base_tasks),user_id]);
{
    console.log(e);
    return "Smth went wrong! Try again later!";
}
};

module.exports.invite_friend_notif = async function (from, whom, where, data) {
    try
    {
        let nexts = true;


        var basic_notifications = await pool.query("SELECT notifications FROM users WHERE username = ?",[whom]);
        basic_notifications[0][0].notifications = JSON.parse(basic_notifications[0][0].notifications);
        let q = await require('../models/descs').get_desc(where);
        basic_notifications[0][0].notifications.forEach(function(item)
        {
            if(item['data']==data+' in table '+q[0][0].name)
                nexts = false
        });
        if(nexts)
        {
            basic_notifications[0][0].notifications.push({from: from, data: data+' in table '+q[0][0].name});
            basic_notifications[0][0].notifications = JSON.stringify(basic_notifications[0][0].notifications);

            await pool.query("UPDATE users SET notifications = (?) WHERE username = (?)",[basic_notifications[0][0].notifications,whom]);
            return "Request sended!";
        }
        else
        {
            return "You have already send invite request!";
        }
    }
catch(e)
{
    console.log(e);
    return "Smth went wrong! Try again later!";
}
};

module.exports.get_notifications = async function (person) {
    try
    {
        var basic_notifications = await pool.query("SELECT notifications FROM users WHERE username = ?",[person]);
        basic_notifications[0][0].notifications = JSON.parse(basic_notifications[0][0].notifications);
        return JSON.stringify([basic_notifications[0][0].notifications.length, basic_notifications[0][0].notifications]);
    }
catch(e)    //await pool.query("UPDATE users SET  = (?) WHERE id = (?)",[JSON.stringify(base_tasks),user_id]);
{
    console.log(e);
    return "Smth went wrong! Try again later!";
}
};

module.exports.del_friend_notif = async function (where, from, notif_type) {
    try
    {
        var basic_notifications = await pool.query("SELECT notifications FROM users WHERE username = ?",[where]);
        basic_notifications[0][0].notifications = JSON.parse(basic_notifications[0][0].notifications);
        var count = 0;
        basic_notifications[0][0].notifications.forEach(function(item)
        {
            if(item.from == from && item.data == notif_type)
                return;
            count++;
        });
        //console.log(basic_notifications[0][0].notifications);
        basic_notifications[0][0].notifications.splice(count,1);
        //console.log(basic_notifications[0][0].notifications);
        basic_notifications[0][0].notifications = JSON.stringify(basic_notifications[0][0].notifications);

        await pool.query("UPDATE users SET notifications = (?) WHERE username = (?)",[basic_notifications[0][0].notifications,where]);

    }
catch(e)    //await pool.query("UPDATE users SET  = (?) WHERE id = (?)",[JSON.stringify(base_tasks),user_id]);
{
    console.log(e);
    return "Smth went wrong! Try again later!";
}
};

