let t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear)
    ;

// Data and color scale
let dados = d3.map();

let colorScheme = d3.schemeRdPu[6];

colorScheme.unshift("#eee");

let colorScale = d3.scaleThreshold()
    .domain([1, 25, 50, 100, 200, 800])
    .range(colorScheme)
    ;

function svg_create(height) {
    svg = d3
    .select('#viz0')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    // .style('background-color','red')
    ;
}


function displaySVGCorrectHeight(){
    // Get width and height of the window excluding scrollbars
    w = document.documentElement.clientWidth; 
        
    if (w<800){
        fixed_heigth = '300px'
        spacer = 300/5;

        projection = d3.geoMercator()   
        .scale(4*spacer)
        .translate([6.5*spacer, 40])
        ;

        svg_create(fixed_heigth)

    } else {
        fixed_heigth = '650px'
        spacer = 650/5;
        
        projection = d3.geoMercator()   
        .scale(6.8*spacer)
        .translate([11*spacer, 80])
        ;
        
        svg_create(fixed_heigth)
    }
    console.log(fixed_heigth, spacer)
    
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displaySVGCorrectHeight);

// Calling the function for the first time
displaySVGCorrectHeight();

console.log(svg)

let path = d3.geoPath()
    .projection(projection)
    ;

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", `translate(${spacer / 8},${spacer / 4})`)
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
.call(legend)
;

// Load external data and boot
d3.queue()
    .defer(d3.json, "data/BRA2.json")
    .defer(d3.csv, "data/mapabr.csv", function(d) { dados.set(d.fips, +d.total); })
    .await(ready)
    ;
    
function ready(error, topo) {
    if (error) throw error;
    
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
                return colorScale(d.total);
            })
            .attr("d", path)
            .on('mouseover', m_on)
            ;
            
        function m_on(d){

            var This = d3.select(this);
            console.log(This)
            var ThisData = This._groups["0"]["0"].__data__;
            var thisFill = This._groups["0"]["0"].attributes["0"].nodeValue;

            if (w<800){
                h_center = w/2.5;
                t1_vcenter = 210;
                t2_vcenter = 250;
                ratio = 3.5;
            } else {
                h_center = 2*spacer;
                t1_vcenter = 350;
                t2_vcenter = 390;
                ratio = 11;
            }
            
            d3
            .select('#viz0')
            .select('svg')
            .select('g.valor1')
            .remove()
            .transition(t)
            ;
            
            
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
            .attr('cx', h_center)
            .attr('cy', t1_vcenter)
            .attr('r', function(d,i){return ratio*(Math.sqrt(ThisData.total/Math.PI))})
            .attr('fill', thisFill)
            .attr('stroke', '#abc1c1')
            ;
            
            gDash
            .append('text')
            .attr('x', h_center)
            .attr('y', t1_vcenter)
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
            .attr('x', h_center)
            .attr('y', t2_vcenter)
            .text(function(d){return ThisData.total})
            .attr('fill', 'black')
            .attr('opacity', 1 )
            .attr('text-anchor','middle')
            .style('text-transform','uppercase')
            .style('font-size','42px')
            ;
            
        }
        
}
