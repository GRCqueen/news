const baseUrl = 'https://quiet-beach-13272.herokuapp.com' // 'http://localhost:3000' //
let checked = false

$(document).ready( _=> {
    $("#message").click( _=> {
      $(this).hide();
    });

    $('#oldNews').click(function() {
        checked = !checked
    });

    auth('Welcome back!')
});

function auth(message) {
    if (localStorage.access_token) {
        $('#message').empty()
        $('#loginPage').hide()
        $('#registerPage').hide()
        $('#mainPage').show()
        pieChart().show()
        dekontaminasi().show()
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

//vh / vw satuan %
function fetch(event) {
    event.preventDefault()
    let searchQuery = $('#search').val()
    let url = baseUrl + '/api/news/'+ searchQuery

    // CheckBox
    if (checked) url = baseUrl + '/api/old/' + searchQuery
    console.log(url)
    $.ajax({
        method:'GET',
        url: url,
        headers: {
            access_token: localStorage.access_token
        },
        success: function(response){
            console.log(response.results)
            $('#searchResults').empty()
            response.results.forEach(news => {
                $('#searchResults').append(
            `<div class="card" style="width: 18rem; margin: 3vh;">
                <img src="${news.urlToImage}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">${news.description}</p>
                  <a href="${news.url}" class="btn btn-primary" target="_blank">read now</a>
                </div>
              </div>`)
        })},
        error: err => {
            console.log(err.responseJSON.msg)
        }
    })
}
function dekontaminasi(){
    console.log('sesuatu')
    $.ajax({
        method: "GET",
        url: baseUrl+"/rayhan/news",
        headers: {
            access_token: localStorage.access_token
        },
        success: (response) => {
            console.log(response.covid_news)
            console.log('sesuatu succses')
            response.covid_news.forEach(e => {
                $("#covid-mark").append(`
                <a href="${e.url}">${e.title}</a>
                `)
                
            });
        },
        error: (err) => {
            console.log(err)
        }
    })
}


function pieChart(){
    let labels = []
    let data = []
    $.ajax({
        method: "GET",
        url: baseUrl+ '/Rayhan/statistic',
        headers: {
            access_token: localStorage.access_token
        },
        success: (response) => {
            console.log(response.contaminated_update.region)
            for(let i = 0; i < 5; i++) {
                labels.push(response.contaminated_update.regions[i].name)
                data.push(response.contaminated_update.regions[i].numbers.infected)
            }
            
            var ctxP = document.getElementById("pieChart").getContext('2d');
            var myPieChart = new Chart(ctxP, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        },
        error: (err) => {
            console.log(err)
        }
    })
    
}