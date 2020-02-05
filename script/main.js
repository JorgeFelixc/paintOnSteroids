
canvas.addEventListener("click", DetectFigure);
const startMovement = (e) => { 
    attatchFigure(resultantFigure,e);
}

function SetPencil(pencilReference){
    if(currentPencil){
        canvas.removeEventListener('mousedown', currentPencil);
    }

    if(canvasBuffer){
        ctx.putImageData(canvasBuffer,0,0);
        canvasBuffer =null;
    }

    if(pencilReference === null){
        currentPencil = null;
        return;
    }
    
    currentPencil = (ev) => {
        ev.preventDefault();
        const xpos = ev.offsetX;
        const ypos = ev.offsetY;
        xold = xpos;
        yold = ypos;

        if(ev.which == 3){
            ctx.fillStyle = GetHSLText(secondColor);
        }else{ 
            ctx.fillStyle = GetHSLText(firstColor);
        }

        if(pencilReference.length === 2){
            pencilReference(xpos,ypos);
        }else{ 
            canvasBuffer = ctx.getImageData(0,0,width,height);
        }
        
        const movementBuffer = ( event) => { 
            // console.log(xpos, ypos, event.offsetX, event.offsetY);
            // console.log(event);
            if(pencilReference.length == 2){
                pencilReference(event.offsetX, event.offsetY);

            }else{
                // ctx.clearRect(0,0,width,height);
                ctx.putImageData(canvasBuffer,0,0);
                pencilReference(xpos, ypos, event.offsetX, event.offsetY);

            }
            xold = event.offsetX;
            yold = event.offsetY;
            
        };

        const removeEvents = (e) => { 
            canvas.removeEventListener("mousemove", movementBuffer);
        };

        const removeUp = (e) => { 
            e.preventDefault();
            removeEvents(e);
            canvas.removeEventListener("mouseup", removeUp);
            if(canvasBuffer && pencilReference !== null){ 
                let figureSchema = {
                    figureType: 'line',
                    x1: xpos,
                    y1: ypos,
                    x2: event.offsetX,
                    y2: event.offsetY,
                    z:figures.length,
                    draw: pencilReference,
                    pointReference: new Path2D(),
                    selected: false
                }

                figures.push(figureSchema);
                canvasBuffer = null;
            }
        }

        canvas.addEventListener("mousemove", movementBuffer);
        canvas.addEventListener("mouseup", removeUp);  
    }
    
    canvas.addEventListener('mousedown', currentPencil);
}

function DetectFigure(event){
    let x = event.offsetX,
    y = event.offsetY;
    let figure = figures.filter((item) => { 
        if((x > item.x1 && x < item.x2) && (y > item.y1 && y < item.y2)){
            return true;
        }
    });

    if(currentPencil !== null){
        return;
    }
    
    if(!canvasBuffer ){
        canvasBuffer = ctx.getImageData(0,0,width,height);
    }

    if(figure.length > 0){
        ctx.save();
        resultantFigure = null;
        figure.forEach((item) =>{ 
            if(resultantFigure){
                if(resultantFigure.z < item.z){
                    resultantFigure = item;
                }
            }else{
                resultantFigure = item;
            }
        })

        const { x1,x2,y1,y2} = resultantFigure;
        ctx.putImageData(canvasBuffer,0,0);
        selection(x1,y1,x2,y2);

        canvas.addEventListener("mousemove", startMovement);
        // canvasBuffer = null;
            // rectangulo(x1,y1,x2,y2);

    }else{
        canvas.removeEventListener("mousemove", startMovement)
        ctx.putImageData(canvasBuffer,0,0);
        canvasBuffer = null;
    }



    console.log("ITEM!!!!!!!", figure);
}


function attatchFigure(figure,e){
    const {x1,x2,y1,y2 } = figure;

    e.preventDefault();
    e.stopPropagation();
    let mousex = e.offsetX;
    let mousey = e.offsetY;
    let typeCursor;

    if((mousex > x1 && mousex < x2) && (mousey > y1 && mousey < y2)){
        typeCursor = "resize";
        if(mousex - x1 < 10 ){
            canvas.style.cursor = "nwse-resize";
        }
        else if(x2 -mousex < 10){
            canvas.style.cursor = "nesw-resize";
        }
        else{ 
            canvas.style.cursor = "move";
            typeCursor = "move";
        }
        
        InitToolsFigure(typeCursor);
    }else{ 
        canvas.style.cursor = "default";

    }

    


}


function InitToolsFigure(typeCursor){
    let injectedMethod;
    const figureClick = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        if(typeCursor == "resize"){
            injectedMethod = ResizeFigure;
        }
        else{
            injectedMethod = MoveFigure;
        }

        canvas.addEventListener("mousemove", figureMove);
    }

    const figureMove = (e) =>{
        e.preventDefault();
        e.stopPropagation();

        injectedMethod(e);
    }




    canvas.addEventListener("mousedown", figureClick);
    canvas.addEventListener("mouseup", (e) =>{ 
        canvas.removeEventListener("mousedown", figureClick);
        canvas.removeEventListener("mousemove", figureMove);
    });
}

function MoveFigure(e){
    console.log("move",e.offsetX);
    const { x1,x2,y1,y2,draw} = resultantFigure
    // draw(x1,y1,x2,y2);}
    let xone = x1 + (e.offsetX - x1);
    let yone = y1 + (e.offsetY - y1);
    let xdos = x2 + (e.offsetX - x2);
    let ydos = y2 + (e.offsetY - y2);
    draw(xone,yone, x2 ,y2);
}


function ResizeFigure(e){
    console.log("resize",e.offsetX);
}

SetPencil(Lapiz);