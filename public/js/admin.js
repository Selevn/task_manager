$( "#trash_box" ).droppable({
    hoverClass: "active",
    drop: function( event, ui ) {
        var id = ui.draggable['0'].id;
        var table_id = document.location.pathname.replace('/desc/','');

        const request = new XMLHttpRequest();
        const url = "/delete_task";
        var params = JSON.stringify({table_id: table_id, id: id});
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
});

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