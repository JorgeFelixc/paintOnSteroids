let TypeDraw = "Rect";
let WeigthDraw = 10;
let firstColor = {
    h:0,
    s:100,
    l:50,
};
let secondColor = {
    h:0,
    s:100,
    l:50,
};
let h = 0;

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


function ToggleClass(id, clase){ 
    let dom_el = id;
    if(typeof dom_el === "string"){
        dom_el = document.getElementById(id);
    }
    
    if(dom_el.classList.contains(clase)){
        dom_el.classList.remove(clase);
    }else{ 
        dom_el.classList.add(clase);
    }
}

function GetHSLText(object){
    const { h,s,l} = object;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function OpenColors(id, colorVariable, divColor){

    const elementToInsert = document.getElementById(id);
    // const colors = document.getElementById("colores"); 
    if(document.getElementById("colores")){
        elementToInsert.innerHTML = "";
    }
    elementToInsert.innerHTML += ColorBox(id);

    const dom_Color = document.getElementById(divColor);
   const colors = document.getElementById(`colores-${id}`);
   const spectre = document.getElementById(`spectre-${id}`);
   const coloresPointer = document.getElementById(`colores-pointer-${id}`);
   
   colors.addEventListener("mousedown",(e) => { 
       hslPicker(e, colorVariable);
   });
   spectre.addEventListener("mousedown", (e) =>  {spectrePicker(e,colorVariable)})
   
   const currentColor = document.getElementById(`current-color-${id}`);
   
   function hslPicker(e, color){
       coloresPointer.style.left  = `${e.offsetX}px`;
       coloresPointer.style.top = `${e.offsetY}px`;
   
       const mosueMove = (e) => {
        //    console.log(e);
           let xpos = e.offsetX;
           let ypos = e.offsetY;
           let xvalue = e.target.clientHeight - xpos;
           let yvalue = e.target.clientWidth - ypos;
           let xpercent = ((100 / e.target.clientHeight ) * xvalue) /2;
           let ypercent = ((100 / e.target.clientHeight ) * yvalue) /2;
           let l = xpercent + ypercent
           let s = ((100 / e.target.clientHeight ) * xpos);
           color.l = l;
           color.s = s;
   
           coloresPointer.style.left  = `${xpos}px`;
           coloresPointer.style.top = `${ypos}px`;
           SetColor(color,currentColor)
           SetColor(color,dom_Color);
           // console.log(colorText);
   
       }
   
       const mouseUp = (e) => {
           colors.removeEventListener("mousemove",mosueMove);
           colors.removeEventListener("mouseup", mouseUp)
       }
   
       colors.addEventListener("mousemove", mosueMove);
       colors.addEventListener("mouseup", mouseUp )
   
   }
   
   function spectrePicker(e, color){
       const mosueMove = (e) => {
        //    console.log(e);
           let xpos = e.offsetX;
           let ypos = e.offsetY;
   
           // let h = Math.round(ypos);
           color.h = ypos
           console.log(ypos);
           SetColor(color, currentColor);
           SetColor({h:ypos, s:100, l:50 }, colors);
            SetColor(color, dom_Color);
        }
   
       const mouseUp = (e) => {
           spectre.removeEventListener("mousemove",mosueMove);
           spectre.removeEventListener("mouseup", mouseUp)
       }
   
       spectre.addEventListener("mousemove", mosueMove);
       spectre.addEventListener("mouseup", mouseUp )
   }
   
   
   function SetColor(color, domElement){
       const { h,s,l } = color;
       let colorText = `hsl(${h}, ${s}%, ${l}%)`;
       domElement.style.backgroundColor =colorText;
   }
   
   
   SetColor(firstColor, colors);
   SetColor(firstColor, currentColor);

}

OpenColors('colorUno', firstColor , 'colorUno');
OpenColors('colorDos', secondColor ,'colorDos')



// let observer = new MutationObserver(

//     (mutations, observers) => { 
//         console.log("Cambie", observer);
//     });

// observer.observe(firstColor,{ });
