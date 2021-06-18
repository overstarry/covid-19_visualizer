<template>
  <svg width="1000" height="1000"></svg>
</template>

<script>
  const d3 = require('d3');
  export default {
    data() {
      return {}
    },
    mounted: function () {
      this.draw();
    },
    methods: {

      draw() {
        let contriesMap;
        d3.json("DXYArea.json").then((data) => {
          contriesMap = new Map(); // 空Map

          //this.datas.splice(0, 4);
          for (const datakey in data.results) {
            contriesMap.set(data.results[datakey].provinceEnglishName, {
              "name": data.results[datakey].provinceName,
              "currentConfirmedCount": data.results[datakey].currentConfirmedCount,
            })
          }
        });
        d3.json("countries.json").then((data) => {
          // eslint-disable-next-line no-unused-vars
          const deviceWidth = document.documentElement.clientWidth;
          // eslint-disable-next-line no-unused-vars
          const deviceHeight = document.documentElement.clientHeight;
          let svg = d3.select('svg');
          let width = 1000;
          let height = deviceWidth / 3;
          let scale = 200;
          let origin = {
            x: 50,
            y: -40
          };
          // eslint-disable-next-line no-unused-vars
          let color = d3.scaleOrdinal().domain([0, 8]).range(d3.schemePaired);
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
            // eslint-disable-next-line no-unused-vars
            .attr('fill', function (d, i) {
              return "#a6cee3";
              // return color(i % 42);
            })
            .on('mouseover', function (d) {
              // 显示国家
              d3.select(this.parentNode).append("text")//appending it to path's parent which is the g(group) DOM
                .attr("class", "mylabel")//adding a label class
                .attr("dx", "720") // margin
                .attr("dy", "12") // vertical-align
                .attr("font-size", "0.14rem")
                .attr("fill", "#fff")
                .text(function () {
                  if (typeof (contriesMap.get(d.properties.name)) == "undefined") {
                    return "地区:";

                  }
                  return "地区:" + contriesMap.get(d.properties.name).name;
                });
              d3.select(this.parentNode).append("text")//appending it to path's parent which is the g(group) DOM
                .attr("class", "mylabel")//adding a label class
                .attr("dx", "720") // margin
                .attr("dy", "34") // vertical-align
                .attr("font-size", "0.14rem")
                .attr("fill", "#fff")
                .text(function () {
                  if (typeof (contriesMap.get(d.properties.name)) == "undefined") {
                    return "现存确诊人数: 0";

                  }
                  return "现存确诊人数: " + contriesMap.get(d.properties.name).currentConfirmedCount;
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

          let time = d3.now();

          /**
           * 球体旋转
           */
          function sphere_rotation() {
            let velocity = [.015, 0];
            let dt = d3.now() - time;
            projection.rotate([origin.x + velocity[0] * dt, origin.y + velocity[1] * dt]);
            updatePaths();
          }

          let timer = d3.timer(sphere_rotation, 200);

          // todo 拖动方法暂时报废
          function dragged(d) {
            timer.stop();
            let r = {
              x: lambda((d.x = d3.event.x)),
              y: phi((d.y = d3.event.y))
            };
            projection.rotate([origin.x + r.x, origin.y + r.y]);
            updatePaths();
            time = d3.now();
            timer.restart(sphere_rotation);
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
