class Point {
constructor (x, y, userData ){
    this.x = x;
    this.y = y;
    this.userData = userData;
        }
    }
    
    class Rectangle {
    constructor (x, y, w, h) {
    this.x = x; // center
    this.y = y;
    this.w = w; // half width
    this.h = h; // half height
        }
    
    // verifica si este objeto contiene un objeto Punto
    contains ( point ){
    
        }
    
    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects ( range ){
    
        }
    }


    class QuadTree {
   constructor ( boundary , n){
    this.boundary = boundary; // Rectangle
    this.capacity = n; // capacidad maxima de cada cuadrante
    this.points = []; // vector , almacena los puntos a almacenar
    this.divided = false;
    }
    
    // divide el quadtree en 4 quadtrees
    subdivide () {
    // Algoritmo
    // 1: Crear 4 hijos: qt_northeast , qt_northwest , qt_southeast ,
        
        qt_southwest

        // 2: Asignar los QuadTree creados a cada hijo
// this.northeast = qt_northeast;
// this.northwest = qt_northwest;
// this.southeast = qt_southeast;
// this.southwest = qt_southwest;

// 3.- Hacer: this.divided <- true
}

insert ( point ){
// Algoritmo
// 1: Si el punto no esta en los limites ( boundary ) del quadtree Return

// 2: Si ( this.points.length ) < ( this.capacity ),
// 2.1 Insertamos en el vector this.points
// Sino
// 2.2 Dividimos si aun no ha sido dividido
// 2.3 Insertamos recursivamente en los 4 hijos.
// this.northeast.insert ( point );
// this.northwest.insert ( point );
// this.southeast.insert ( point );
// this.southwest.insert ( point );
36
37 }
38
39 show () {
40 stroke (255) ;
41 strokeWeight (1) ;
42 noFill () ;
43 rectMode ( CENTER );
44 rect ( this.boundary.x , this.boundary.y , this.boundary.w *2 , this.boundary.h

*2) ;
45 if( this.divided ) {
46 this.northeast.show () ;
47 this.northwest.show () ;
48 this.southeast.show () ;
49 this.southwest.show () ;
50 }
51
52 for (let p of this.points ){
53 strokeWeight (4) ;
54 point (p.x , p.y );
55 }
56 }
57 }