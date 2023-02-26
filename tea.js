status = "";
objects = [];
img = "tea.jpg";

function preload(){
    img = loadImage(img);
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.position(350, 200);

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0, 0, 640, 420);
    
    if(status != ""){
        for(i = 0; i<objects.length; i++){
            fill("#0095ff");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#0095ff");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    document.getElementById("status").innerHTML = "There are " + objects.length + " objects in this image"
    
}