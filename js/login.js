function updateAv(img) {
    var resPageLogin = document.getElementById("res-login")
    var resNav = document.getElementById("res-nav")    
    resPageLogin.src =img;
    resNav.src =img;
}
function Submitlogin(){
    var name= document.getElementById("name").value;  
    var email= document.getElementById("email").value;
    var loginName=document.getElementById("login-name");
    if (name){
        loginName.innerHTML = name;
    }
    else{
        loginName.innerHTML = "Anonymous";
    }
    document.getElementById("badge-icon").style.display ="block";
    document.getElementById("login-window");
    closeLogin();
}