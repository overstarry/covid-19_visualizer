<template>
  <svg width="500" height="500"></svg>
</template>

<script>
  const d3 = require('d3');

  export default {
    mounted: function () {
      this.draw();
    },
    methods: {
      draw() {

        d3.json("countries.json").then((data) => {
          let svg = d3.select('body').select('svg');
          let width = 500;
          let height = 500;
          let scale = 200;
          let origin = {
            x: 50,
            y: -40
          };
          let color = d3.scaleOrdinal().domain([0, 10]).range(d3.schemeCategory10);
          let earth = svg.append('svg').attr('class', 'earth')
            .attr('width', width).attr('height', height);
          let group = earth.append('g').datum({x: 0, y: 0});


          let projection = d3.geoOrthographic()
            .scale(scale)
            .translate([width / 2, height / 2])
            .center([0, 0])
            .clipAngle(90);

          let geoPath = d3.geoPath().projection(projection);
          let graticule = d3.geoGraticule()

          group.append('path')
            .datum(graticule)
            .attr('class', "graticule")
            .attr("d", geoPath);
          group.selectAll('path.land').data(data.features).join('path')
            .attr('class', 'land')
            .attr('d', geoPath)
            .attr('fill', function (d, i) {
              return color(i % 22);
            })
            .on('mouseover', function (d) {
              d3.select(this.parentNode).append("text")//appending it to path's parent which is the g(group) DOM
                .attr("class", "mylabel")//adding a label class
                .attr("dx", "6") // margin
                .attr("dy", ".35em") // vertical-align
                .text(function () {
                  return d.properties;
                });
            })
            .on('mouseout', function () {

              d3.selectAll(".mylabel").remove()//this will remove the text on mouse out

            });

          svg.call(d3.zoom().on("zoom", zoomed));
          group.call(d3.drag().on("drag", dragged));

          let lambda = d3.scaleLinear()
            .domain([-width, width])
            .range([-180, 180]);

          let phi = d3.scaleLinear()
            .domain([-height, height]).range([90, -90]);

          function updatePaths() {
            svg.selectAll('path.graticule').attr('d', geoPath);
            svg.selectAll('path.land').attr('d', geoPath);

          }

          function dragged(d) {
            let r = {
              x: lambda((d.x = d3.event.x)),
              y: phi((d.y = d3.event.y))
            };
            projection.rotate([origin.x + r.x, origin.y + r.y]);
            updatePaths();
          }

          function zoomed() {
            projection.scale(scale * d3.event.transform.k);
            updatePaths();
          }
        });


      }

    }
  }
</script>

<style>
  .graticule {
    fill: none;
    stroke: #7ec0ee;
    stroke-width: 1px;
    stroke-opacity: .5;
    pointer-events: all;
  }

  .land {
    /*fill:#a2d7a0;*/
    stroke: #fff;
    stroke-width: 1;
  }
</style>
