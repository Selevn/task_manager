
get_tasks();
function leave_desc(desc)
{
    if(confirm("Are you shure want to leave this desc?"))
    {
        const request = new XMLHttpRequest();
        var params = JSON.stringify({desc:desc});
        var url = "/leave_desc";

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                get_tasks();
            }
        });
        request.send(params);
    }
}

function get_tasks()
{
    const request = new XMLHttpRequest();
    var url = "/get_desks_home_page";

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let ans = JSON.parse(request.responseText);


            $('.desc_card').remove();

            ans.forEach(function(item)
            {

                $('.decks_list').append('<div class="card desc_card w-100">\n' +
                    '                    <div class="card-body">\n' +
                    '                        <h5 class="card-title">'+item.name+'</h5>\n' +
                    '                        <p class="card-text">'+item.description+'</p>\n' +
                    '                        <a href="/desc/'+item.id+'" class="btn btn-primary">Go!</a>\n' +
                    '                        <a style="color:#fff" onclick = "leave_desc('+item.id+')" class="btn btn-danger">Leave this desc</a>\n' +
                    '                    </div>\n' +
                    '                </div>') //TODO:deleting and inviting friends


            });
        }
    });
    request.send();
}

function add_desc()
{
    var description, name;
    name = prompt("Ввседите имя: ");
    if (name != null) {
        description = prompt("Ввседите описание: ");
        if(description != null) {
            // Создаем экземпляр класса XMLHttpRequest
            const request = new XMLHttpRequest();
            // Указываем путь до файла на сервере, который будет обрабатывать наш запрос
            const url = "/add_desc";
            // Так же как и в GET составляем строку с данными, но уже без пути к файлу
            // const params = "name=" + name+ "&description=" + description;
            var params = JSON.stringify({name: name, description: description});
            request.open("POST", url, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("readystatechange", () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    get_tasks()
                }
            });
            request.send(params);
            console.log(name);

        }
    }
}



