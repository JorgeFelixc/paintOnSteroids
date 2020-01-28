

function ColorBox(idColorBox){ 
    const ColorBox = `
    <div class="color-box">
        <div id="colores-${idColorBox}" class="colors">
            <div class="bg1"></div>
            <div class="bg2"></div>
            <div id="colores-pointer-${idColorBox}" class="colors-pointer">

            </div>
        </div>
        <div id="spectre-${idColorBox}" class="spectre">
            <div class="spectrebg"></div>
            <!-- <div class="spectre-pointer"></div> -->
        </div>
        <div id="current-color-${idColorBox}" class="currentColor">

        </div>
    </div>
`;
return ColorBox;
}