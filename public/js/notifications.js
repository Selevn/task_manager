function invite_friend(whom, where)
{
    const request = new XMLHttpRequest();
    var url = "/invite_friend";
    var params = JSON.stringify({whom:whom, where:where});
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            alert(request.responseText);
            console.log(request.responseText);
        }
    });
    request.send(params);
}
function find_friend()
{
    const request = new XMLHttpRequest();
    let url = "/send_friend_request";
    var params = JSON.stringify({getter_name: $('#friend_name').val(), data: "Friend request"});
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            alert(request.responseText);
        }
    });
    request.send(params);
}

var notif_length = 0;
upd_notif();
setInterval(upd_notif, 5000);
show_friends();

function upd_notif()
{
    const request = new XMLHttpRequest();
    let url = "/get_notifications";
    var params = null;
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            try
            {
                console.log(request.responseText);
                var tmp = JSON.parse(request.responseText);

            }
            catch(e)
            {
                window.location.reload();
            }

            if(Number(tmp[0])!==notif_length)
                {
                    notif_length = Number(tmp[0]);
                    $('.notification-card').remove();
                    tmp[1].forEach(function(item)
                    {
                        $('.notifications-list').append('<div class="notification-card"><span class = "notif-text">'+item.data+' from </span><b>'+item.from+'</b><div class = "buttons d-none"><button class = "accept notif-button" onclick = "accept_notify(\''+item.data+'\',\''+item.from+'\')">Accept</button><button class = "decline notif-button" onclick = "decline_notify(\''+item.data+'\',\''+item.from+'\')">Decline</button></div></div>')
                    })
                }

        }
    });
    request.send(params);
}

function show_friends()
{
    const request = new XMLHttpRequest();
    let url = "/get_friend_list";
    var params = null;
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            var tmp = JSON.parse(request.responseText);


                $('.friend-card').remove();
                tmp.forEach(function(item)
                {
                    task_id = window.location.pathname.slice(1+window.location.pathname.lastIndexOf('/'));
                    if(window.location.pathname.indexOf('/desc/')!=-1)//если в доске
                    {
                        $('.friend-list').append('<div class="friend-card"><span style="font-size: 1.1rem; font-weight:bolder ;">'+item+'</span><div class = "buttons d-none"><button class = "accept notif-button" onclick = "invite_friend(\''+item+'\',\''+task_id+'\')">Invite</button><button class = "decline notif-button" onclick = "delete_friend(\''+item+'\')">Delete</button></div></div>') //TODO:deleting and inviting friends
                    }
                    else
                    {
                        $('.friend-list').append('<div class="friend-card"><span style="font-size: 1.1rem; font-weight:bolder ;">'+item+'</span><div class = "buttons d-none"><button class = "decline notif-button" onclick = "delete_friend(\''+item+'\')">Delete</button></div></div>') //TODO:deleting and inviting friends
                    }

                });

            console.log(JSON.parse(request.responseText));
        }
    });
    request.send(params);
}

function accept_notify(type, data)
{
    const request = new XMLHttpRequest();
    if(type === "Friend request")
    {
        var params = JSON.stringify({data:data});
        var url = "/accept_friend";
    }
    else
    {
        if(type.indexOf('Table invite request in table')!=-1)
        {
            type = type.slice('Table invite request in table '.length);
            var url = "/accept_desc";
            var params = JSON.stringify({table:type,user:data});
        }
    }

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
            location.reload();
        }
        upd_notif();
    });
    request.send(params);
}

function decline_notify(type, data)
{
    const request = new XMLHttpRequest();
    if(type === "Friend request")
    {
        var params = JSON.stringify({data:data});
        var url = "/decline_friend";
    }
    else
    {
        if(type.indexOf('Table invite request in table')!=-1)
        {
            type = type.slice('Table invite request in table '.length);
            var url = "/decline_desc";
            var params = JSON.stringify({table:type,user:data});
        }
    }
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
        }
        upd_notif();
    });
    request.send(params);
}
function delete_friend(friend_name)
{
    const request = new XMLHttpRequest();
    var params = JSON.stringify({friend_name:friend_name});
    var url = "/del_friend";

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
            location.reload();
        }
    });
    request.send(params);
}

$('body').on('click','.friend-card', function () {
    b = $( this ).children('.buttons');
    if(b.hasClass('d-none'))
        b.removeClass('d-none');
    else
        b.addClass('d-none');
});
$('body').on('click','.notification-card', function () {
    b = $( this ).children('.buttons');
    if(b.hasClass('d-none'))
        b.removeClass('d-none');
    else
        b.addClass('d-none');
});
