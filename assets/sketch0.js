// The svg
var svg = d3
    .select('#viz0')
    // .style('background-color','#ebf5f5')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '650px')
    .call(responsivefy)
    ;

var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

var elementw = d3
    .select('#viz0')
    .select('svg')
    .node().getBoundingClientRect();
    
console.log(elementw.width);
console.log(elementw.height);

var width = elementw.width;
var height = elementw.height;

var spacer = height/5;

// Map and projection
// var path = d3.geoPath();
var projection = d3.geoMercator()   
    // .scale(300 / Math.PI)
    // .translate([300, 225])
    .scale(6*spacer)
    .translate([10.7*spacer, 80])
    ;
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var dados = d3.map();
var colorScheme = d3.schemeRdPu[6];
colorScheme.unshift("#eee");
var colorScale = d3.scaleThreshold()
    .domain([1, 25, 50, 100, 200, 800])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(" + 40 + "," + 20 + ")")
    .attr('z-index',1)
    ;
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Nº de agências citadas");

var labels = ['0', '1-25', '26-50', '51-100', '101-200', '201-800', '> 800'];

// REFAZER LEGENDA
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale)
    ;
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
    .defer(d3.json, "data/BRA2.json")
    .defer(d3.csv, "data/mapabr.csv", function(d) { dados.set(d.fips, +d.total); })
    .await(ready);
    
function ready(error, topo) {
    if (error) throw error;
    
    // console.log(topo.objects.units.geometries);
    console.log(topo.features);
    
    // Draw the map
    d3
    .select('#viz0')
    .select('svg')
    .append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = dados.get(d.id) || 0;
                // Set the color
                // console.log(dados.get(d.id));
                return colorScale(d.total);
            })
            .attr("d", path)
            .on('mouseover', m_on)
            // .on('mouseout', m_out)
            ;
            
        function m_on(d){
            
            d3
            .select('#viz0')
            .select('svg')
            .select('g.valor1')
            .remove()
            .transition(t)
            ;
            
            var This = d3.select(this);
            var ThisData = This._groups["0"]["0"].__data__;
            var thisFill = This._groups["0"]["0"].attributes["0"].nodeValue;
            console.log(ThisData);
            console.log(This._groups["0"]["0"].attributes["0"].nodeValue);
            
            var gDash = d3
            .select('#viz0')
            .select('svg')
            .append('g')
            .attr('class', 'valor1')
            .attr('z-index',0)
            ;
            
            gDash
            .append('circle')
            .transition(t)
            .attr('cx', 1.5*spacer)
            .attr('cy', 350)
            .attr('r', function(d,i){return 11*(Math.sqrt(ThisData.total/Math.PI))})
            .attr('fill', thisFill)
            .attr('stroke', '#abc1c1')
            // .attr('opacity', .2 )
            ;
            
            gDash
            .append('text')
            .attr('x', 1.5*spacer)
            .attr('y', 350)
            .text(function(d){return ThisData.properties.name})
            .attr('fill', 'black')
            .attr('opacity', 1 )
            .attr('text-anchor','middle')
            .style('text-transform','uppercase')
            .style('font-size','14px')
            .style('font-weight',700)
            ;
            
             gDash
            .append('text')
            .attr('x', 1.5*spacer)
            .attr('y', 390)
            .text(function(d){return ThisData.total})
            .attr('fill', 'black')
            .attr('opacity', 1 )
            .attr('text-anchor','middle')
            .style('text-transform','uppercase')
            .style('font-size','42px')
            // .style('font-weight',700)
            ;
            
        }
        
        function m_out(d){
            
            d3
            .select('#viz0')
            .select('svg')
            .select('g.valor1')
            .remove()
            .transition(t)
            ;
            
        }
}


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
