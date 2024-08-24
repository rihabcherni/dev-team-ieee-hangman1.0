/**                button control game               **/
function playPauseGame(){
    var icon= document.getElementById("play-pause");  
    icon.setAttribute('data-play', icon.dataset.play==="true"? "false":"true");      
    if (icon.dataset.play== "false") {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause"); 
    }else {
       icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
}
function RestartGame(){
    document.getElementById("b1").disabled = false;
    document.getElementById("b2").disabled = false;
    document.getElementById("b3").disabled = false;      
    var type=document.getElementById("game-type").textContent;
    playPauseGame()
    startGame(type);
}
function RestartGamAfterLose(){
    document.getElementById("message").innerHTML="";
    document.getElementById("result-lose").style.display="none";
    RestartGame();
}
function leaveGame(){
    playPauseGame();
    document.getElementById("close-window").style.display="block";
}
function leaveGameAfterLoseWin(){ window.location.reload();}
function nextLevel(){
    var level =document.getElementById("level-nbr");  
    var curLevel = eval(level.textContent);  
    var newLevel =level.innerHTML=curLevel +1; 
    document.getElementById("result-win").style.display="none"; 
    level.innerHTML=newLevel;   
    document.getElementById("level").style.display="block"; 
    RestartGame(); 
    setTimeout(function(){
        document.getElementById("level").style.display="none";
    },2500) 
}

/*       Help         */
function openHelp(){
    document.getElementById("help").style.display ="block";
}
function closeHelp(){
    document.getElementById("help").style.display ="none";
}
/*       Rating         */
function openRating(){
    document.getElementById("rating").style.display ="block";
}
function closeRating(){
    document.getElementById("rating").style.display ="none";
}
/*       About-us         */
function openAboutUs(){
    document.getElementById("about-us").style.display ="block";
}
function closeAboutUs(){
    document.getElementById("about-us").style.display ="none";
}
/*       Login         */ 
function openLogin(){
    document.getElementById("login-window").style.display ="block";
}
function closeLogin(){
    var badge=document.getElementById("badge-icon");
    if(badge.style.display==="none"){
        badge.style.display ="block";
    }
    document.getElementById("login-window").style.display ="none";
}
/*       close window leave game         */ 
function closeLeaveWindow(){
    document.getElementById("close-window").style.display ="none";
}
function confirmLeaveWindow(){
    window.location.reload();
}

function startMusic(){
    var audio= document.getElementById('audio');
    var icon= document.getElementById("music");          
    if (audio.muted == false) {
        audio.muted = true;
        icon.classList.remove("fa-volume-up");
        icon.classList.add("fa-volume-off"); 
    }else {
        audio.muted = false;
        audio.play();
        icon.classList.remove("fa-volume-off");
        icon.classList.add("fa-volume-up");
    }
}
/*                         Rating                      */
const stars = document.querySelectorAll(".stars a");

stars.forEach((clickedStar, clickedIndex) => {
  clickedStar.addEventListener("click", () => {
    stars.forEach((star, starIndex) => {
      if (starIndex <= clickedIndex) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  });
});


var pages = document.getElementsByClassName('page');
for(var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (i % 2 === 0){
        page.style.zIndex = (pages.length - i);
    }
}
document.addEventListener('DOMContentLoaded', function(){
    for(var i = 0; i < pages.length; i++){
        pages[i].pageNum = i + 1;
        pages[i].onclick=function(){
            if (this.pageNum % 2 === 0){
                this.classList.remove('flipped');
                this.previousElementSibling.classList.remove('flipped');
            }else{
                this.classList.add('flipped');
                this.nextElementSibling.classList.add('flipped');
            }
        }
    }
})