<template>
  <div class="c-chart3" :class="id" :style="chartStyle">
    <!--<v-chart :options="polar" />-->
    <div></div>
  </div>
</template>
<script>

  const d3 = require('d3');

  class Line {
    constructor(id) {
      this._width = 266;
      this._height = 240;
      this._padding = 10;
      this._offset = 35;
      this._margins = {right: 45, bottom: 35, left: 50, top: 40};
      this._scaleX = d3.scaleBand().range([0, this.quadrantWidth()]).paddingInner(1).align(0);
      this._scaleY = d3.scaleLinear().range([this.quadrantHeight(), 0]);
      this._color = d3.scaleOrdinal(d3.schemeCategory10);
      this._dataX = [];
      this._series = [];
      this._svg = null;
      this._body = null;
      this._tooltip = null;
      this._transLine = null;
      this._activeR = 5;
      this._ticks = 5;
      this._names = id;
    }

    render() {
      if (!this._tooltip) {
        this._tooltip = d3.select(this._names)
          .select('div')
          .style('left', '240px')
          .style('top', '30px')
          .attr('class', 'tooltip')
          .html('');
      }
      if (!this._svg) {
        this._svg = d3.select(this._names)
          .append('svg')
          .attr('width', this._width)
          .attr('height', this._height)
        this.renderAxes();
        this.renderClipPath();
      }
      this.renderBody();
    }

    renderAxes() {
      let axes = this._svg.append('g')
        .attr('class', 'axes');

      this.renderXAxis(axes);
      this.renderYAxis(axes);
    }

    renderXAxis(axes) {
      let xAxis = d3.axisBottom().scale(this._scaleX).ticks(this._dataX.length);
      axes.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${this.xStart()}, ${this.yStart()})`)
        .style("stroke-dasharray", "5 5")
        .call(xAxis)

      d3.selectAll('g.x .tick text')
        .data(this._dataX)
        .enter()
    }

    renderYAxis(axes) {
      let yAxis = d3.axisLeft().scale(this._scaleY).ticks(this._ticks);
      axes.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.xStart()}, ${this.yEnd()})`)
        .call(yAxis)
        .style("stroke-dasharray", "5 5")

      d3.selectAll('.y .tick')
        .append('line')
        .attr('class', 'grid-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', this.quadrantWidth())
        .attr('y2', 0)
    }

    renderClipPath() {
      this._svg.append('defs')
        .append('clipPath')
        .attr('id', 'body-clip')
        .append('rect')
        .attr('x', 0 - this._activeR - 1)
        .attr('y', 0)
        .attr('width', this.quadrantWidth() + (this._activeR + 1) * 2)
        .attr('height', this.quadrantHeight())
    }

    renderBody() {
      if (!this._body) {
        this._body = this._svg.append('g')
          .attr('class', 'body')
          .attr('transform', `translate(${this._margins.left},${this._margins.top})`)
          .attr('clip-path', 'url(#body-clip)')
        this.renderTransLine()
      }
      this.renderLines();
      this.renderDots();
      this.listenMousemove();
    }

    renderTransLine() {
      this._transLine = this._body.append('line')
        .attr('class', 'trans-line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', this._scaleY(0))
        .attr('stroke-opacity', 0)
    }

    renderLines() {
      let line = d3.line()
        .x((d, i) => this._scaleX(this._dataX[i]))
        .y(d => this._scaleY(d))

      let lineElements = this._body
        .selectAll('path.line')
        .data(this._series);

      let lineEnter = lineElements
        .enter()
        .append('path')
        .attr('class', 'line')
        // eslint-disable-next-line no-unused-vars
        .attr('d', d => line(d.data.map(v => 0)))
        .attr('stroke', (d, i) => this._color(i))

      // eslint-disable-next-line no-unused-vars
      let lineUpdate = lineEnter
        .merge(lineElements)
        .transition()
        .duration(100)
        .ease(d3.easeCubicOut)
        .attr('d', d => line(d.data))

      // eslint-disable-next-line no-unused-vars
      let lineExit = lineElements
        .exit()
        .transition()
        .attr('d', d => line(d.data))
        .remove();
    }

    renderDots() {
      this._series.forEach((d, i) => {
        let dotElements = this._body
          .selectAll('circle._' + i)
          .data(d.data);

        let dotEnter = dotElements
          .enter()
          .append('circle')
          .attr('class', (v, index) => 'dot _' + i + ' index_' + index)
          .attr('cx', (d, i) => this._scaleX(this._dataX[i]))
          .attr('cy', d => this._scaleY(d))
          .attr('r', 1e-6)
          .attr('stroke', (d, i) => this._color(i))
        // .attr('fill',"#f2f")

        // eslint-disable-next-line no-unused-vars
        let dotUpdate = dotEnter
          .merge(dotElements)
          .transition()
          .duration(100)
          .ease(d3.easeCubicOut)
          .attr('cx', (d, i) => this._scaleX(this._dataX[i]))
          .attr('cy', d => this._scaleY(d))
          .attr('r', 2)

        // eslint-disable-next-line no-unused-vars
        let dotExit = dotElements
          .exit()
          .transition()
          .attr('r', 0)
          .remove();
      })
      this._dataX.forEach((d, i) => {
        d3.selectAll('circle._' + i)
          .attr('stroke', this._color(i))
      })
    }

    listenMousemove() {
      this._svg.on('mousemove', () => {
        let px = d3.event.offsetX;
        let py = d3.event.offsetY;
        if (px < this.xEnd() && px > this.xStart() && py < this.yStart() && py > this.yEnd()) {
          this.renderTransLineAndTooltip(px, py, px - this.xStart());
        } else {
          this.hideTransLineAndTooltip();
        }
      })
    }

    renderTransLineAndTooltip(x, y, bodyX) {
      //鼠标悬浮的index
      let cutIndex = Math.floor((bodyX + this.everyWidth() / 2) / this.everyWidth());
      //提示线位置
      this._transLine.transition().duration(50).ease(d3.easeLinear).attr('x1', cutIndex * this.everyWidth()).attr('x2', cutIndex * this.everyWidth()).attr('stroke-opacity', 1);
      // dot圆圈动画
      d3.selectAll('div.c-chart3> svg > g.body >circle.dot').transition().duration(100).ease(d3.easeCubicOut).attr('r', 2)
      d3.selectAll('div.c-chart3> svg > g.body >circle.index_' + cutIndex).transition().duration(100).ease(d3.easeBounceOut).attr('r', this._activeR)
      //提示框位置和内容
      if (x > this.quadrantWidth() - this._tooltip.style('width').slice(0, -2) - this._padding * 2) {
        x = x - this._tooltip.style('width').slice(0, -2) - this._padding * 2 - this._offset * 2 + 500;
      }
      if (y > this.quadrantHeight() - this._tooltip.style('height').slice(0, -2) - this._padding * 2) {
        y = y - this._tooltip.style('height').slice(0, -2) - this._padding * 2 - this._offset * 2 + 100;
      }
      let str = `<div style="text-align: center">${this._dataX[cutIndex]}月</div>`;
      this._series.forEach((d, i) => {
        str = str + `<div style="width: 15px;height: 15px;vertical-align: middle;margin-right: 5px;border-radius: 50%;display: inline-block;background: ${this._color(i)};"></div>${d.name}<span style="display: inline-block;margin-left: 20px">${d['data'][cutIndex]}</span><br/>`
      })
      this._tooltip.html(str).transition().duration(100).ease(d3.easeLinear).style('display', 'inline-block').style('opacity', .6).style('left', `${x + this._offset + this._padding}px`).style('top', `${y + this._offset + this._padding}px`);
    }

    hideTransLineAndTooltip() {
      this._transLine.transition().duration(50).ease(d3.easeLinear).attr('stroke-opacity', 0);
      d3.selectAll('div.c-chart3> svg > g.body >circle.dot').transition().duration(100).ease(d3.easeCubicOut).attr('r', 2);
      this._tooltip.transition().duration(100).style('opacity', 0).on('end', function () {
        d3.select(this).style('display', 'none')
      });
    }

    everyWidth() {
      return this.quadrantWidth() / (this._dataX.length - 1);
    }

    quadrantWidth() {
      return this._width - this._margins.left - this._margins.right;
    }

    quadrantHeight() {
      return this._height - this._margins.top - this._margins.bottom;
    }

    xStart() {
      return this._margins.left;
    }

    xEnd() {
      return this._width - this._margins.right;
    }

    yStart() {
      return this._height - this._margins.bottom;
    }

    yEnd() {
      return this._margins.top;
    }

    scaleX(a) {
      this._scaleX = this._scaleX.domain(a);
    }

    scaleY(a) {
      this._scaleY = this._scaleY.domain(a)
    }

    selectMaxYNumber(arr) {
      let temp = [];
      arr.forEach(item => temp.push(...item.data));
      let max = d3.max(temp);
      let base = Math.pow(10, Math.floor(max / 4).toString().length - 1);
      //获取Y轴最大值
      return Math.floor(max / 4 / base) * 5 * base;
    }

    dataX(data) {
      if (!arguments.length) return this._dataX;
      this._dataX = data;
      this.scaleX(this._dataX);
      return this;
    }

    series(series) {
      if (!arguments.length) return this._series;
      this._series = series;
      let maxY = this.selectMaxYNumber(this._series);
      this.scaleY([0, maxY])
      return this;
    }
  }


  export default {
    name: '',
    data() {
      return {
        //生成一个随机的ID
        id: "main" + new Date().getMilliseconds() * Math.floor(Math.random() * 10000)
      }
    },
    props: {
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 300,
      },
    },
    computed: {
      chartStyle() {
        return {
          width: this.width ? `${this.width}rem` : '100%',
          height: `${this.height}rem`,
        };
      },
    },
    mounted() {
      this.chartInit();

    },
    created() {

    },
    methods: {
      chartInit() {
        let arr = [];
        let dataX = [];

        let series = [{
          name: '人数', data: arr
        }];
        d3.json("fjyf2.json").then((data) => {
          for (const keys in data) {
            dataX.push(data[keys].key);
            arr.push(data[keys].value);
          }
          series[0].arr = arr;
          const line = new Line('.c-chart3');
          line
            .dataX(dataX)
            .series(series)
            .render()
        });


      }
    }
  };
</script>
<style lang="scss">

  .domain {
    stroke-width: 2;
    fill: none;
    opacity: 0;
    shape-rendering: crispEdges;

  }

  .tick text {
    font-size: 14px;
    color: #96A0C5;
  }

  .axes {
  }

  .grid-line {
    fill: none;
    stroke: #888;
    opacity: .4;
    shape-rendering: crispEdges;
  }

  .trans-line {
    fill: none;
    opacity: .4;
  }

  .line {
    fill: none;
    stroke: #0ADBDD;

    stroke-width: 2;
  }

  .dot {
    fill: #0ADBDD;
  }

  .tooltip {
    font-size: 15px;
    width: auto;
    padding: 10px;
    height: auto;
    position: absolute;
    background-color: #000000;
    opacity: .6;
    border-radius: 5px;
    color: #ffffff;
    display: none;
  }

</style>
