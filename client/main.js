const baseUrl = 'http://localhost:3000' // 

$(document).ready( _=> {
    $("#message").click( _=> {
      $(this).hide();
    });    
    auth('Welcome back!')
});

function auth(message) {
    if (localStorage.access_token) {
        $('#message').empty()
        $('#loginPage').hide()
        $('#registerPage').hide()
        $('#mainPage').show()
        $('#btnLogout').show()
    } else {
        showLogin()
        $("#message").append(message)
    }
}

function showLogin() {
    $('#message').empty()
    $('#loginPage').show()
    $('#registerPage').hide()
    $('#mainPage').hide()
    $('#btnLogout').hide()
}

function showRegister() {
    $('#registerPage').show()
    $('#loginPage').hide()
    $('#mainPage').hide()
    $('#btnLogout').hide()
}

function logout() {
    signOut()
    localStorage.removeItem('access_token');
    auth()
}

function login(event) {
    event.preventDefault();
    $.ajax({
        method: 'post',
        url: baseUrl + '/login',
        data: {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        }
    })
    .done( token => {
        const { access_token } = token
        localStorage.setItem('access_token', access_token)
        auth()
    })
    .fail(err => {
        console.log(err);
    })
    .always( _=> {
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
    })
}

function register(event) {
    event.preventDefault();    
    $.ajax({
        method: 'post',
        url: baseUrl + '/register',
        data: {
            email: $('#emailRegister').val(),
            password: $('#passwordRegister').val()
        }
    })
    .done( _=> {
        auth(`Registration succesful. Please login with your new account.`)
    })
    .fail(err => {
        console.log(err);
    })
    .always( _=> {
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url: baseUrl + '/googleSignIn',
        data: { token: id_token },
        success: function(response){
            localStorage.setItem('access_token', response.access_token);
            auth()
        },
        error: _=> {
            console.log('Google login is unavailable at the moment')
            signOut()
        }
    })    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( _=> console.log('User signed out.') );
    localStorage.removeItem('access_token');
}
