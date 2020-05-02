const sql = require("mysql2/promise");

const pool = sql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "tasksDB",
    password: require("../settings").sql_password
});

module.exports.add_task = async function () {
    var wer = await pool.query("INSERT INTO tasks (table_id, whois,last_user, name,  description) VALUES (?,?,?,?,?)", [...arguments]);
    return wer;
};
module.exports.get_tasks = async function () {
    //name, desc, user_id
    var wer = await pool.query("SELECT * FROM tasks WHERE id in (?) AND position = (?)", [...arguments]);
    return wer;
};
module.exports.upd_task = async function () {
    var wer = await pool.query("UPDATE tasks SET position = (?), last_user = (?) WHERE id = (?)",[...arguments]);
    return wer;
};
module.exports.del_task = async function () {
    var wer = await pool.query("DELETE FROM tasks WHERE id = (?)",[...arguments]);
    return wer;
};

