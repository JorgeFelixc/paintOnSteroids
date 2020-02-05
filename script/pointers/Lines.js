function BresenhamPencil(x1,y1,x2,y2){ 
    let dx = Math.abs(x2-x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while(true){ 
        DrawPoint(x1,y1);
        if((x1 === x2) && (y1 === y2)){ 
            break;
        }
        let e2 = 2*err;
        if(e2 > -dy){ 
            err -= dy;
            x1 += sx;
        }
        if(e2 < dx){
            err += dx;
            y1 += sy;
        }
    }
}

function NormalLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

function basico(x1,y1,x2,y2) {

    let dx = x2 - x1;
    let dy = y2 - y1;

    let m = dy / dx;
    if (dx === 0) {
        m = 0;
    }

    let b = y1 - m * x1;
    let y = y1;
    let x = x1;
    let step, limit;
    DrawPoint(x, y);
    
    if (Math.abs(dx) > Math.abs(dy)) {
        step = dx < 0 ? -1 : 1;
        limit = x2 + step;

        for (x += step; x !== limit; x += step) {
            y = Math.round((m * x) + b);
            DrawPoint(x, y);
        }
    } else {
        step = dy < 0 ? -1 : 1;
        limit = y2 + step;

        for (y += step; y !== limit; y += step) {
            x = Math.round((y - b) / m);
            DrawPoint(x, y);
        }
    }
}

function dda(x1,y1,x2,y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);

    let p = 0;
    let xi = 0;
    let yi = 0;
    let k = 0;

    if (dx > dy) {
        p = dx;
    }
    else {
        p = dy;
    }
    xi = dx / p;
    yi = dy / p;

    if (x1 > x2) {
        xi *= (-1);
    }

    if (y1 > y2) {
        yi *= (-1);
    }
    let x = x1;
    let y = y1;

    DrawPoint(x, y);
    for (k = 1; k <= p; k++) {
        x += xi;
        y += yi;

        DrawPoint(Math.round(x), Math.round(y));
    }
}

function rectangulo(x1,y1,x2,y2){ 
    dda(x1, y1, x2,y1);
    dda(x1,y1, x1,y2);
    dda(x2,y1, x2,y2);
    dda(x1,y2, x2,y2);
}

function triangulo(x1,y1,x2,y2){ 
    dda(x2,y2, x1,y2);
    const middle= x1 + ((x2 - x1)/2);
    dda(x2,y2, middle, y1);
    dda(x1,y2, middle, y1);
}

function selection(x1,y1,x2,y2){ 
    console.log("voy a pintar?");
    ctx.save();

    ctx.fillStyle = "#FFFFFF";
    
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.rect(x1,y1,8,8);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();


    ctx.moveTo(x2,y1);
    ctx.rect(x2-8,y1,8,8);
    ctx.fill();
    ctx.stroke();

    ctx.moveTo(x1,y2);
    ctx.rect(x1,y2-8,8,8);
    ctx.fill();
    ctx.stroke();


    ctx.moveTo(x2,y2);
    ctx.rect(x2-8,y2-8,8,8);
    ctx.fill();
    ctx.stroke();




    ctx.closePath();
    ctx.restore();

    // ctx.beginPath();
    // ctx.moveTo(x1,y1);
    // ctx.lineTo(x2,y2);
    // ctx.stroke();
    // ctx.closePath();
    // rectangulo(x1,y1,
}

function circleFeo(x1,y1,x2,y2){
    let xpos =  x1 + ((x2 - x1)/2);
    let ypos =  y1 + ((y2 - y1)/2);
    let r = x2 -x1;

    for(var i=0;i<360;i+=2){
        let x = xpos + r * Math.cos(i);
        let y = ypos + r * Math.sin(i);
        let xdos = xpos + r * Math.cos(i+1);
        let ydos = ypos + r * Math.sin(i+1);

        dda(x,y,xdos, ydos);
    }
}

function circle(x1,y1,x2,y2){ 
    let xpos =  x1 + ((x2 - x1)/2);
    let ypos =  y1 + ((y2 - y1)/2);
    // DrawPoint(xpos,ypos);
    let ry = (x2 -x1)/2;
    let rx = (y2 -y1)/2;
    let r;
    if(rx < ry){ 
        r = rx;
    }else{
        r = ry;
    }
    
    for(var i=0;i<360;i++){
        let x = xpos + r * Math.cos(i * Math.PI / 180);
        let y = ypos + r * Math.sin(i * Math.PI / 180);
        let xdos = xpos + r * Math.cos((i+1) * Math.PI / 180);
        let ydos = ypos + r * Math.sin((i+1) * Math.PI / 180);

        dda(x,y, xdos,ydos);
        // DrawPoint(xdos,ydos);
    }


}

function ellipse(x1,y1,x2,y2){
    
}

function Lapiz(x1,y2){
    dda(xold,yold,x1,y2);
}