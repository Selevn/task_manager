function  save(q) {
    setTimeout(()=>{
        var q_p;
        switch(q.parentNode.id)
        {
            case 'plans':
            {
                q_p = 0;
            }
                break;
            case 'doing':
            {
                q_p = 1;
            }
                break;
            case 'done':
            {
                q_p = 2;
            }
                break;
        }
        const request = new XMLHttpRequest();
        const url = "/upd_task";
        var params = JSON.stringify({task_id: q.id, position: q_p});
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        });
        request.send(params);
        //location.reload();
    },50);
}
function add_task() {

    var description, name, table_id;
    name = prompt("Введите название: ");
    if (name != null){
        description = prompt("Ввседите описание: ");
        table_id = document.location.pathname.replace('/desc/','');
        if (description != null) {
            const request = new XMLHttpRequest();
            const url = "/add_task";
            var params = JSON.stringify({table_id: table_id, name: name, description: description});
            request.open("POST", url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("readystatechange", () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    location.reload();
                }
            });
            request.send(params);
        } }
}
function user_up()
{
    user_chng(...arguments,1)
}
function user_dwn()
{
    user_chng(...arguments,-1)
}
function user_chng(username, what_to_do) {
    let table_id = document.location.pathname.replace('/desc/','');
    const request = new XMLHttpRequest();
            const url = "/ch_person_rules";
            var params = JSON.stringify({table_id: table_id, username: username, what_to_do: what_to_do});
            request.open("POST", url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("readystatechange", () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    //location.reload();
                    show_users()
                }
            });
            request.send(params);
}
function user_kick(username) {
    if(confirm("Are you really want to kick user "+username+" from desc?"))
    {
        let table_id = document.location.pathname.replace('/desc/','');
        const request = new XMLHttpRequest();
        const url = "/kick_person";
        var params = JSON.stringify({table_id: table_id, username: username});
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                //location.reload();
                show_users()
            }
        });
        request.send(params);
    }
}

function show_users()
{
    let table_id = document.location.pathname.replace('/desc/','');
    const request = new XMLHttpRequest();
    const url = "/get_table_users";
    var params = JSON.stringify({table_id: table_id});
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
            $('.desc_user').remove();
            $('.desc_user_hr').remove();
            let data = JSON.parse(request.responseText);
            let this_user = data[0];
            data = data[1];
            data.sort((i1,i2)=>{return(i1.role>i2.role)?-1:1;});

            let this_person_rank;
            data.forEach((item)=>
            {
                if(item.username == this_user)
                {
                    this_person_rank = item.role;
                }
            });
            data.forEach((item)=>
            {
                let role;
                let buttnstr;
                if (this_person_rank>item.role && this_user!=item.username)
                {
                    let add_priv;
                    if(item.role!=2)
                        add_priv= '<button class = "btn btn-success up_user user_work_but" onclick="user_up(\''+item.username+'\')">Add privilegies</button>'
                    else
                        add_priv = '';
                    let rm_priv;
                    if(item.role!=1)
                        rm_priv= '<button class = "btn btn-warning dwn_user user_work_but" onclick="user_dwn(\''+item.username+'\')">Remove privilegies</button>'
                    else
                        rm_priv = '';




                    buttnstr = '<div class = "user_options">\n' +
                        '                                    '+add_priv+rm_priv+'<button class = "btn btn-danger kick_user user_work_but" onclick="user_kick(\''+item.username+'\')">Kick user</button>\n' +
                        '                                </div>';

                }
                else
                    buttnstr= '';
                switch(item.role)
                {
                    case 1:
                        role = "User";
                        break;
                    case 2:
                        role = "Admin";
                        break;
                    case 3:
                        role = "Creator";
                        break;
                }

                let str = '<div class = "desc_user">\n' +
                    '                                <span class = "desc_user_username">'+item.username+'</span><span class = "desc_user_role">'+role+'</span>';

                let end_str = '</div><hr class="desc_user_hr">';
                console.log("item")
                console.log(item)
                $('.modal-body').append(str+buttnstr+end_str);
            });

        }
    });

    request.send(params);
    //modal-body
}