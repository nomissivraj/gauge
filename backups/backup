var bblChart = {};

(function (self) {
    self.init = function (params) {
        params.forEach(chart => {
            let chartContainer = document.querySelector(chart.target);
            let chartInner = d3.select(chart.target +' .chartInner');
            chartContainer.style.height = chartContainer.offsetWidth + "px";
            chartInner.append("svg");

            if (chartContainer) {
                chart.data.forEach(item => {
                    // For each set of data (including potential multiple circles)

                    item.circles.forEach(circle => {
                        // For each circle in current set of data:
                        // Position Current Circle
                        self.positionCircle(chartInner,item,circle, chartContainer);

                        // Position Current Circle's text

                    });
                });
            } else console.log('no chart container');
        });
    }

    self.positionCircle = function(inner,item,circle, container) {
        //console.log(item.name, item, circle, 'target '+chart.target)
        console.log(inner)
        inner.selectAll("svg").append("circle")
        .attr("cx", function(d){
            var cxVal = (container.offsetWidth / 100) * circle.x;
             if (circle.x + (circle.radius / 10) >= 100) {
                 cxVal = (container.offsetWidth / 100) * (100 - (circle.radius / 10) - 1);
             } else if (circle.x - (circle.radius / 10) <= 0) {
                 cxVal = (container.offsetWidth / 100) * (0 + (circle.radius / 10) + 1);
             }
             return cxVal;
        })
        .attr("cy", function(){
            var cyVal = (container.offsetWidth / 100) * circle.y;
            if (circle.y + (circle.radius / 10) >= 100) {
                cyVal = (container.offsetWidth / 100) * (100 - (circle.radius / 10) - 1);
            } else if (circle.y - (circle.radius / 10) <= 0) {
                cyVal = (container.offsetWidth / 100) * (0 + (circle.radius / 10) + 1);
            }
            return cyVal;
        })
        .attr("r", function(){
            if (circle.r) {
                var radVal = circle.r;
            } else {
                var radVal = (container.offsetWidth / 1000) * 50;
            }
            
            return radVal;
        })
        .attr("data-circlename", item.name)
        .attr("class", "circles")
        .style("fill", circle.style.fill)
        .style("stroke", circle.style.strokeColor);


        // var thing = inner.selectAll(".point1").data([circle]).enter().append("circle");
        // console.log(thing)
        // var test = thing
        // .attr("cx", (d) => {
        //     console.log('wubb')
        //     var cxVal = (chartContainer.offsetWidth / 100) * d.x;
        //     if (d.x + (d.radius / 10) >= 100) {
        //         cxVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
        //     } else if (d.x - (d.radius / 10) <= 0) {
        //         cxVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
        //     }
        //     return cxVal;
        // })
        // .attr("cy", (d) => {
        //     var cyVal = (chartContainer.offsetWidth / 100) * d.y;
        //     if (d.y + (d.radius / 10) >= 100) {
        //         cyVal = (chartContainer.offsetWidth / 100) * (100 - (d.radius / 10) - 1);
        //     } else if (d.y - (d.radius / 10) <= 0) {
        //         cyVal = (chartContainer.offsetWidth / 100) * (0 + (d.radius / 10) + 1);
        //     }
        //     return cyVal;
        // })
        // .attr("r", "40")
        // .attr("data-circlename", (d) => {
        //     return item.name;
        // })
        // .attr("class", "point1")
        // .style("fill", circle.style.fill)
        // .style("stroke", circle.style.strokeColor);
    }

    self.positionText = function() {

    }
})(bblChart);

window.addEventListener("load", function () {
    let chart1 = {
        target: "#chartContainer1",
        data: [
            {
                name: "Services",
                circles: [
                    { // Circle 1
                        type: "actual",
                        x: 60,
                        y: 50,
                        style: {
                            fill: " rgb(255, 223, 158)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    },
                    { // Circle 2
                        type: "behaviour",
                        x: 50,
                        y: 20,
                        r: 40,
                        style: {
                            fill: "rgb(170, 119, 180)",
                            strokeColor: "rgb(80, 32, 117)"
                        }
                    },
                    { // Circle 3
                        type: "target",
                        x: 70,
                        y: 30,
                        r: 40,
                        style: {
                            fill: "rgb(98, 189, 244)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    }
                ]
            },
            {
                name: "Client",
                circles: [
                    { // Circle 1
                        type: "actual",
                        x: 30,
                        y: 90,
                        style: {
                            fill: " rgb(255, 223, 158)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    },
                    { // Circle 2
                        type: "behaviour",
                        x: 10,
                        y: 10,
                        r: 40,
                        style: {
                            fill: "rgb(170, 119, 180)",
                            strokeColor: "rgb(80, 32, 117)"
                        }
                    },
                    { // Circle 3
                        type: "target",
                        x: 80,
                        y: 20,
                        r: 40,
                        style: {
                            fill: "rgb(98, 189, 244)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    }
                ]
            }
        ]
    };
    let chart2 = {
        target: "#chartContainer2",
        data: [
            {
                name: "Services",
                circles: [
                    { // Circle 1
                        type: "actual",
                        x: 60,
                        y: 50,
                        style: {
                            fill: " rgb(255, 223, 158)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    },
                    { // Circle 2
                        type: "behaviour",
                        x: 50,
                        y: 20,
                        r: 40,
                        style: {
                            fill: "rgb(170, 119, 180)",
                            strokeColor: "rgb(80, 32, 117)"
                        }
                    },
                    { // Circle 3
                        type: "target",
                        x: 70,
                        y: 30,
                        r: 40,
                        style: {
                            fill: "rgb(98, 189, 244)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    }
                ]
            },
            {
                name: "Client",
                circles: [
                    { // Circle 1
                        type: "actual",
                        x: 30,
                        y: 90,
                        style: {
                            fill: " rgb(255, 223, 158)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    },
                    { // Circle 2
                        type: "behaviour",
                        x: 10,
                        y: 10,
                        r: 40,
                        style: {
                            fill: "rgb(170, 119, 180)",
                            strokeColor: "rgb(80, 32, 117)"
                        }
                    },
                    { // Circle 3
                        type: "target",
                        x: 80,
                        y: 20,
                        r: 40,
                        style: {
                            fill: "rgb(98, 189, 244)",
                            strokeColor: "rgb(92, 113, 192)"
                        }
                    }
                ]
            }
        ]
    }

    bblChart.init([chart1, chart2]);
});