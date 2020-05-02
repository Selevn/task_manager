module.exports.login_form = function (request,response) {
    response.render('login_form');
};
module.exports.register_form = function (request,response) {
    response.render('register_form');
};
module.exports.register_add = async function (request,response) {
    try {
        await require('../models/users').register_user(request.body.username, request.body.email, request.body.password, 0, 0);
        response.render('success', {data: "Register success"});
    }
    catch ( err )
    {
        console.log(err);
        response.render('fail', {data: "Register error"});
    }
};

module.exports.log_in_check = async function (request,response) {
    try {
        var q = await require('../models/users').check_user(request.body.email, request.body.password);
        if (q)
            response.render('success', {data: "Welcome "+q.name+'!'});
        else

        {
            var chars = '';
            for(i=0;i<request.body.password.length;i++)
                chars+='*';
            response.render('fail', {data: "No user with email: "+request.body.email+" and password "+chars});
        }

    }
    catch ( err )
    {
        console.log(err);
        response.render('fail', {data: "Register error"});
    }
};

module.exports.secret = function (request,response) {
    console.log(request.user.username);
   response.send('secret!');
};
