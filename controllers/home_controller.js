module.exports.home_page = async function (request,response) {
    var descs = {};
    try {
        var ans = JSON.parse(request.user.tasks_id);
        if(ans.length != 0)
        {
            let descs = await require('../models/descs').get_desc(ans);
            response.render('home', {username:request.user.username, desc:descs[0]}); //request.user.username
        }
        else
            response.render('home', {username:request.user.username});
    }
    catch(e)
    {
        console.log(e);
        response.redirect('/smth_went_wrong')//TODO:smth_went_wrong page
    }

};
module.exports.add_desc = async function (request,response) {
    console.log(request.user);
    const user = JSON.stringify([{id:request.user.id,isadm:true}]);
    try {
        let q = await require('../models/descs').add_desc(request.body.name, request.body.description, user);
        //console.log(q[0].insertId);
        await require('../models/users').add_tasks(request.user.id, q[0].insertId);
        //response.render('success', {data: "Adding success"});
    }
    catch ( err )
    {
        console.log(err);
        //response.render('fail', {data: "Register error"});
    }
    response.send("Added!"); //request.user.username
};
module.exports.leave_desc = async function (request,response) {
    try {
        await require('../models/descs').kick_user(request.user.username,request.body.desc);
    }
    catch ( err )
    {
        console.log(err);
    }
    response.send("You left the desc!"); //request.user.username
};

module.exports.add_task = async function (request,response) {
    const user = JSON.stringify(request.user.username);
    try {
        let q = await require('../models/tasks').add_task(request.body.table_id,request.user.username,request.user.username,request.body.name, request.body.description, user);
        console.log("q[0].insertId ");
        console.log(q[0].insertId);

        await require('../models/descs').add_task_in_desc(q[0].insertId, request.body.table_id);
        //response.render('success', {data: "Adding success"});
    }
    catch ( err )
    {
        console.log(err);
        //response.render('fail', {data: "Register error"});
    }
    response.send("Added!"); //request.user.username
};

module.exports.desc_page =  async function (request,response) {
    var check_user = await require('../models/descs').check_user(request.user.id, request.params['id']);
//<button id="add_desc" onclick="add_task()">Add</button>
    if (check_user)
    {
        var tasks = await require('../models/descs').get_desc_tasks(request.params['id']);
        tasks = JSON.parse(tasks[0][0].tasks);
        //get tasks
        tasks0 = await require('../models/tasks').get_tasks(tasks, 0);
        tasks1 = await require('../models/tasks').get_tasks(tasks, 1);
        tasks2 = await require('../models/tasks').get_tasks(tasks, 2);
        if(check_user === 'admin')
            response.render('desc', {admin_code:{},add_user:'1',username:request.user.username,task0:tasks0[0], task1:tasks1[0], task2:tasks2[0]});
        else
            response.render('desc', {username:request.user.username,task0:tasks0[0], task1:tasks1[0], task2:tasks2[0]});
    }
    else
    {
        response.render('fail', {data:"Permission Denied! You have no access for this desc!"});
    }
};
module.exports.upd_task =  async function (request,response) {

    try
    {
        await require('../models/tasks').upd_task(request.body.position, request.user.username,request.body.task_id);
        response.send("success");
    }
    catch (e) {
        response.send(e);
    }
};
module.exports.add_user_in_desc =  async function (request,response) {
    if(request.user.username) //simple auth check
    {
        try
        {
            var id = await require('../models/users').get_id_by_nick(request.body.username);//take id from post request
            if(id)
            {
                let temp = await require('../models/descs').add_user_in_desc(id,request.body.table_id);
                if (temp)
                    response.send("User successfully added!");
                else
                    response.send("Something went wrong! Please, try again later.");
            }
            else
                response.send("User "+request.body.username+" not found");
        }
        catch (e) {
            response.send(e);
        }
    }
};
module.exports.delete_task =  async function (request,response) {
    console.log('in_deleting_tak');
    if(request.user.username) //simple auth check
    {

        try {
            let task_id = request.body.id;
            let table_id = request.body.table_id;
            let res = await require('../models/tasks').del_task(task_id);
            if (res)
            {
                res = await require('../models/descs').get_desc_tasks(table_id);
                let tasks = JSON.parse(res[0][0].tasks);
                var index = tasks.indexOf(Number(task_id));
                if (index !== -1)
                {
                    tasks.splice(index, 1);
                }
                tasks = JSON.stringify(tasks);
                await require('../models/descs').upd_tasks_in_deck(tasks,table_id);
                await require('../models/descs').get_desc_tasks(table_id);
                response.send('done')
            }
            else
            {
                response.send("Deleting Error");
            }
        }

        catch (e) {
            console.log("get some err")
            console.log(e);
        }
    }
};

module.exports.add_notification = async function (request,response)
{
    var q;
    try
    {
        try
        {
            var friend_list = await require('../models/users').get_friend_list(request.body.getter_name);
        }
        catch(e)
        {
            console.log(e);
            q = "No person "+request.body.getter_name+" registered in system";
        }
        if (friend_list.indexOf(request.user.username)==-1)
        {
            q = await require('../models/notifications').send_notification(request.body.getter_name, request.user.username, request.body.data);
            q = "Request sended!";
        }

        else
            q = "You are friends yet!";
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};

module.exports.get_notifications = async function (request,response)
{
    var q;
    try
    {
        q = await require('../models/notifications').get_notifications(request.user.username);
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};
module.exports.get_friend_list = async function (request,response)
{
    var q;
    try
    {
        q = await require('../models/users').get_friend_list(request.user.username);
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};


module.exports.accept_friend = async function (request,response)
{
    var q;
    try
    {
        q = await require('../models/users').add_friend(request.user.username, request.body.data);

        q = await require('../models/notifications').del_friend_notif(request.user.username, request.body.data, "Friend request");
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};
module.exports.decline_friend = async function (request,response)
{
    var q;
    try
    {
        q = await require('../models/notifications').del_friend_notif(request.user.username, request.body.data, "Friend request");
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};
module.exports.invite_friend = async function (request,response)
{
    var q;
    try
    {
        let tasks_list = await require('../models/users').get_descs_by_name(request.body.whom);
        let task = await require('../models/descs').get_desc(request.body.where);
        tasks_list = JSON.parse(tasks_list);
        if (tasks_list.indexOf(task[0][0].id)==-1)
            q = await require('../models/notifications').invite_friend_notif(request.user.username, request.body.whom,request.body.where, "Table invite request");
        else
            q = "He is in desc yet!";

    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};

module.exports.accept_desc = async function (request,response)
{
    var q;
    try
    {
        let id = await require('../models/users').get_id_by_nick(request.user.username);
        let table_id = await require('../models/descs').get_desc_id_by_name(request.body.table);
        q = await require('../models/descs').add_user_in_desc(id.id, table_id);
        q = await require('../models/notifications').del_friend_notif(request.user.username, request.body.user, "Table invite request in table "+request.body.table);
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};
module.exports.decline_desc = async function (request,response)
{
    var q;
    try
    {
        q = await require('../models/notifications').del_friend_notif(request.user.username, request.body.user, "Table invite request in table "+request.body.table);
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};

module.exports.del_friend = async function (request,response)
{
    var from = request.user.username;
    var friend_name = request.body.friend_name;
    var q;
    try
    {
        q = await require('../models/users').del_friend(from,friend_name);
    }
    catch(e)
    {
        console.log(e);
    }
   response.send(q);

};

