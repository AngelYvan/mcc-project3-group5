var easycam;
let qt;
let count = 0;
let cuboidX = document.getElementById("cuboidX").value;
let cuboidY = document.getElementById("cuboidY").value;
let cuboidZ = document.getElementById("cuboidZ").value;

function insertPoint(octree){
    let pointX = document.getElementById("pointX").value;
    let pointY = document.getElementById("pointY").value;
    let pointZ = document.getElementById("pointZ").value;
    let p = new Point (pointX , pointY, pointZ);
    octree.insert (p);
}

function findPoints(){
    cuboidX = document.getElementById("cuboidX").value;
    cuboidY = document.getElementById("cuboidY").value;
    cuboidZ = document.getElementById("cuboidZ").value;
    let range = new Cuboid(cuboidX, cuboidY, cuboidZ, 400, 400, 400);
    let points = qt.query(range);
    document.getElementById("result").innerHTML = points.length
}

function setup () {
    createCanvas(windowWidth, windowHeight, WEBGL);
    easycam = createEasyCam();
    background(220);
    
    let boundary = new Cuboid (400, 400, 400, 400, 400, 400);
    qt = new OcTree (boundary , 1);

    for (let i=0; i < 10; i ++) {
        let p = new Point (Math.random () * 799 , Math.random () * 799, Math.random () * 799);
        qt.insert (p);
    }
    qt.show ();
}

function draw(){
    background (220);
    qt.show ();
    push();
    noFill();
    stroke(0,250,0);
    strokeWeight(4);
    translate(cuboidX , cuboidY, cuboidZ);
    let boxSize = 800;
    box(boxSize);
    pop();
}
