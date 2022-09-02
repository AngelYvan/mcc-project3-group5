class Point {
    constructor (x, y, z, userData ){
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
        return (point.x >= (this.x - this.w))
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
        
        // octant 1
        let oct1 = new Cuboid(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.z + (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant1 = new OcTree(oct1, this.capacity);

        // octant 2
        let oct2 = new Cuboid(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.z + (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant2 = new OcTree(oct2, this.capacity);

        // octant 3
        let oct3 = new Cuboid(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.z + (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant3 = new OcTree(oct3, this.capacity);

        // octant 4
        let oct4 = new Cuboid(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.z + (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant4 = new OcTree(oct4, this.capacity);

        // octant 5
        let oct5 = new Cuboid(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.z - (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant5 = new OcTree(oct5, this.capacity);

        // octant 6
        let oct6 = new Cuboid(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y + (this.boundary.h / 2)),
            (this.boundary.z - (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant6 = new OcTree(oct6, this.capacity);

        // octant 7
        let oct7 = new Cuboid(
            (this.boundary.x - (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.z - (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant7 = new OcTree(oct7, this.capacity);

        // octant 8
        let oct8 = new Cuboid(
            (this.boundary.x + (this.boundary.w / 2)),
            (this.boundary.y - (this.boundary.h / 2)),
            (this.boundary.z - (this.boundary.d / 2)),
            (this.boundary.w / 2),
            (this.boundary.h / 2),
            (this.boundary.d / 2)
        );
        this.octant8 = new OcTree(oct8, this.capacity);
        
        // prevent further dividing
        this.divided = true;
    }

    insert ( point ){
        console.log(point);
        console.log(this.boundary);
        console.log(!this.boundary.contains(point));
        if(!this.boundary.contains(point)) {
            return;
        }
        if(this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            console.log("Subdividiendo")
            this.subdivide();
            this.octant1.insert(point);
            this.octant2.insert(point);
            this.octant3.insert(point);
            this.octant4.insert(point);
            this.octant5.insert(point);
            this.octant6.insert(point);
            this.octant7.insert(point);
            this.octant8.insert(point);
        }
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
            this.octant1.query(range,found);
            this.octant2.query(range,found);
            this.octant3.query(range,found);
            this.octant4.query(range,found);
            this.octant5.query(range,found);
            this.octant6.query(range,found);
            this.octant7.query(range,found);
            this.octant8.query(range,found);
          } 
          return found;
        }
    }

    show () {
        push();
        noFill();
        stroke('black');
        strokeWeight(4);
        translate(this.boundary.x , this.boundary.y, this.boundary.z);
        let boxSize = 2 * this.boundary.w;
        box(boxSize);
        pop();
        if( this.divided ) {
            this.octant1.show ();
            this.octant2.show ();
            this.octant3.show ();
            this.octant4.show ();
            this.octant5.show ();
            this.octant6.show ();
            this.octant7.show ();
            this.octant8.show ();
        }
        // console.log(this.points);
        for (let p of this.points ){
            // strokeWeight (4) ;
            // stroke('blue');
            // point (p.x , p.y, p.z);
            push();
            stroke('red'); 
            translate(p.x , p.y, p.z);
            fill(p.x , p.y, p.z);
            sphere(3);
            pop();
        }
    }
}