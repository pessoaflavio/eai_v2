//dando oi para o navegador - hi to our browser
console.log('hi dere');

//dados simples - simple array of data
var data = [{type: 'positive', percentage: 29}, {type: 'negative', percentage: 71}];

console.log(data);


function svg_create(height) {
    svg = d3
    .select('#viz1')
    // .style('background-color','#ebf5f5')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    ;
}

function displaySVGCorrectHeight(){
    // Get width and height of the window excluding scrollbars
    w = document.documentElement.clientWidth; 

    if (w<800){
        fixed_heigth = '200'
        svg_create(fixed_heigth)
        elementw = svg.node().getBoundingClientRect();
        width = elementw.width;
        spacer = width/5;
    } else {
        fixed_heigth = '650'
        svg_create(fixed_heigth)
        elementw = svg.node().getBoundingClientRect();
        width = elementw.width;
        spacer = width/5;   
    }
    console.log(fixed_heigth, spacer)
    
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displaySVGCorrectHeight);

// Calling the function for the first time
displaySVGCorrectHeight();

//carregar 1o infografico - loading our 1st viz
function drawCircleComments(){

    if (w<800){
        g_coor = [20,0]
        g1_h = 1.4*spacer
        g2_h = spacer*3.2
        ratio = width/18
        trans_h = 15;

    } else {
        g_coor = [100,0]
        g1_h = spacer*1.3
        g2_h = spacer*3.2 
        ratio = width/16
        trans_h = 20;
    }

    var g = svg
    .append('g')
    .style('isolation', 'isolate')
    .attr('transform',`translate(${g_coor[0]},${g_coor[1]})`)
    ;

    g
    .append('circle')
    .attr('fill','#f4c7c2')
    .attr('r', function(){return ratio*(Math.sqrt(71/Math.PI))})
    .attr('cx', g1_h)
    .attr('cy', fixed_heigth/2)
    .style('mix-blend-mode', 'multiply')
    ;

    g
    .append('text')
    .text('71%')
    .attr('x', g1_h)
    .attr('y', fixed_heigth/2)
    .attr('text-anchor','middle')
    .attr('class','numero_circulos')
    ;

    g
    .append('text')
    .text('negativo')
    .attr('x', g1_h)
    .attr('y', fixed_heigth/2)
    .attr('text-anchor','middle')
    .attr('class','detalhe')
    .attr('transform', `translate(0,${trans_h})`)
    ;

    g
    .append('text')
    .text('29%')
    .attr('x', g2_h)
    .attr('y', fixed_heigth/2)
    .attr('text-anchor','middle')
    .attr('class','numero_circulos')
    ;

    g
    .append('text')
    .text('positivo')
    .attr('x', g2_h)
    .attr('y', fixed_heigth/2)
    .attr('text-anchor','middle')
    .attr('class','detalhe')
    .attr('transform', `translate(0,${trans_h})`)
    ;

    g
    .append('circle')
    .attr('fill','#fbece3')
    .attr('r', function(){return ratio*(Math.sqrt(29/Math.PI))})
    .attr('cx', g2_h)
    .attr('cy', fixed_heigth/2)
    .style('mix-blend-mode', 'multiply')
    ;

}


drawCircleComments()