//dando oi para o navegador - hi to our browser
console.log('hi dere');

function rmv(str) {
  var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split('');
  var strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) != -1) {
      str[i] = accentsOut[x];
    }
  }
  return str.join('');
}

//carregando tabela - loading table

d3.csv('data/DadosSubCategorias.csv', function(error, data)
    {
    if (error) throw error;
    
    
    var select = d3.select('body')
        .select('#subcat_holder')
        // .style('background-color','#ebf5f5')
        .append('select')
        .attr('class','select')
        .on('change',change)
        ;
    
    
    var options = select
        .selectAll('option')
    	.data(data).enter()
    	.append('option')
    		.text(function (d) { 
    		    return d.cat; });
    		
	function change(d,i){
	    
	    d3
	    .selectAll('div.subcats')
	    .style('display','none')
	    ;
	    
	    var activeValue = d3
	    .select('select')
	    .property('value')
	    ;
        
	    var newid = activeValue;
        var str = newid.replace(/\s+/g, '');
        var nId = rmv(str);
        
        console.log('#subcat_' + nId);

	    d3
	    .select('#' + nId)
	    .style('display','inherit')
	    ;
	    
	}

    
    
    var div1 = d3
    .select('#subcat_holder')
    .selectAll('div.subcats')
    .data(data)
    .enter()
    .append('div')
    .style('display', function(d,i){
        if (i == 0) return 'inherit';
        else return 'none';
    })
    .attr('class', 'subcats')
    .attr('id', function(d,i){
	    var newid = d.cat;
        var str = newid.replace(/\s+/g, '');
        var nId = rmv(str);
        return nId}
        )
    // .html(function(d){return '<h3>' + d.cat + '</h3>'})
    ;
    
    div1
    .append('p')
    .text(function(d){return d.desc})
    ;
    
    var valueHolder = div1
    .append('div')
    .attr('class','valueHolder')
    .style('height', function(d){return d.gp_valor*7 + 'px'})
    ;
    
    var descHolder = div1
    .append('div')
    .attr('class', 'descHolder')
    ;
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','gpholder')
    .style('background-color', '#eea4b5')
    .style('border-left', 'none')
    .style('height', function(d){return d.gp_valor*7 + 'px'})
    .html(function(d){return '<span class="BigNumber">' + d.gp_valor + '%</span>'})
    .on('mouseover', mouseON1)
    .on('mouseout', mouseOut1)
    ;
    
    descHolder
    .append('div')
    .attr('class', 'descUnique')
    .attr('id', 'gpD')
    .html(function(d){return '<p class="detalhe"><b>Grand Prix</b><br>' + d.gp_nome + '</p>'})
    .on('mouseover', mouseON1)
    .on('mouseout', mouseOut1)
    ;
    
    function mouseON1(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);
    
    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    
    slct
    .select('#gpholder')
    .style('opacity',1)
    ;
    
    slct
    .selectAll('#Exemplo_' + nId)
    .append('text')
    .attr('class','bigexample')
    .text(d.gp_cit1)
    ;
    
    
    }
    function mouseOut1(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);

    var slct = d3
    .select('body')
    .select('#' + nId)
    ;

    slct
    .selectAll('#gpholder')
    .style('opacity',.6)
    ;
    
    slct
    .select('#Exemplo_' + nId)
    .selectAll('.bigexample')
    .remove()
    ;
    
    }
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','ouroholder')
    .style('background-color', '#f4c7c2')
    .style('height', function(d){return d.o_valor*7 + 'px'})
    .html(function(d){return '<span class="BigNumber">' + d.o_valor + '%</span>'})
    .on('mouseover', mouseON2)
    .on('mouseout', mouseOut2)
    ;
    
    descHolder
    .append('div')
    .attr('class', 'descUnique')
    .attr('id', 'ouroD')
    .html(function(d){return '<p class="detalhe"><b>Ouro</b><br>' + d.o_nome + '</p>'})
    .on('mouseover', mouseON2)
    .on('mouseout', mouseOut2)
    ;
    
    function mouseON2(d,i){
    
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);
    
    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    
    slct
    .select('#ouroholder')
    .style('opacity',1)
    ;
    
    slct
    .selectAll('#Exemplo_' + nId)
    .append('text')
    .attr('class','bigexample')
    .text(d.o_cit1)
    ;
    }
    function mouseOut2(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);

    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    
    slct
    .select('#ouroholder')
    .style('opacity',.6)
    ;
    
    slct
    .select('#Exemplo_' + nId)
    .selectAll('.bigexample')
    .remove()
    ;
    
}
    
    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','prataholder')
    .style('background-color', function(d){
        if (d.p_valor !== '') return '#fbece3';
        else return null;
    })
    .style('height', function(d){return d.p_valor*7 + 'px'})
    .html(function(d){
        if (d.p_valor !== '') return '<span class="BigNumber">' + d.p_valor + '%</span>';
        else return null;
    })
    .on('mouseover', mouseON3)
    .on('mouseout', mouseOut3)
    ;
    
    descHolder
    .append('div')
    .attr('class', 'descUnique')
    .attr('id', 'prataD')
    .html(function(d){return '<p class="detalhe"><b>Prata</b><br>' + d.p_nome + '</p>'})
    .on('mouseover', mouseON3)
    .on('mouseout', mouseOut3)
    ;
    
    function mouseON3(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);
    
    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    
    slct
    .select('#prataholder')
     .style('opacity',1)
    ;
    
    slct
    .selectAll('#Exemplo_' + nId)
    .append('text')
    .attr('class','bigexample')
    .text(d.p_cit1)
    ;
    }
    function mouseOut3(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);

    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    slct
    .selectAll('#prataholder')
    .style('opacity',.6)
    ;
    
   slct
    .select('#Exemplo_' + nId)
    .selectAll('.bigexample')
    .remove()
    ;
    
    }

    valueHolder
    .append('div')
    .attr('class','_holder')
    .attr('id','bronzeholder')
    .style('background-color', function(d){
        if (d.b_valor !== '') return 'lightgrey';
        else return null;
    })
    .style('height', function(d){return d.b_valor*7 + 'px'})
    .html(function(d){
        if (d.b_valor !== '') return '<span class="BigNumber">' + d.b_valor + '%</span>';
        else return null;
    })
    .on('mouseover', mouseON4)
    .on('mouseout', mouseOut4)
    ;
    
    descHolder
    .append('div')
    .attr('class', 'descUnique')
    .attr('id', 'bronzeD')
    .html(function(d){return '<p class="detalhe"><b>Bronze</b><br>' + d.b_nome + '</p>'})
    .on('mouseover', mouseON4)
    .on('mouseout', mouseOut4)
    ;
    
    function mouseON4(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);
    
    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    
    slct
    .select('#bronzeholder')
    .style('opacity',1)
    ;
    
    slct
    .selectAll('#Exemplo_' + nId)
    .append('text')
    .attr('class','bigexample')
    .text(d.b_cit1)
    ;
    }
    function mouseOut4(d,i){
        
    var newid = d.cat;
    var str = newid.replace(/\s+/g, '');
    var nId = rmv(str);

    var slct = d3
    .select('body')
    .select('#' + nId)
    ;
    slct
    .selectAll('#bronzeholder')
    .style('opacity',.6)
    ;
    
    slct
    .select('#Exemplo_' + nId)
    .selectAll('.bigexample')
    .remove()
    ;
    
    }
    
    
    
    div1
    .append('div')
    .attr('class','example')
    .attr('id', function(d,i){
        var newid = d.cat;
        var str = newid.replace(/\s+/g, '');
        var nId = rmv(str);
        return 'Exemplo_' + nId;
    })
    .html('O que foi dito:<br>')
    ;
    
    }
);
