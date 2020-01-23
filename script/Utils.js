let TypeDraw = "Rect";
let WeigthDraw = 10;


function DrawPoint(x1,y1){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    if(TypeDraw === "Rect"){
        ctx.fillRect(x1-(WeigthDraw/2),y1-(WeigthDraw/2),WeigthDraw,WeigthDraw);
        ctx.fill();
        ctx.stroke();
    }
    else if(TypeDraw === "Circ"){ 
        ctx.ellipse(x1,y1,WeigthDraw/2,WeigthDraw/2, Math.PI /4,0,2*Math.PI);
        ctx.fill()
        ctx.stroke();

    }
    ctx.closePath();

}


// let observer = new MutationObserver(
//     (mutations, observers) => { 
        
//     });

// observer.observe(WeigthDraw)
