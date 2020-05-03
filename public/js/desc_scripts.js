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
        location.reload();
    },500);
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
                }
            });
            request.send(params);
        } }
}

function del_desc() {
    if(confirm("Are you shure want to delete this desc? All users will lost for tasks inside."))
    {
        var table_id;
        table_id = document.location.pathname.replace('/desc/','');
        const request = new XMLHttpRequest();
        const url = "/del_desc";
        var params = JSON.stringify({table_id: table_id});
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                window.history.back();
            }
        });
        request.send(params);
    }
}