var gauge = {};

// TODO: 
/*
    - Draw needle
    - Draw segment (if)
    - Redraw on resize
    - Animate
    - Don't run if width or height of container =  0 || if element is hidden
    - Don't run if graph already exists for current item - alternatively, simply replace existing item
    - Make sure that if element is initially hidden, then revealed, that element is then drawn




NOTES: FRIDAY 29th Nov :: Calculate widths/strokes etc. as a percentage of element width. so convert width to 0-100 % value range before appling width calculations

*/

var opts = {
    'primaryColor': '#425563',
    'secondaryColor': '#6d899e'

};


(function (self) {
    self.init = function (identifier) {
        // Get all gauges - get their values and run function for each one
        var gauges = document.querySelectorAll(identifier);

        gauges.forEach(function (_this) {
            var curVal = parseInt(_this.dataset.currentVal),
                startVal = parseInt(_this.dataset.startingVal),
                id = _this.getAttribute('id'),
                cont = document.getElementById('#' + id),
                width = _this.offsetWidth;
            self.draw(id, width, startVal, curVal);
        });
    }

    self.draw = function (id, width, startVal, curVal) {
         // Ensure that there is never more than one gauge per container
        document.querySelector('#' + id + ' svg') ? d3.select('#'+ id+' svg').remove(): null;

        // Append SVG
        // Handle size of svg
        d3.select('#'+ id).append('svg').attr('id', id + '-svg').attr('width', width).attr('height', width / 2 );

        // call draw(s)
        self.arc(id+'-svg', -90, 90, width);
        startVal ? self.segment(id+'-svg', startVal, width) : null;
        self.needle(id+'-svg', 0, 360, curVal, width);
    }

    self.arc = function (target, sAngle, eAngle, width) {

        // Temporary dimensions and positional
        var x = width / 2,
            y = width / 2 - 20,
            radius = width /2 - 40; /// NEED TO MAKE THIS DYNAMIC - BASED ON WIDTH OF CONTAINER !!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Base arc path
        d3.select('#'+target).append('path')
       .attr("d", self.describeArc(x, y, radius, sAngle, eAngle))
        .attr("fill", "none")
        .attr("stroke", opts.primaryColor)
        .attr("stroke-width", width / 10); 
    }

    self.segment = function (target, pos, width) {
        // Temporary dimensions and positional
        var x = width / 2,
            y = width / 2 - 20,
            radius = width/2 - 40; // THIS ONE ALSO NEEDS TO BE DYNAIMC - BASED ON WIDTH OF CONTAINER
            // Returns starting angle position and ending angle position as a percentage of 180 degrees
            if (pos < 5) {pos = 5} else if (pos > 95) {pos = 95};
            sAngle = self.mapRange(pos - 5, 0, 100, -90, 90);
            eAngle = self.mapRange(pos + 5, 0, 100, -90, 90);

        d3.select('#'+target).append('path')
        .attr("d", self.describeArc(x, y, radius, sAngle, eAngle))
        .attr("fill", "none")
        .attr("stroke", opts.secondaryColor)
        .attr("stroke-width", (width / 10) + 0.05);

        //left stroke
        d3.select('#'+target).append('path')
        .attr("d", self.describeArc(x, y, radius, sAngle - .5, sAngle))
        .attr("fill", "none")
        .attr("stroke", '#ffffff')
        .attr("stroke-width", (width / 10) + 0.05);

        //right stroke
         d3.select('#'+target).append('path')
         .attr("d", self.describeArc(x, y, radius, eAngle, eAngle + .5))
         .attr("fill", "none")
         .attr("stroke", '#ffffff')
         .attr("stroke-width", (width / 10) + 0.05);
        // Draw strokes either side

    }
    
    self.needle = function (target, sAngle, eAngle, curVal, width) {
        // draw base circle of needle
        var x = width / 2,
            y = width / 2 - 20,
            radius = width / 17; /// NEED TO MAKE THIS '20' DYNAMIC - BASED ON WIDTH OF CONTAINER !!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Base arc path
        d3.select('#'+target).append('path')
        .attr("d", self.describeArc(x, y, radius, sAngle, eAngle - 0.0001))
        .attr("fill", "#ccc"); 


        var needleLength = width / 2 - 40;
        curVal = self.mapRange(curVal, 0, 100, -90, 90)
        // draw needle
        let p1 = x - radius +','+ y, // bottom left point
            p2 = x + radius +','+ y, // bototm right point
            p3 = x+','+ 20;
            //p3 = self.polarToCartesian(x, y, needleLength, curVal).x  +','+ self.polarToCartesian(x, y, needleLength, curVal).y;
        console.log(p1,p2,p3)
        d3.select('#'+target).append('polygon')
        .attr("points", p1 +' '+ p2 +' '+p3)
        .attr("fill", "#ccc")
        .attr("transform", 'rotate(0, '+x+','+y+')');
        //.attr("points", +120+','+120+' '+130+','+30+' '+140+','+120);
    };

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UTILITY METHODS :

    self.mapRange = function (num, min, max, newMin, newMax) {
        return (num - min) * (newMax - newMin) / (max - min) + newMin;
    };

    self.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        // Function to calculate starting and ending postions of arc
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    self.describeArc = function (x, y, radius, startAngle, endAngle) {
        // Function to draw arc
        var start = self.polarToCartesian(x, y, radius, endAngle);
        var end = self.polarToCartesian(x, y, radius, startAngle);

        // 
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var arc = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            // "L", x, y,
            // "L", start.x, start.y
        ].join(" ");
        return arc;
    };

    
    
})(gauge);

window.addEventListener("load", function () {
    console.log('boom')
    gauge.init('.gaugeContainer')
});

window.addEventListener("resize", function () {
    console.log('boom')
    gauge.init('.gaugeContainer')
});