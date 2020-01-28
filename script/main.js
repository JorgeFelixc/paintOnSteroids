
const width = window.innerWidth -500 ;
const height = window.innerHeight ;
const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height
canvas.oncontextmenu = (ev) => { 
    return false;
}
canvas.addEventListener("click", DetectFigure);
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
var currentPencil;

let figures = [];


function SetPencil(pencilReference){
    if(currentPencil){
        canvas.removeEventListener('mousedown', currentPencil);
    }

    if(pencilReference === null){
        return;
    }
    

    currentPencil = (ev) => {
        ev.preventDefault();
        const xpos = ev.offsetX;
        const ypos = ev.offsetY;
        let canvasData;
        if(pencilReference.length === 2){
            pencilReference(xpos,ypos);
        }else{ 
            canvasData = ctx.getImageData(0,0,width,height);
        }
        
        const movementBuffer = ( event) => { 
            // console.log(xpos, ypos, event.offsetX, event.offsetY);
            // console.log(event);
            if(pencilReference.length == 2){
                pencilReference(event.offsetX, event.offsetY);

            }else{
                // ctx.clearRect(0,0,width,height);
                ctx.putImageData(canvasData,0,0);
                pencilReference(xpos, ypos, event.offsetX, event.offsetY);

            }
            
        };

        const removeEvents = (e) => { 
            canvas.removeEventListener("mousemove", movementBuffer);
        };

        const removeUp = (e) => { 
            e.preventDefault();
            removeEvents(e);
            canvas.removeEventListener("mouseup", removeUp);
            if(canvasData && pencilReference !== null){ 
                let figureSchema = {
                    figureType: 'line',
                    x1: xpos,
                    y1: ypos,
                    x2: event.offsetX,
                    y2: event.offsetY,
                    z:1,
                    selected: false
                }

                figures.push(figureSchema);
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
    
    if(figure.length > 0){
        ctx.save();
        const { x1,x2,y1,y2} = figure[0];

        if(figure[0].figureType == "line"){ 
            ctx.save();
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.rect(x1-WeigthDraw/2,y1-WeigthDraw/2,8,8);
            ctx.fill();
            ctx.stroke();
            ctx.moveTo(x2,y2);
            ctx.rect(x2-WeigthDraw/2,y2-WeigthDraw/2,8,8);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }else{
            selection(x1,y1,x2,y2);
            // rectangulo(x1,y1,x2,y2);
        }

    }

    console.log("ITEM!!!!!!!", figure);
}



