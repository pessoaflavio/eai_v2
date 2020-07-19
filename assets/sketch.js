//dando oi para o navegador - hi to our browser
console.log('hi dere');

//dados simples - simple array of data
var data = [{type: 'positive', percentage: 29}, {type: 'negative', percentage: 71}];

console.log(data);

//carregar 1o infografico - loading our 1st viz


var svg = d3
.select('#viz1')
.append('svg')
.attr('width', '100%')
.attr('height', '550px')
.call(responsivefy)
;

var elementw = svg.node().getBoundingClientRect();

console.log(elementw.width);
var width = elementw.width;
var height = elementw.height;

var spacer = width/8;


var g =
svg
.append('g')
.style('isolation', 'isolate')
;

g
.append('text')
.text('71%')
.attr('x', function(){return 3*spacer})
.attr('y', height/2)
.attr('text-anchor','middle')
.attr('fill', 'black')
.attr('font-size', '50px')
.attr('transform', 'translate(0,' + spacer/4.8 + ')')
.style('font-weight','500')
;

g
.append('text')
.text('de respostas negativas')
.attr('x', function(){return 3*spacer})
.attr('y', height/2)
.attr('text-anchor','middle')
.attr('fill', 'black')
.attr('font-size', '16px')
.attr('transform', 'translate(0,' + spacer/3 + ')')
.style('font-weight','500')
;

g
.append('text')
.text('29%')
.attr('x', function(){return 5*spacer})
.attr('y', height/2)
.attr('text-anchor','middle')
.attr('fill', 'black')
.attr('font-size', '50px')
.attr('transform', 'translate(0,' + spacer/4.8 + ')')
.style('font-weight','500')
;

g
.append('text')
.text('de respostas positivas')
.attr('x', function(){return 5*spacer})
.attr('y', height/2)
.attr('text-anchor','middle')
.attr('fill', 'black')
.attr('font-size', '16px')
.attr('transform', 'translate(0,' + spacer/3 + ')')
.style('font-weight','500')
;

g
.append('circle')
.attr('fill','#f4c7c2')
.attr('r', function(){return (width/18)*(Math.sqrt(71/Math.PI))})
.attr('cx', function(){return 3*spacer})
.attr('cy', height/2)
.style('mix-blend-mode', 'multiply')
;

g
.append('circle')
.attr('fill','#fbece3')
.attr('r', function(){return (width/18)*(Math.sqrt(29/Math.PI))})
.attr('cx', function(){return 5*spacer})
.attr('cy', height/2)
.style('mix-blend-mode', 'multiply')
;


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