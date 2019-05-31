
let getToken = () => {

    let url = "https://api.themoviedb.org/4/auth/request_token";
    let options = {
        method: "POST",
        headers: {
            authorization: "Bearer " + $("#tmdb_read_access_token").val()
        }
    };
    $.ajax(url, options).then((body) => {

        let request_token = body.request_token;
        $("#tmdb_request_token").val(request_token);
        $("#tmdb_auth_url").val("https://www.themoviedb.org/auth/access?request_token=" + request_token)

    }).catch((err) => {
        $("#tmdb_auth_url").val(JSON.stringify(err));
    });
};

let goAuth = () => {

    window.open($("#tmdb_auth_url").val(),"_blank");

};


let getAuth = () => {
    let url = "https://api.themoviedb.org/4/auth/access_token";
    let options = {
        method:"POST",
        headers : {
            authorization: "Bearer " + $("#tmdb_read_access_token").val()
        },
        data:{
            request_token: $("#tmdb_request_token").val()
        }
    };
    $.ajax(url,options).then((body) => {
        $("#account_id").val(body.account_id);
    }).catch((err)=> {
        $("#account_id").val(err);
    });
};

$(function() {

    $("#btn_get_req_token")
        .button()
        .click(getToken);
    $("#btn_start_auth")
        .button()
        .click(goAuth);
    $("#btn_get_auth")
        .button()
        .click(getAuth);

});
