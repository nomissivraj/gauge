var gauge = {};

(function (self) {
    self.init = function (identifier) {
        // Get all gauges - get their values and run function for each one
        var gauges = document.querySelectorAll(identifier);
        if (!gauges) return;
        gauges.forEach(function (_this) {
            var curVal = parseInt(_this.dataset.currentVal, 10),
                startVal = parseInt(_this.dataset.startingVal, 10),
                id = _this.getAttribute('id');


            if (startVal < 5) {
                startVal = 5;
            } else if (startVal > 95) {
                startVal = 95;
            }
            self.draw(curVal, startVal, id);
        });
    };

    self.draw = function (curVal, startVal, id) {
        var maxVal = 100,
            percentValue = curVal / maxVal,
            percentValueStart = startVal / maxVal;


        var barWidth, chart, chartInset, degToRad, repaintGauge,
            height, margin, numSections, padRad, percToDeg, percToRad,
            percent, percentStart, radius, sectionIndx, svg, totalPercent, width;

        percent = percentValue;
        percentStart = percentValueStart;

        numSections = 1;
        sectionPerc = 1 / numSections / 2;
        padRad = 0.01;
        chartInset = 10;

        // Orientation of gauge:
        totalPercent = .75;

        el = d3.select('#' + id);
        margin = { // THIS CAN BE MOVED TO INITIALISATION !!!!!!!!!!!!!!!!!!!!!!
            top: 0,
            right: 20,
            bottom: 30,
            left: 20
        };
        
        width = el[0][0].offsetWidth - margin.left - margin.right;
        if (width === 0 || width < 0) return;
        height = width;
        radius = Math.min(width, height) / 2;
        barWidth = 40 * width / 300;

        //Utility methods 

        percToDeg = function (perc) {
            return perc * 360;
        };

        percToRad = function (perc) {
            return degToRad(percToDeg(perc));
        };

        degToRad = function (deg) {
            return deg * Math.PI / 180;
        };

        // Create SVG element
        d3.select('#' + id + ' svg') ? d3.select('#' + id + ' svg').remove() : null;
        svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', width / 1.5);

        // Add layer for the panel
        chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height +
            margin.top) / 2) + ")");


        chart.append('path').attr('class', "arc chart-first");
        chart.append('path').attr('class', "arc chart-second");
        chart.append('path').attr('class', "arc chart-third");
        formatValue = d3.format('1%');

        arc3 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
        arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
        arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);

        repaintGauge = function () {
            perc = (startVal - 5) / 100;
            var next_start = totalPercent;
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 2);
            next_start += perc / 2;

            if (startVal >= 10) {
                arc1.startAngle(arcStartRad).endAngle(arcEndRad);

            } else {
                arc1.startAngle(0).endAngle(0);
            }


            perc = 10 / 100;
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 2);
            next_start += perc / 2;

            arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

            perc = (100 - (startVal + 5)) / 100;
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 2);
            next_start += perc / 2;

            if (startVal < 95) {
                arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
            } else if (startVal >= 95) {
                arc3.startAngle(0).endAngle(0);
            }

            //arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

            chart.select(".chart-first").attr('d', arc1);
            chart.select(".chart-second").attr('d', arc2);
            chart.select(".chart-third").attr('d', arc3);

        };

        var Needle = (function () {

            //Helper function that returns the `d` value for moving the needle
            var recalcPointerPos = function (perc) {
                var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
                thetaRad = percToRad(perc / 2);
                centerX = 0;
                centerY = 0;
                topX = centerX - this.len * Math.cos(thetaRad);
                topY = centerY - this.len * Math.sin(thetaRad);
                leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
                leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
                rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
                rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
                return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX +
                    " " + rightY;
            };

            function Needle(el) {
                this.el = el;
                this.len = width / 2.5;
                this.radius = this.len / 8;
            }

            Needle.prototype.render = function () {
                this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0)
                    .attr('r', this.radius);

                return this.el.append('path').attr('class', 'needle').attr('id', 'client-needle')
                    .attr('d', recalcPointerPos.call(this, 0));
            };

            Needle.prototype.moveTo = function (perc) {
                var self,
                    oldValue = this.perc || 0;

                this.perc = perc;
                self = this;

                // Reset pointer position
                this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween(
                    'reset-progress',
                    function () {
                        return function (percentOfPercent) {
                            var progress = (1 - percentOfPercent) * oldValue;

                            repaintGauge(progress);
                            return d3.select(this).attr('d', recalcPointerPos.call(self,
                                progress));
                        };
                    });

                this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle')
                    .tween('progress', function () {
                        return function (percentOfPercent) {
                            var progress = percentOfPercent * perc;

                            repaintGauge(progress);
                            return d3.select(this).attr('d', recalcPointerPos.call(self,
                                progress));
                        };
                    });

            };


            return Needle;

        })();

        needle = new Needle(chart);
        needle.render();
        needle.moveTo(percent);
    };

})(gauge);

window.addEventListener("load", function() {
    console.log('boom')
    gauge.init('.gaugeContainer')
});