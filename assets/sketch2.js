// cores #f16664 #ff7c8d #ff99b1 #ffb6c1
// d3dfda

//dando oi para o navegador - hi to our browser

var data = [
    {tipo: 'Estrutura', abs: 100, per: 2, nome: 'Estrutura'}, 
    {tipo: 'Direitos trabalhistas', abs: 553, per: 13, nome: 'Direitos'}, 
    {tipo: 'Discriminação, assédio e violência', abs: 617, per: 15, nome: 'Discriminacao'}, 
    {tipo: 'Liderança', abs: 741, per: 17, nome: 'Lideranca'}, 
    {tipo: 'Gestão de pessoas', abs: 748, per: 18, nome: 'Gestao'}, 
    {tipo: 'Rotina de trabalho', abs: 738, per: 17, nome: 'Rotina'}, 
    {tipo: 'Relacionamento entre funcionários', abs: 522, per: 12, nome: 'Funcionarios'}, 
    {tipo: 'Relacionamento com cliente', abs: 74, per: 2, nome: 'Relacionamento'}, 
    {tipo: 'Dinâmica da agência', abs: 156, per: 4, nome: 'Dinamica'}];

//carregando tabela - loading table

console.log(data);
    
//carregar 2o infografico - loading our 2nd viz

function svg_create2(height) {
    console.log('over here')

    svg = d3
    .select('#viz2')
    .style('background-color','#ebf5f5')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    ;

}

function displaySVGCorrectHeight(){
    // Get width and height of the window excluding scrollbars
    w = document.documentElement.clientWidth; 

    if (w<800){
        fixed_heigth = '400'
        svg_create2(fixed_heigth)
        elementw = svg.node().getBoundingClientRect();
        width = elementw.width;
        spacer = width/16;

        height = 400;
        spacerH = height/8;
    } else {
        fixed_heigth = '550'
        svg_create2(fixed_heigth)
        elementw = svg.node().getBoundingClientRect();
        width = elementw.width;
        spacer = width/8;
        
        height = 550;
        spacerH = height/4;
    }
    console.log('third listener',fixed_heigth, spacer)
    
}

// Attaching the event listener function to window's resize event
// window.addEventListener("resize", displaySVGCorrectHeight);

// Calling the function for the first time
displaySVGCorrectHeight();

// if (w<800){
//     height = 400;
//     spacerH = height/8;
// } else {
//     height = 550;
//     spacerH = height/4;
// }

function drawSim(){
    
    if (w<800) {
        s = 5
        h_center = 3.1 * spacerH
        v_center = height / 1.4
        r_mod = 9
    } else {
        s = 5
        h_center = 1.9 * spacerH
        v_center = height / 2
        r_mod = 9
    }
    
    simulation = d3.forceSimulation(data)
    .force('charge', d3.forceManyBody().strength(s))
    .force('center', d3.forceCenter(h_center, v_center))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.abs/r_mod;
        }))
    .on('tick', ticked)
    ;

}

drawSim();

function defineCoor(){
    if (w<800) {
        text_pos = -62
        text_pos1 = -20
        labelxpos = 4*spacer
        labelypos = 18
        c_mod = 23
        y1 = 4.5
        y2 = 4.8
        y3 = 5.1
        y4 = 7.2
        y5 = 5.7
        y6 = 6
    } else {
        text_pos = 100
        text_pos1 = -20
        labelxpos = 4*spacer
        labelypos = 22
        c_mod = 9
        y1 = 2.2
        y2 = 2.4
        y3 = 2.6
        y4 = 6.7
        y5 = 3
        y6 = 3.2

    }
}

function ticked() {

    defineCoor()

    var u = d3.select('#viz2')
    .select('svg')
    .attr('class','third')
    .selectAll('circle')
    .data(data)
    ;
    
    var t = d3.select('#viz2')
    .select('svg')
    .selectAll('text.nodelabel')
    .data(data)
    .attr('transform',`translate(${text_pos},0)`)
    ;
    
    t.enter()
    .append('text')
    .text(function(d,i){return (i+1) + '. ' + d.tipo})
    /*.attr('opacity',.4)*/
    .attr('class', 'nodelabel')
    .attr('nome', function(d){return d.nome})
    .attr('abs', function(d){return '_' + d.abs})
    .attr('per', function(d){return '_' + d.per})
    .attr('id', function(d){return d.nome + '_Label'})
    .merge(t)
    .on('mouseover', t_on)
    .attr('text-anchor', 'left')
    .attr('x', labelxpos)
    .attr('y', function(d,i){return labelypos*(i+1)})
    ;
    
    u.enter()
    .append('circle')
    .attr('fill','#eea4b5')
    .attr('class', function(d){return '_' + d.per})
    .attr('nome', function(d){return d.nome})
    .attr('tipo', function(d){return d.tipo})
    .attr('stroke-width', '4px')
    // .style('mix-blend-mode', 'multiply')
    .attr('id', function(d){return '_' + d.abs})
    .attr('r', function(d) {return d.abs/c_mod;})
    .merge(u)
    .on('mouseover', m_on)
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    ;
    
    u.exit().remove();
}

function addText(one,two,three){

    defineCoor()

    t = d3.select('#viz2')
        .select('svg')
        .append('g')
        .attr('class','xtraData')
        .attr('id',one + '_groupTxt')
        ;
        
        // block of text here
        t
        .append('text')
        .text(function(){return two.substr(1)})
        .attr('class','numero_circulos')
        .attr('x', labelxpos)
        .attr('y', function(){ return y1*spacerH})
        ;
        
        t
        .append('text')
        .text('MENÇÕES')
        .attr('class', 'nodelabel')
        .attr('x', labelxpos)
        .attr('y', function(){ return y2*spacerH})
        ;
        
        t
        .append('line')
        .attr('x1',labelxpos)
        .attr('y1', function(){ return y3*spacerH})
        .attr('x2',function(){ return y4*spacer})
        .attr('y2', function(){ return y3*spacerH})
        .attr('stroke','black')
        ;
        
        t
        .append('text')
        .text(function(){return three.substr(1) + '%'})
        .attr('class','numero_circulos')
        .attr('x', labelxpos)
        .attr('y', function(){ return y5*spacerH} )
        ;
        
        t
        .append('text')
        .text('DO TOTAL')
        .attr('class', 'nodelabel')
        .attr('x', labelxpos)
        .attr('y', function(){ return y6*spacerH} )
        ;

        t
        .attr('transform',`translate(${text_pos},${text_pos1})`);
}

function m_on(){
    var This = d3.select(this);
    
    d3.select('#viz2')
    .selectAll('circle')
    .attr('stroke', 'none')
    ;
    
    d3.selectAll('.nodelabel')
    .style('font-weight', 500)
    .attr('fill', 'black')
    .call(restFunction)
    ;
    
    function restFunction(){
        
        This
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        ;
        
        var thisId = This.attr('id');
        var thisCl = This.attr('class');
        var thisName = This.attr('nome');
                
        d3
        .select('#' + thisName + '_Label')
        .style('font-weight', 700)
        .attr('fill', '#eea4b5')
        .attr('opacity',1)
        ;
        
        d3.select('.xtraData')
        .remove()
        ;
        
        addText(thisName,thisId,thisCl);
    }
    
}

function t_on(){
    var This = d3.select(this);
    
    d3.select('#viz2')
    .selectAll('circle')
    .attr('stroke', 'none')
    ;
    
    d3.selectAll('.nodelabel')
    .style('font-weight', 500)
    .attr('fill', 'black')
    .call(restFunction)
    ;
    
    
    function restFunction(){
        
        This
        .style('font-weight', 700)
        .attr('fill', '#eea4b5')
        ;
        
        var thisAbs = This.attr('abs');
        var thisName = This.attr('nome');
        var thisPer = This.attr('per');
        
        d3.select('#viz2')
        .select('#' + thisAbs)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        ;
        
        d3.select('.xtraData')
        .remove()
        ;
        
        addText(thisName,thisAbs,thisPer);
        
    }
    
}