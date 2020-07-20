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
    ;
    
    div1
    .append('p')
    .text(function(d){return d.desc})
    ;
    
    function fillDiv1ByCat(selection,id,color){

        function mouseON1(d,i){
            console.log(id)
            function selectId2(d){
                if (id=='gpholder') {
                    return `${d.gp_cit1}`
                } else if(id=='ouroholder') {
                    return `${d.o_cit1}`
                } else if (id=='prataholder') {
                    return `${d.p_cit1}`
                } else {
                    return `${d.b_cit1}`
                }
            }
            
            let id_selector = `#${id}`
    
            var newid = d.cat;
            var str = newid.replace(/\s+/g, '');
            var nId = rmv(str);
            
            var slct = d3
            .select('body')
            .select('#' + nId)
            ;
            
            slct
            .select(id_selector)
            .style('opacity',1)
            ;
            
            slct
            .selectAll('#Exemplo_' + nId)
            .append('text')
            .attr('class','bigexample')
            .text(d=>selectId2(d,i,id))
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
            .selectAll(`#${id}`)
            .style('opacity',.6)
            ;
            
            slct
            .select('#Exemplo_' + nId)
            .selectAll('.bigexample')
            .remove()
            ;
            
        }

        function getColor(d){
            if (getH(d) !== '0px') {
                return color
            } else return null
        }

        function getH(d){
            if (id=='gpholder') {
                return `${d.gp_valor*7}px`
            } else if(id=='ouroholder') {
                return `${d.o_valor*7}px`
            } else if (id=='prataholder') {
                return `${d.p_valor*7}px`
            } else {
                return `${d.b_valor*7}px`
            }
        }

        function getW(d){
            if (id=='gpholder') {
                return `${w*0.8}px`
            } else if(id=='ouroholder') {
                return `${(d.o_valor*(w*0.8)/d.gp_valor)}px`
            } else if (id=='prataholder') {
                return `${(d.p_valor*(w*0.8)/d.gp_valor)}px`
            } else {
                return `${(d.b_valor*(w*0.8)/d.gp_valor)}px`
            }
        }

        function getNumber(d){

            if (id=='gpholder') {
                return `<span class="BigNumber">${d.gp_valor}%</span>`
            } else if(id=='ouroholder') {
                return `<span class="BigNumber">${d.o_valor}%</span>`
            } else if (id=='prataholder') {
                return `<span class="BigNumber">${d.p_valor}%</span>`
            } else {
                return `<span class="BigNumber">${d.b_valor}%</span>`
            }
        }
        if (w<800){

            selection
            .append('div')
            .attr('class','_holder')
            .attr('id',`#${id}`)
            .style('background-color', d=>getColor(d))
            .style('border-left', 'none')
            .style('width', d=>getW(d))
            .html(d=>getNumber(d))
            .on('mouseover', mouseON1)
            .on('mouseout', mouseOut1)
            ;

        } else {
            selection
            .append('div')
            .attr('class','_holder')
            .attr('id',`#${id}`)
            .style('background-color', d=>getColor(d))
            .style('border-left', 'none')
            .style('height', d=>getH(d))
            .html(d=>getNumber(d))
            .on('mouseover', mouseON1)
            .on('mouseout', mouseOut1)
            ;
        }
        

    }

    function fillDiv2ByCat(selection,id,id2){

        function mouseON1(d,i){
            console.log(id)
            function selectId2(d){
                if (id=='gpholder') {
                    return `${d.gp_cit1}`
                } else if(id=='ouroholder') {
                    return `${d.o_cit1}`
                } else if (id=='prataholder') {
                    return `${d.p_cit1}`
                } else {
                    return `${d.b_cit1}`
                }
            }
            
            let id_selector = `#${id}`
    
            var newid = d.cat;
            var str = newid.replace(/\s+/g, '');
            var nId = rmv(str);
            
            var slct = d3
            .select('body')
            .select('#' + nId)
            ;
            
            slct
            .select(id_selector)
            .style('opacity',1)
            ;
            
            slct
            .selectAll('#Exemplo_' + nId)
            .append('text')
            .attr('class','bigexample')
            .text(d=>selectId2(d,i,id))
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
            .selectAll(`#${id}`)
            .style('opacity',.6)
            ;
            
            slct
            .select('#Exemplo_' + nId)
            .selectAll('.bigexample')
            .remove()
            ;
            
        }

        function getParagraph(d){
            if (id=='gpholder') {
                return `<p class="detalhe"><b>Grand Prix</b><br>${d.gp_nome}</p>`
            } else if(id=='ouroholder') {
                return `<p class="detalhe"><b>Ouro</b><br>${d.o_nome}</p>`
            } else if (id=='prataholder') {
                return `<p class="detalhe"><b>Prata</b><br>${d.p_nome}</p>`
            } else {
                return `<p class="detalhe"><b>Bronze</b><br>${d.b_nome}</p>`
            }
        }

        selection
        .append('div')
        .attr('class', 'descUnique')
        .attr('id', `#${id2}`)
        .html(d => getParagraph(d))
        .on('mouseover', mouseON1)
        .on('mouseout', mouseOut1)
        ;

    }

    var valueHolder = div1
    .append('div')
    .attr('class','valueHolder')
    .style('height', function(d){
        if(w<800){
            return '175px';
        } else {
            return d.gp_valor*7 + 'px'
        }
    })
    ;

    var descHolder = div1
    .append('div')
    .attr('class', 'descHolder')
    ;

    let colors = ['#eea4b5','#f4c7c2','#fbece3','lightgrey']
    let id_ar = ['gpholder','ouroholder','prataholder','bronzeholder']
    let id2_ar = ['gpD','ouroD','prataD','bronzeD']

    fillDiv1ByCat(valueHolder,id_ar[0],colors[0]);
    fillDiv2ByCat(descHolder,id_ar[0],id2_ar[0]);

    fillDiv1ByCat(valueHolder,id_ar[1],colors[1]);
    fillDiv2ByCat(descHolder,id_ar[1],id2_ar[1]);

    fillDiv1ByCat(valueHolder,id_ar[2],colors[2]);
    fillDiv2ByCat(descHolder,id_ar[2],id2_ar[2]);

    fillDiv1ByCat(valueHolder,id_ar[3],colors[3]);
    fillDiv2ByCat(descHolder,id_ar[3],id2_ar[3]);


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
