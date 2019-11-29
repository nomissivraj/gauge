//Colors
var circleFill = "#ffdf9e";
var circleStroke = "#5c71c0";

var secondCircleFill = "#aa77b4";
var secondCircleStroke = "#502075";

var thirdCircleFill = "#62bdf4";
var thirdCircleStroke = "#5c71c0";

var textColor = "#fff";

const chartContainer = document.querySelector('.chartContainer');
//console.log(chartContainer)
var chartInner = d3.select(".chartContainer .chartInner").append("svg");
var toggleContainer = document.querySelector('.toggleContainer');
var circles, secondCircles, thirdCircles, text;

// Test Data
var circleData = [{
    "actualcx": 60,
    "actualcy": 50,
    "behaviourcx": 50,
    "behaviourcy": 20,
    "targetcx": 70,
    "targetcy": 30,
    "name": "Services"
},
{
    "actualcx": 30,
    "actualcy": 90,
    "behaviourcx": 10,
    "behaviourcy": 10,
    "targetcx": 80,
    "targetcy": 20,
    "name": "Client"
}
];

//Circles
var circlePosition = function () {
    chartContainer.style.height = chartContainer.offsetWidth + "px";
    console.log(chartContainer.offsetWidth)
    circles = chartInner.selectAll(".circles").data(circleData).enter().append("circle");
    console.log(circles);
    var circleAttr = circles
        .attr("cx", (d) => {
            var cxVal = (chartContainer.offsetWidth / 100) * d.actualcx;
            if (d.actualcx + (d.radius / 10) >= 100) {
                cxVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.actualcx - (d.radius / 10) <= 0) {
                cxVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cxVal;
        })
        .attr("cy", (d) => {
            var cyVal = (chartContainer.offsetWidth / 100) * d.actualcy;
            if (d.actualcy + (d.radius / 10) >= 100) {
                cyVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.actualcy - (d.radius / 10) <= 0) {
                cyVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cyVal;
        })
        .attr("r", (d) => {
            var radVal = (chartContainer.offsetWidth / 1000) * 50;
            return radVal;
        })
        .attr("data-circlename", (d) => {
            return d.idstring;
        })
        .attr("class", "circles")
        .style("fill", circleFill)
        .style("stroke", circleStroke);

    secondCircles = chartInner.selectAll(".circles2").data(circleData).enter().append("circle");
    var secondCirclesAttr = secondCircles
        .attr("cx", (d) => {
            console.log(d)
            var cxVal = (chartContainer.offsetWidth / 100) * d.behaviourcx;
            if (d.behaviourcx + (d.radius / 10) >= 100) {
                cxVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.behaviourcx - (d.radius / 10) <= 0) {
                cxVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cxVal;
        })
        .attr("cy", (d) => {
            var cyVal = (chartContainer.offsetWidth / 100) * d.behaviourcy;
            if (d.behaviourcy + (d.radius / 10) >= 100) {
                cyVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.behaviourcy - (d.radius / 10) <= 0) {
                cyVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cyVal;
        })
        .attr("r", "40")
        .attr("data-circlename", (d) => {
            return d.idstring;
        })
        .attr("class", "circles2")
        .style("fill", secondCircleFill)
        .style("stroke", secondCircleStroke);

    thirdCircles = chartInner.selectAll(".circles3").data(circleData).enter().append("circle");
    var thirdCirclesAttr = thirdCircles
        .attr("cx", (d) => {
            var cxVal = (chartContainer.offsetWidth / 100) * d.targetcx;
            if (d.targetcx + (d.radius / 10) >= 100) {
                cxVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.targetcx - (d.radius / 10) <= 0) {
                cxVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cxVal;
        })
        .attr("cy", (d) => {
            var cyVal = (chartContainer.offsetWidth / 100) * d.targetcy;
            if (d.targetcy + (d.radius / 10) >= 100) {
                cyVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.targetcy - (d.radius / 10) <= 0) {
                cyVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return cyVal;
        })
        .attr("r", "40")
        .attr("data-circlename", (d) => {
            return d.idstring;
        })
        .attr("class", "circles3")
        .style("fill", thirdCircleFill)
        .style("stroke", thirdCircleStroke);
};

var textPosition = function () {
    text1 = chartInner.selectAll(".text1").data(circleData).enter().append("text");
    var textAttr1 = text1
        .text((d) => {
            return d.name;
        })
        .attr("data-circlename", (d) => {
            return d.name;
        })
        .attr("x", (d) => {
            var xVal = (chartContainer.offsetWidth / 100) * d.actualcx;
            if (d.cx + (d.radius / 10) >= 100) {
                xVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cx - (d.radius / 10) <= 0) {
                xVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return xVal;
        })
        .attr("y", (d) => {
            var yVal = (chartContainer.offsetWidth / 100) * d.actualcy;
            if (d.cy + (d.radius / 10) >= 100) {
                yVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cy - (d.radius / 10) <= 0) {
                yVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return yVal;
        })
        .attr("class", ".text1")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", circleStroke);

        text2 = chartInner.selectAll(".text2").data(circleData).enter().append("text");
        var textAttr2 = text2
        .text((d) => {
            return d.name;
        })
        .attr("data-circlename", (d) => {
            return d.name;
        })
        .attr("x", (d) => {
            var xVal = (chartContainer.offsetWidth / 100) * d.behaviourcx;
            if (d.cx + (d.radius / 10) >= 100) {
                xVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cx - (d.radius / 10) <= 0) {
                xVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return xVal;
        })
        .attr("y", (d) => {
            var yVal = (chartContainer.offsetWidth / 100) * d.behaviourcy;
            if (d.cy + (d.radius / 10) >= 100) {
                yVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cy - (d.radius / 10) <= 0) {
                yVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return yVal;
        })
        .attr("class", "text2")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", circleStroke);

        text3 = chartInner.selectAll(".text3").data(circleData).enter().append("text");
        var textAttr3 = text3
        .text((d) => {
            return d.name;
        })
        .attr("data-circlename", (d) => {
            return d.name;
        })
        .attr("x", (d) => {
            var xVal = (chartContainer.offsetWidth / 100) * d.targetcx;
            if (d.cx + (d.radius / 10) >= 100) {
                xVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cx - (d.radius / 10) <= 0) {
                xVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return xVal;
        })
        .attr("y", (d) => {
            var yVal = (chartContainer.offsetWidth / 100) * d.targetcy;
            if (d.cy + (d.radius / 10) >= 100) {
                yVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
            } else if (d.cy - (d.radius / 10) <= 0) {
                yVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
            }
            return yVal;
        })
        .attr("class", "text3")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", circleStroke);
}

window.addEventListener("load", function () {
    circlePosition();
    textPosition();
});


window.addEventListener("resize", function () {
    circles.remove();
    circlePosition();
    text.remove();
    textPosition();

});


////console.log(circleData);
//let nameTabs = circleData.map((entry) => {
//    return `
//          <li>
//                <div class="pp-switch-toggle-group">
//                    <div class=" pp-switch-toggle">
//                        <label for="criteria-${entry.idstring}" class="pp-switch-label circleToggle" data-circlename="${entry.idstring}">
//                            <span class="pp-label">${entry.idstring}</span>
                            
//                            <button class="btn btn-primary pull-right ml-2" data-toggle-partial="StrategicDirection/Notes">
//                                Notes
//                            </button>
//                            <button class="btn btn-primary pull-right ml-2" data-toggle-partial="StrategicDirection/BehaviourFeel">
//                                Behaviour Feel
//                            </button>
//                            <button class="btn btn-primary pull-right" data-toggle-partial="StrategicDirection/PortfolioAnalysis">
//                                Portfolio Analysis
//                            </button>
//                            <input type="checkbox" class="circleCheckBox" id="criteria-${entry.idstring}" data-circlename="${entry.idstring}" checked>
//                            <span class="pp-switch" data-circlename="${entry.idstring}"></span>
//                        </label>
//                    </div>
//                </div>
//            </li>
//            `;
//}).join('');
////console.log(nameTabs, circleData);
//toggleContainer.insertAdjacentHTML('beforeend', nameTabs);

// var toggleChecks = document.querySelectorAll('.circleCheckBox');

// toggleChecks.forEach((toggleCheck) => {
//     toggleCheck.addEventListener('change', (e) => {
//         console.log('checked');
//         var name = e.currentTarget.getAttribute('data-circlename');
//         var svgItems = document.querySelectorAll('svg [data-circlename="' + name + '"]');
//         //console.log(name,svgItems);
//         svgItems.forEach((svgItem) => {
//             console.log(svgItem);
//             if (!svgItem.classList.contains('d-none')) {
//                 svgItem.classList.add('d-none');
//             } else {
//                 svgItem.classList.remove('d-none');
//             }
//         });
//     });
// });