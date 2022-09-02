var easycam;
let qt;
let count = 0;

function setup () {
    createCanvas(windowWidth, windowHeight, WEBGL);
    easycam = createEasyCam();
    background(220);
    
    let boundary = new Cuboid (400, 400, 400, 400, 400, 400);
    qt = new OcTree (boundary , 1);
    
    console.log (qt);
    // for (let i=0; i < 3; i ++) {
    //     let p = new Point (Math.random () * 799 , Math.random () * 799, Math.random () * 799);
    //     qt.insert (p);
    // }
    let p = new Point (0, 0, 0);
    qt.insert (p);
    let p2 = new Point (40, 40, 40);
    qt.insert (p2);
    let p3 = new Point (80, 80, 80);
    qt.insert (p3);
    // background (0);
    console.log(qt.points);
    qt.show ();
}

function draw(){
    background (220);
    qt.show ();
}

// function draw () {
//     background (0);
//     qt.show ();
    
//     stroke (0 ,255 ,0);
//     rectMode (CENTER);
//     let range = new Rectangle (mouseX, mouseY, 50, 50);
//     rect (range.x, range.y, range.w * 2, range.h * 2);
//     let points = [];
//     qt.query (range, points);
    
//     for (let p of points) {
//         strokeWeight (4);
//         point (p.x, p.y);
//     }
// }