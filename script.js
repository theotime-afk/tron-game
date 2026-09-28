let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let start = document.getElementById("start");
start.disabled = true;

const motoj1 = new Image();
motoj1.src = "audi.png"; 

const motoj2 = new Image();
motoj2.src = "black_viper.png";

motoj1.onload = () => {
    motoj2.onload = () => {
        start.disabled = false;
    };
};






//fenetre config touches
$(function() {
    $("#configDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Fermer": function() {
                $(this).dialog("close");
            }
        }
    });

    
    $("#touche").on("click", function() {
        $("#configDialog").dialog("open");
    });


    $("input").on("focus", function() {
        let input = this;

        $(document).on("keydown.chooseKey", function(e) {
            input.value = e.key;
            $(document).off("keydown.chooseKey");
        });
    });
});



//joueur

var  player1 = {
    color: "red",
    x: 1,
    y: 28,
    direction: "",
    nextDirections: [],
    history: [],
    motoImage: motoj1,
    saut:true,

    touches: {
        up: "z",
        down: "w",
        left: "q",
        right: "d",
        jump:"s"
    }
};

var  player2 = {
    color: "orange",
    x: 1,
    y: 30,
    direction: "",
    nextDirections: [],
    history: [],
    motoImage:motoj2,
    saut:true,

    touches: {
        up: "o",
        down: ";",
        left: "k",
        right: "m",
        jump:"l"
    }
};



function dessinecarre(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*10,y*10,10,10);
}

function dessinetete(x,y,direction,motoImage){
    const centreX = x*10 + 5;
    const centreY = y*10 + 5;
    const size = 50;

   let angle = 0;
   if (direction === "up") angle = 0;
   if (direction === "down") angle = Math.PI;
   if (direction === "left") angle = -Math.PI/2;
   if (direction === "right") angle = Math.PI/2;


   ctx.save();
   ctx.translate(centreX,centreY);
   ctx.rotate(angle);
   ctx.drawImage(motoImage, -size/2, -size/2, size,size);
   ctx.restore();

}

function dessinejoueur(player){
    for (let i = 0; i < player.history.length - 1; i++) {
        let pos = player.history[i];
        dessinecarre(pos.x, pos.y, player.color);
    }

    let tete = player.history[player.history.length - 1];
    dessinetete(tete.x, tete.y, player.direction, player.motoImage);
}



function avancejoueur(player){

    if (player.direction === "right"){
        player.x +=1;
    }
     if (player.direction === "left"){
        player.x -=1;
    }
     if (player.direction === "up"){
        player.y -=1;
    }
     if (player.direction === "down"){
        player.y +=1;
    }


    player.history.push({ x: player.x, y: player.y });


}

document.addEventListener("keydown",function(a){
    gerertouches(a.key);
});

function gerertouches(key){

    if (key === player1.touches.up) player1.nextDirections.push("up");
    if (key === player1.touches.down) player1.nextDirections.push("down");
    if (key === player1.touches.left) player1.nextDirections.push("left");
    if (key === player1.touches.right) player1.nextDirections.push("right");
    if (key === player1.touches.jump) player1.saut = true;
    

    if (key === player2.touches.up) player2.nextDirections.push("up");
    if (key === player2.touches.down) player2.nextDirections.push("down");
    if (key === player2.touches.left) player2.nextDirections.push("left");
    if (key === player2.touches.right) player2.nextDirections.push("right");
    if (key === player2.touches.jump) player2.saut = true;
}

function directionOppo(dir1,dir2){
    if (dir1 === "left" && dir2 === "right") return true;
    if (dir1 === "right" && dir2 === "left") return true;
    if (dir1 === "up" && dir2 === "down") return true;
    if (dir1 === "down" && dir2 === "up") return true;


}

$("input").on("focus", function () {
    let input = this;

    $(document).on("keydown.chooseKey", function (e) {
        let key = e.key;
        input.value = key;

        // Mise à jour des touches du joueur 1
        if (input.id === "hautJ1")   player1.touches.up = key;
        if (input.id === "basJ1")    player1.touches.down = key;
        if (input.id === "gaucheJ1") player1.touches.left = key;
        if (input.id === "droiteJ1") player1.touches.right = key;
        if (input.id === "sautJ1")  player1.touches.saut = key;

        if (input.id === "hautJ2")   player2.touches.up = key;
        if (input.id === "basJ2")    player2.touches.down = key;
        if (input.id === "gaucheJ2") player2.touches.left = key;
        if (input.id === "droiteJ2") player2.touches.right = key;
        if (input.id ==="sautJ2") player2.touches.saut = key;

        $(document).off("keydown.chooseKey");
    });
});


function appliqueDirection(player){
    if (player.nextDirections.length > 0 ){
        let next = player.nextDirections.shift();

        if (!directionOppo(player.direction,next)){

            player.direction = next;
        }

    }
}

function collisionavecMur(player){
    if (player.x < 0) return true;
    if (player.x > 79) return true;
    if (player.y < 0) return true;
    if (player.y > 58) return true;
}

function collisionavecJoeur(player, playerbis){
    for (let pos of player.history.slice(0,-1)){
        if (player.x === pos.x && player.y === pos.y){
            return true;
        }
    }
    for (let pos of playerbis.history){
        if (player.x === pos.x && player.y === pos.y){
            return true;
        }
    }
    return false;
}

function verifCollision(player,playerbis){
    if (collisionavecMur(player)){
        return true;
    }

    if(player.saut === true){
        return false;
    }

    if (collisionavecJoeur(player,playerbis)){
        return true;
    }

    
}




let boucle = null;

function startjeu(){

    if(boucle !==null){
        clearInterval(boucle);
    }
   
    player1.x = 1;
    player1.y = 28;
    player1.direction = "right";
    player1.history = [{ x: player1.x, y: player1.y }];
    player1.nextDirections = [];


    player2.x = 1;
    player2.y = 30;
    player2.direction = "right";
    player2.history = [{ x: player2.x, y: player2.y }];
    player2.nextDirections = [];


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatecanva();


    boucle = setInterval(bouclejeu, 100);
}


start.addEventListener("click",startjeu);

start.addEventListener("click",() =>{
    start.disabled = true;
});







function updatecanva(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dessinejoueur(player1);
    dessinejoueur(player2);

}

let scoreJ1 = document.getElementById("scoreJ1");
let scoreJ2 = document.getElementById("scoreJ2");

let player_1score = 0;
let player_2score = 0;


function bouclejeu(){

    

    appliqueDirection(player1);
    appliqueDirection(player2);
    

    avancejoueur(player1);
    avancejoueur(player2);

    let player1Perdu = verifCollision(player1,player2);
    let player2Perdu = verifCollision(player2,player1);
   
    


    if (player1Perdu || player2Perdu){
        clearInterval(boucle);
        boucle =null;

        if(player1Perdu && player2Perdu){
          alert("egalité Les deux joeurs ont perdu");
        
        }
        else if (player1Perdu){
          player_2score +=1;

        }
        else{
           player_1score += 1;
        
        }

        scoreJ1.textContent = "Score J1 =" + player_1score;
        scoreJ2.textContent = "Score J2 =" + player_2score;


        if(player_1score === 3){
            alert("joueur 1 à gagner");
            start.disabled = false;
            return;
        }
        if(player_2score === 3 ){
            alert("joueur 2 a gagner");
            start.disabled = false;
            return;
        }
        startjeu();
        return;
        
    }

    updatecanva();
    scoreJ1.textContent = "Score Joueur 1 :" + player_1score;
    scoreJ2.textContent = "Score Joueur 2 :" + player_2score;

    player1.saut = false;
    player2.saut = false;

}


//test
//player1.history.push({x: player1.x, y: player1.y});
//player2.history.push({x: player2.x, y: player2.y});

//dessinejoueur(player1);
//dessinejoueur(player2);


