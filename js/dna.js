var animate_dna;
var offset_t = 0;

function getNumAsPixelsStr(num) {
    return num + 'px';
}

function add_DNA_line(x1, x2, y, r1, r2, color, opacity1, opacity2, defs, lines_group) {
    var group          = document.createElementNS("http://www.w3.org/2000/svg", 'g'); 
    var circle1        = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
    var circle2        = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
    var line           = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
    var stop1          = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    var stop2          = document.createElementNS("http://www.w3.org/2000/svg", 'stop');

    y = Math.round(y);
    // circle1.cx = x1;
    // circle1.cy = y;
    // circle1.r = r1;
    circle1.setAttributeNS(null,'cx',x1);
    circle1.setAttributeNS(null,'cy',y);
    circle1.setAttributeNS(null,'r',r1);
    circle1.style.fill = color;
    circle1.style["fill-opacity"] = opacity1;

    circle2.setAttributeNS(null,'cx',x2);
    circle2.setAttributeNS(null,'cy',y);
    circle2.setAttributeNS(null,'r',r2);
    circle2.style.fill = color;
    circle2.style["fill-opacity"] = opacity2;

    var leftX, rightX;
    if (x1<x2) {
        leftX = x1+r1;
        rightX = x2-r2;
        stop1.style["stop-opacity"] = opacity1;
        stop2.style["stop-opacity"] = opacity2;
    }
    else {
        leftX = x2+r2;
        rightX = x1-r1;
        stop1.style["stop-opacity"] = opacity2;
        stop2.style["stop-opacity"] = opacity1;
    }
    line.setAttributeNS(null,'x1',leftX);
    line.setAttributeNS(null,'y1',y);
    line.setAttributeNS(null,'x2',rightX);
    line.setAttributeNS(null,'y2',y);
    line.setAttributeNS(null, "stroke","url(#gradient" + y + ")");
    line.style["stroke-width"] = 2;

    stop1.setAttributeNS(null, "offset", "0%");
    stop1.setAttributeNS(null,"stop-color",color);
    stop2.setAttributeNS(null, "offset", "100%");
    stop2.setAttributeNS(null,"stop-color",color);
    linearGradient.setAttributeNS(null, 'gradientUnits', 'userSpaceOnUse');
    linearGradient.setAttributeNS(null, 'class', 'lineGradient');

    linearGradient.id = "gradient" + y;

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);

    group.setAttributeNS(null, "class","lineGroup");
    group.appendChild(line);
    group.appendChild(circle1);
    group.appendChild(circle2);
    lines_group.appendChild(group);
}

function draw_all_DNA_lines(chart_info, w1, h, offset, defs, linesGroup) {
    var numLines   = 0;
    var rad_h      = 3*Math.PI;
    var maxRadius  = 9;
    var minRadius  = 2;
    var minOpacity = 0.2;
    var maxOpacity = 1;

    for (var i in chart_info.lines) {
        if (chart_info.lines.hasOwnProperty(i)) numLines++;
    }

    // clear previous lines (if any)
    for (var i=defs.children.length-1; i>=0; i--) {
        var el = defs.children[i];
        if (el.getAttribute("class")=="lineGradient") {
            defs.removeChild(defs.children[i]);
        };
    }
    
    while (linesGroup.hasChildNodes()) {
        linesGroup.removeChild(linesGroup.lastChild);
    }

    for (var i=0; i<numLines; i++) {
        var bar_id = chart_info.lines[i.toString()]; 
        var color = chart_info.bars[bar_id].color;
        var t = rad_h/numLines * i;
        var v1=Math.sin(t+offset);
        var v2=Math.sin(t+offset+Math.PI);
        var z1=Math.cos(t+offset);
        var z2=Math.cos(t+offset+Math.PI);

        var x1 = maxRadius + (v1+1)/2*(w1-(2*maxRadius));
        var x2 = maxRadius + (v2+1)/2*(w1-(2*maxRadius));

        var stepY = (h - 2*(maxRadius))/(numLines-1);
        var y = maxRadius + stepY*i;

        var r1, r2;
        var opacity1, opacity2;

        r1=minRadius + (z1+1)/2*(maxRadius-minRadius);
        r2=minRadius + (z2+1)/2*(maxRadius-minRadius);
        opacity1=minOpacity + (z1+1)/2*(maxOpacity-minOpacity);
        opacity2=minOpacity + (z2+1)/2*(maxOpacity-minOpacity);
        add_DNA_line(x1, x2, y, r1, r2, color, opacity1, opacity2, defs, linesGroup) 
    }
}

function add_bars(chart_info, x1, x2, x3, defs, connectorGroup, mainGroup, on_selection_change) {
    
    var connector_radius = 8;
    chart_info.bars.forEach(element => {

        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
        var stop1          = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        var stop2          = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        var textbox        = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var tspan1         = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
        var tspan2         = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');



        stop1.setAttributeNS(null, "offset", "40%");
        stop1.setAttributeNS(null, "stop-color",element.color);
        stop1.setAttributeNS(null, "stop-opacity", "0.0");
        
        stop2.setAttributeNS(null, "offset", "100%");
        stop2.setAttributeNS(null, "stop-color",element.color);
        stop2.setAttributeNS(null, "stop-opacity","0.4");
        
        linearGradient.setAttribute('gradientUnits', 'userSpaceOnUse');
        linearGradient.id = "bar_gradient" + element.id;

        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        defs.appendChild(linearGradient);

        rect.id = "bar" + element.id;
        rect.setAttributeNS(null, 'x', x1);
        rect.setAttributeNS(null, 'y', element.from_y);
        rect.setAttributeNS(null, 'height',  (element.to_y -  element.from_y) + 'px');
        rect.setAttributeNS(null, 'width', (x2-x1) + 'px') ;
        rect.setAttributeNS(null, "fill","url(#bar_gradient" + element.id + ")");
        rect.addEventListener('mouseover', function(){ mouseOverEffect(stop2); });
        rect.addEventListener('mouseout' , function(){ mouseOutEffect(stop2); });
        // rect.addEventListener('click', function() { 
        //         drawConnector(connectorGroup, chart_info, x2,x3,parseInt(this.id.substring(3)));
        //         on_selection_change(element);
        //     });


        textbox.setAttributeNS(null, 'y', (element.from_y + element.to_y)/2 - 4);
        textbox.setAttributeNS(null, 'text-anchor', "end");
        textbox.setAttributeNS(null, 'text-anchor', "end");
        textbox.setAttributeNS(null, "font-family", "Open Sans");
        textbox.setAttributeNS(null, "font-size", "13");
        textbox.setAttributeNS(null, "fill", element.color);

        // Below commented out code that is related to the perecent shown next to
        // the malware family name in the side bar. It shouldn't be shown

        // tspan1.setAttributeNS(null, 'x', x2-15);
        // tspan1.appendChild(document.createTextNode(Math.round(element.percent) + "%"));

        // tspan2.setAttributeNS(null, 'x', x2-15);
        tspan2.setAttributeNS(null, 'x', x2-15);
        // tspan2.setAttributeNS(null, 'dy', 16);
        tspan2.setAttributeNS(null, 'dy', 8);
        tspan2.appendChild(document.createTextNode(element.name));

        // textbox.appendChild(tspan1);
        textbox.appendChild(tspan2);
        
        mainGroup.appendChild(textbox);
        mainGroup.appendChild(rect);
        
    }); // forEach
}

function add_connector(x1, y1, x2, y2 ,r1, r2, connector_cr, opacity, color, connectorGroup) {
    var left_circle         = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
    var right_circle        = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    var left_line           = document.createElementNS("http://www.w3.org/2000/svg", 'line');  
    var right_line          = document.createElementNS("http://www.w3.org/2000/svg", 'line');  
    var vertical_line       = document.createElementNS("http://www.w3.org/2000/svg", 'line');  
    var path                = document.createElementNS("http://www.w3.org/2000/svg", 'path');  
    
    // left_circle.cx = x1;
    // left_circle.cy = y1;
    // left_circle.r = r1;
    left_circle.setAttributeNS(null,'cx',x1);
    left_circle.setAttributeNS(null,'cy',y1);
    left_circle.setAttributeNS(null,'r',r1);
    left_circle.style.fill = color;
    left_circle.style["fill-opacity"] = opacity;
    
    // right_circle.cx = x2;
    // right_circle.cy = y2;
    // right_circle.r = r2;
    right_circle.setAttributeNS(null,'cx',x2);
    right_circle.setAttributeNS(null,'cy',y2);
    right_circle.setAttributeNS(null,'r',r2);
    right_circle.style.fill = color;
    right_circle.style["fill-opacity"] = opacity;

    var path_string = "";
    path_string =  "M " + x1 + " " + y1 + " "; // move to x1, y1
    path_string += "L " + ((x1+x2)/2-connector_cr)  + " " + y1 + " "; // left line
    path_string += "A " + connector_cr + " " + connector_cr + " 0 0 0 " + ((x1+x2)/2) + " " + (y1-connector_cr) + " "; // curve
    path_string += "L " + ((x1+x2)/2)  + " " + (y2+connector_cr) + " "; // vertical line
    path_string += "A " + connector_cr + " " + connector_cr + " 0 0 1 " + ((x1+x2)/2 + connector_cr) + " " + y2 + " "; // curve
    path_string += "L " + x2  + " " + y2 + " "; // left line
    
    path.setAttributeNS(null,'d', path_string);
    path.setAttributeNS(null,'stroke',color);
    path.setAttributeNS(null,'fill',"none");
 
    while (connectorGroup.firstChild) {
        connectorGroup.removeChild(connectorGroup.firstChild);
    }

    connectorGroup.appendChild(path);
    connectorGroup.appendChild(left_circle);
    connectorGroup.appendChild(right_circle);
}

function get_chart_info(data, height, numLines) {
    var total_value = 0;
    var colors = ["#f24444", "#3594ff", "#ffb72d", "#56b40a"];
    var accumulated_y = 0;
    var accumulated_lines = 0;
    var line_height = height/numLines;

    var res = {"bars" : [], "lines" : {}};
    var i=0;

    data.forEach(element => {
        total_value += element.value;
    });

    data.forEach(element => {
        var data_item = {};
        data_item.id = i;
        data_item.item_height = (element.value/total_value) * height;
        data_item.name = element.name;
        data_item.value = element.value;
        data_item.line_count = Math.floor(data_item.item_height/line_height);
        data_item.from_line = accumulated_lines ;
        data_item.to_line = data_item.from_line + data_item.line_count -1;
        data_item.from_y = accumulated_y;
        data_item.color = colors[i];
        data_item.percent = 100 * element.value / total_value;
        
        accumulated_lines += data_item.line_count;
        // last item shoudl fill the rest of the space
        if (i==data.length-1) {
            data_item.to_line = numLines;
            data_item.line_count = data_item.to_line - data_item.from_line;
        }
        data_item.to_y = data_item.from_y + data_item.line_count*line_height;
        accumulated_y = data_item.to_y;
        for (var l=data_item.from_line; l<=data_item.to_line; l++) {
            res.lines[l.toString()] = i;
        }
        i++;
        res.bars.push(data_item);
    });

    return res;
}

function drawDNA(svg_id, data, on_selection_change, selected_item_index) {
 // var h          = 390,
     var h         = 350,
        w1         = 130,
        w2         = 165,
        w3         = 80;
        numLines   = 22,
        offset     = Math.PI/1.8;
        chart_info = get_chart_info(data,h,numLines)

    var svg = document.getElementById(svg_id);
    svg.style.width = (w1+w2+w3) + 'px' ;
    svg.style.height = h + 'px';
    
    var defs;
    var defs_found = false;
    for (var i=0; i<svg.childNodes.length; i++) {
        if (svg.childNodes[i].nodeName == "defs") {
            defs_found = true;
            defs = svg.childNodes[i];
        }
    }
    if (!defs_found) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
        svg.appendChild(defs);
    }
    
    var mainGroup  = document.createElementNS("http://www.w3.org/2000/svg", 'g'); 
    var linesGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g'); 
    var barsGroup  = document.createElementNS("http://www.w3.org/2000/svg", 'g'); 
    var connectorGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g'); 
    var newRect        = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); 

    function startAnimation() {
        setInterval( function () {
            offset_t += 0.01;
            draw_all_DNA_lines(chart_info, w1, h, offset + offset_t, defs, linesGroup);
        }, 50); 
    }

    mainGroup.id = "dna_chart";
    // svg.addEventListener('mouseover', function(){ 
    //     animate_dna = setInterval( function () {
    //         offset_t += 0.01;
    //         draw_all_DNA_lines(chart_info, w1, h, offset + offset_t, defs, linesGroup);
    //     }, 
    //     50); 
    // });
    // svg.addEventListener('mouseout' , function(){ clearInterval(animate_dna); });
    setTimeout(startAnimation, 1000);

    newRect.id = "bkg";
    newRect.style.width = (w1+w2+w3) + 'px';
    newRect.style.height = h + 'px';
    newRect.style.fill = "none";
    mainGroup.appendChild(newRect);

    linesGroup.id = "lines";
    barsGroup.id = "bars";
    mainGroup.appendChild(linesGroup);
    mainGroup.appendChild(barsGroup);
    connectorGroup.id = "DNAconnectorGroup";

    chart_series_data = get_chart_info(data, h, numLines);

    // add DNA lines
    draw_all_DNA_lines(chart_info, w1, h, offset, defs, linesGroup);


    // add bars with gradients on the right
    add_bars(chart_info, 0, w1+w2, w1+w2+w3, defs, connectorGroup, barsGroup, on_selection_change);
    drawConnector(connectorGroup, chart_info, w1+w2, w1+w2+w3, selected_item_index);
    mainGroup.appendChild(connectorGroup);
    svg.appendChild(mainGroup);


}

function drawConnector(connectorGroup, chart_info, x2, x3, selected_item_index) {
    var connector_y= 20;
    var connector_r1 = 8;
    var connector_r2 = 4;
    var connector_cr = 10;

    chart_info.bars.forEach(element => {
        if (element.id == selected_item_index) {
            add_connector(x2, (element.from_y + element.to_y)/2,  x3-connector_r2, connector_y, connector_r1, connector_r2, connector_cr, 1, element.color, connectorGroup)
        }
    });
}

function mouseOverEffect(stop_elem) {
    stop_elem.setAttributeNS(null, "stop-opacity","0.8");
}

function mouseOutEffect(stop_elem) {
    stop_elem.setAttributeNS(null, "stop-opacity","0.4");
}


