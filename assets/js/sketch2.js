// cores #f16664 #ff7c8d #ff99b1 #ffb6c1
// d3dfda

//dando oi para o navegador - hi to our browser
console.log('hi dere');

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

var svg = d3
.select('#viz2')
// .style('background-color','#ebf5f5')
.append('svg')
.attr('class', 'secondViz')
.attr('width', '100%')
.attr('height', '550px')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var spacer = width/8;
var spacerH = height/4;

var simulation = d3.forceSimulation(data)
.force('charge', d3.forceManyBody().strength(5))
.force('center', d3.forceCenter(1.8*spacerH, height / 2 ))
.force('collision', d3.forceCollide().radius(function(d) {
    return d.abs/10;
    }))
.on('tick', ticked)
;



function ticked() {

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
    .attr('transform','translate(100,0)')
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
    .attr('x', function(){ return 4*spacer})
    .attr('y', function(d,i){return 22*(i+1)})
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
    .attr('r', function(d) {return d.abs/10;})
    .merge(u)
    .on('mouseover', m_on)
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    ;
    
    u.exit().remove();
}

function m_on(){
    var This = d3.select(this);
    
    d3.select('#viz2')
    .selectAll('circle')
    .attr('stroke', 'none')
    // .attr('stroke-width', 0)
    ;
    
    d3.selectAll('.nodelabel')
    .style('font-weight', 500)
    .attr('fill', 'black')
    /*.attr('opacity',.4)*/
    .call(restFunction)
    ;
    
    
    function restFunction(){
        
        This
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        ;
        
        var thisId = This.attr('id');
        var thisTipo = This.attr('tipo');
        var thisCl = This.attr('class');
        var thisName = This.attr('nome');
        
        console.log('#' + thisName + '_Label');
        
        d3
        .select('#' + thisName + '_Label')
        .style('font-weight', 700)
        .attr('fill', '#eea4b5')
        .attr('opacity',1)
        ;
        
        d3.select('.xtraData')
        .remove()
        ;
        
        var t = d3.select('#viz2')
        .select('svg')
        .append('g')
        .attr('class','xtraData')
        .attr('id',thisName + '_groupTxt')
        ;
        
        // block of text here
        t
        .append('text')
        .text(function(){return thisId.substr(1)})
        .attr('font-size','60px')
        // .style('font-weight','900')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 2.5*spacerH})
        ;
        
        t
        .append('text')
        .text('MENÇÕES')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 2.7*spacerH})
        ;
        
        t
        .append('line')
        .attr('x1',function(){ return 4*spacer})
        .attr('y1', function(){ return 3*spacerH})
        .attr('x2',function(){ return 6.7*spacer})
        .attr('y2', function(){ return 3*spacerH})
        .attr('stroke','black')
        ;
        
        t
        .append('text')
        .text(function(){return thisCl.substr(1) + '%'})
        .attr('font-size','60px')
        // .style('font-weight','900')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 3.7*spacerH} )
        ;
        
        t
        .append('text')
        .text('DO TOTAL')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 3.9*spacerH} )
        ;

        t
        .attr('transform','translate(100,-20)');
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
    /*.attr('opacity',.4)*/
    .call(restFunction)
    ;
    
    
    function restFunction(){
        
        This
        .style('font-weight', 700)
        .attr('fill', '#eea4b5')
        /*.attr('opacity',1)*/
        ;
        
        var thisAbs = This.attr('abs');
        var thisName = This.attr('nome');
        var thisPer = This.attr('per');
        
        d3.select('#viz2')
        // .selectAll('circle')
        .select('#' + thisAbs)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        ;
        
        d3.select('.xtraData')
        .remove()
        ;
        
        var t = d3.select('#viz2')
        .select('svg')
        .append('g')
        .attr('class','xtraData')
        .attr('id',thisName + '_groupTxt')
        ;
        
        // block of text here
        t
        .append('text')
        .text(function(){return thisAbs.substr(1)})
        .attr('font-size','60px')
        .style('font-weight','500')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 2.5*spacerH})
        ;
        
        t
        .append('text')
        .text('MENÇÕES')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 2.7*spacerH})
        ;
        
        t
        .append('line')
        .attr('x1',function(){ return 4*spacer})
        .attr('y1', function(){ return 3*spacerH})
        .attr('x2',function(){ return 6.7*spacer})
        .attr('y2', function(){ return 3*spacerH})
        .attr('stroke','black')
        ;
        
        t
        .append('text')
        .text(function(){return thisPer.substr(1) + '%'})
        .attr('font-size','60px')
        .style('font-weight','500')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 3.7*spacerH} )
        ;
        
        t
        .append('text')
        .text('DO TOTAL')
        .attr('x', function(){ return 4*spacer})
        .attr('y', function(){ return 3.9*spacerH} )
        ;

        t
        .attr('transform','translate(100,-20)');
    }
    
}




// desenhar o gráfico de maneira responsiva / responsive redrawing of our viz
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}