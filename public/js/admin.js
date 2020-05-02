function add_user() {
var friend_name = prompt('Enter your friend`s username');
    if(friend_name!=null)
    {
        const request = new XMLHttpRequest();
        const url = "/add_user_in_desc";
        var table_id = document.location.pathname.replace('/desc/','');
        var params = JSON.stringify({table_id:table_id,username: friend_name});
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                alert(request.responseText);
            }
        });
        request.send(params);
    }
}

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
            }
        });
        request.send(params);

    }
});
