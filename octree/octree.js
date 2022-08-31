class Point {
    constructor (x, y, userData ){
        this.x = x;
        this.y = y;
        this.z = z;
        this.userData = userData;
    }
}

class Cuboid {
    constructor (x, y, z, w, h, d) {
        this.x = x; // center
        this.y = y;
        this.z = z;
        this.w = w; // half width
        this.h = h; // half height
        this.d = d; // half depth
    }
    
    // verifica si este objeto contiene un objeto Punto
    contains ( point ){
        (point.x >= (this.x - this.w))
        && (point.x <  (this.x + this.w))
        && (point.y >= (this.y - this.h))
        && (point.y <  (this.y + this.h))
        && (point.z >= (this.z - this.d))
        && (point.z <  (this.z + this.d))
    }
    
    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects ( range ){
        return !(
            range.x - range.w > this.x + this.w
            || range.x + range.w < this.x - this.w
            || range.y - range.h > this.y + this.h
            || range.y + range.h < this.y - this.h
            || range.z - range.d > this.z + this.d
            || range.z + range.d < this.z - this.d
        );
    }
}

class OcTree {
    constructor ( boundary , n){
        this.boundary = boundary; // Cuboid
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
    }
    
    // divide el quadtree en 4 quadtrees
    subdivide () {
        if(this.divided) {
            return;
        }
        
        // nw
        let nw = new Rectangle(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2)
        );
        this.northwest = new QuadTree(nw, this.capacity);
        
        // ne
        let ne = new Rectangle(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2)
        );
        this.northeast = new QuadTree(ne, this.capacity);
        
        // sw
        let sw = new Rectangle(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2)
        );
        this.southwest = new QuadTree(sw, this.capacity);
        
        // se
        let se = new Rectangle(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2)
        );
        this.southeast = new QuadTree(se, this.capacity);
        
        // prevent further dividing
        this.divided = true;
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
    }

    query (range , found ){
        if(!found){
            found=[];
        }
        if(!this.boundary.intersects(range)){
            return found;
        }
        else{
          for(let point of this.points){
            if(range.contains(point)){
                found.push(point)
            }
          }
          if(this.divided){            
            this.northeast.query(range,found);
            this.northwest.query(range,found);
            this.southeast.query(range,found);
            this.southwest.query(range,found);
          } 
          return found;
        }
    }

    show () {
        stroke (255) ;
        strokeWeight (1) ;
        noFill () ;
        rectMode ( CENTER );
        rect ( this.boundary.x , this.boundary.y , this.boundary.w *2 , this.boundary.h *2) ;
        if( this.divided ) {
            this.northeast.show () ;
            this.northwest.show () ;
            this.southeast.show () ;
            this.southwest.show () ;
            }
        for (let p of this.points ){
            strokeWeight (4) ;
            point (p.x , p.y );
        }

    }
}