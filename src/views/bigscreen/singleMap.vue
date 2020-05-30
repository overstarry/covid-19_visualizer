<template>
  <div class="m-map">

    <div class="map-main">
      <!--地图相关-->
      <div id="map"></div>
    </div>
    <div class="map-images">

    </div>
    <input type="text" value="" class="map-search" placeholder="请输入姓名、楼栋、门牌号、协议号"
           v-model="search.value"/>
    <div class="map-search-interval"></div>
    <div class="map-search-icon" @click="onSearch">

      <!--右上角切换图层-->
      <div v-for="(t,i) in mconfig.maps" class="map-type-group">
        <div
          :class="{ 'maptypecad': i===0,'maptypetwo': i===1,'maptypethree': i===2, 'maptypeactive': mapType===i }"
          @click="changeBaseMap(t.key,i)">
          {{t.name}}
        </div>
      </div>

      <!--右下角图例-->
      <div class="map-lenged">
        <div v-for="(pie,i) in mapDatas">
          <div style="display:flex;margin-bottom:0.03rem">
            <div :style="gardenStyle[i]"></div>
            <div style="margin:0.03rem 0.05rem;">{{pie.name}}</div>
            <DigitalAnimation style="margin:0.03rem 0.05rem;" :num="pie.value"></DigitalAnimation>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {isMobile} from '@/utils/get-client-type';
  import {mapGetters} from 'vuex';
  import {isNotEmptyArray} from '@/utils/fns';
  import axios from 'axios';

  import mconfig from './config/index';

  //数组分组方法
  const groupBy = (list, fn) => {
    const groups = {};
    list.forEach(function (o) {
      const group = JSON.stringify(fn(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return groups;
  }

  export default {
    name: 'singleMap',
    props: {
      mapDatas: {
        type: Array,
        default() {
          let Datas = [{value: 823, name: '未丈量'},
            {value: 200, name: '已丈量'},
            {value: 100, name: '已签约'},
            {value: 17, name: '已交房'},
            {value: 0, name: '已拆平'},]
          return Datas;
        }
      }
    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    data() {
      return {
        gardenStyle: [{
          margin: "0.05rem 0.03rem",
          backgroundColor: '#547d97',
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        }, {
          margin: "0.05rem 0.03rem",
          backgroundColor: '#00e5fd',
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        },
          {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#ff9b39',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }, {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#31d742',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          },
          {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#b7c5ce',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }],
        color: ['#0561c0', '#03cee3', '#c839ff', '#d93d5d', '#ff9b39', '#3de57d'],
        areas: [],
        status: {
          list: [],
          total: [],
        },
        mapType: 0,
        storageKey: 'search-history',
        search: {
          value: '',
          history: [],
          list: [],
          source: axios.CancelToken.source(),
          isLoading: false,
          isHistory: true,
          visible: false,
          time: null,
        },
        address: {
          value: 'c8b14636acb54c27b0e07f294e704c63',
          props: {
            lazy: true,
            async lazyLoad(node, resolve) {
              const {level, data} = node;

              let nodes = [];
              if (level === 0) {
                // 第一级别
                nodes = self.options.map(item => ({
                  value: item,
                  label: item.areaName,
                  areaCode: item.areaCode,
                  childrenData: item.children,
                  leaf: false,
                }));
              } else {
                if (isNotEmptyArray(data.childrenData)) {
                  nodes = data.childrenData.map((item) => ({
                    value: item,
                    label: item.areaName,
                    areaCode: item.areaCode,
                    childrenData: item.children,
                    leaf: false,
                  }));
                } else {
                  // 动态接口获取
                  try {
                    const list = await self.$http.get('/biz-program/programinfo/list', {
                      params: {
                        areaCode: data.areaCode,
                      },
                    });
                    nodes = list.data.records.map((item) => ({
                      value: item,
                      label: item.programName,
                      leaf: true,
                    }));
                  } catch (e) {
                    console.info(e);
                  }
                }
              }
              resolve(nodes);
            },
          },
        },
      };
    },
    created() {
      console.log(mconfig);
    },
    mounted() {
      var L = window.L;

      //坐标系
      var crs = L.CRS.EPSG4326;

      var that = this;

      that.key = 'cad';

      that.acode = 'c8b14636acb54c27b0e07f294e704c63';//默认项目id

      that.code = '';//楼栋编号

      that.statusCode = [];//状态筛选条件

      //通过接口传地区编码返回楼栋编号的状态
      this.queryBuildingInfo();

      //配置参数
      var config = {
        name: '',
        wmtsOptions: {
          tk: 'e99c1e8d5aaa10fadab36db2f6e1945b',
          ns: 'img_w',
          layer: 'img',
          maxZoom: 20,
          tileSize: 256,
          tilematrixset: 'w',
          //zoomOffset: 1,
        },
        wfstOptions: {
          crs: crs,
          //showExisting: true,
          geometryField: 'geom',
          url: 'geoserver/wfs',
          typeNS: 'zhcq',
          typeName: 'buildings',
          maxFeatures: 5000,
          //opacity: 1,
          style: function (layer) {
            // you can use if statemt etc
            return {
              color: 'blue',
              weight: 1,
            };
          },
          filter: new L.Filter.EQ('acode', that.acode),
        },
        vectorTileOptions: function (key) {
          return {
            //layerURL: mapboxUrl,
            layer: 'zhcq:buildings',
            rendererFactory: L.canvas.tile,
            //rendererFactory: L.svg.tile,
            //tms: true,
            vectorTileLayerStyles: {
              'buildings': function (properties, zoom) {
                if (properties.acode != that.acode) {
                  return {
                    'weight': 0,
                    'color': '#ccc',
                    'opacity': 1,
                    'fillColor': 'gray',
                    'fill': false,
                    'fillOpacity': 0.1,
                  };
                }

                var status = that.statusCode;
                var style = mconfig.maps.filter(o => o.key == key);
                if (style.length > 0) {
                  style = style[0];
                  if (status.length > 0) {
                    var choose = that.status.list.filter(o => status.indexOf(o.status) > -1 && o.code == properties.code);
                    if (choose.length > 0) {
                      return style.vectorStyles.filter(o => o.id == choose[0].status)[0];
                    } else {
                      return {
                        'weight': 1,
                        'color': '#ccc',
                        'opacity': 1,
                        'fillColor': 'gray',
                        'fill': false,
                        'fillOpacity': 0.1,
                      };
                    }
                  } else {
                    var s = that.status.list.filter(o => o.code == properties.code);
                    if (s.length > 0) {
                      var vs = style.vectorStyles.filter(o => o.id == s[0].status);
                      return vs[0];
                    } else {
                      return style.vectorStyles[0];
                    }
                  }
                }
              },
            },
            interactive: true,	//开启VectorGrid触发mouse/pointer事件
            getFeatureId: function (f) {
              return f.properties.BCODE;
            },
          };
        },
        mapOptions: {
          //crs: crs,
          //minZoom: 1,
          //maxZoom: 20,
          attributionControl: false,
          zoomControl: false,
          renderer: new L.LabelTextCollision({collisionFlg: true}),
        },
        getMvtUrl: function () {
          var mapboxUrl = 'geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=' + config.vectorTileOptions().layer + '&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}';

          return mapboxUrl;
        },
        getWmtsUrl: function () {
          var that = config.wmtsOptions;
          return 'http://t0.tianditu.gov.cn/' + that.ns + '/wmts?tk=' + that.tk + '&layer=' + that.layer + '&style=default&tilematrixset=' + that.tilematrixset + '&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}';
        },
        bounds: function () {
          var maxBounds = L.latLngBounds([23.56089600000007, 115.84640326200008], [28.32071210500004, 120.72437000000002]).pad(0.3);
          return maxBounds;
        },
        project: function () {
          //leaflet 获取使用的坐标都是经纬度的和84坐标一样

          // 地理点单位转化
          var center_latLng = L.latLng(26.42353946419876, 117.36933265055781);

          // 转平面坐标描述的点
          let center_latLng_project = crs.project(center_latLng);
          // 输出只：L.Point {x: 670333.9079398193, y: 3470684.886947584}
          console.log(center_latLng_project);

          // 转经纬度描述的点
          let center_latLng_project_unproject = crs.unproject(center_latLng_project);
          console.log(center_latLng_project_unproject);
        },
        getRequestUrl: function (action) {
          return '../../Home/' + action;
        },
      };
      that.config = config;

      //地图示例
      var map = L.map('map', config.mapOptions);

      //获取自定义图层组
      map.getLayerGroup = function (name) {
        var t = name + 'Group';
        if (!map[t])
          map[t] = L.featureGroup();
        return map[t];
      };

      //更新注记图
      map.updateText = function () {
        map.textItems.clearLayers();
        var m = mconfig.maps.filter(o => o.key == that.key);
        if (m.length > 0) {
          that.geoJSON.eachLayer(function (lay) {
            var properties = lay.feature.properties;
            var centroid = properties.centroid;
            if (centroid) {
              var centroids = centroid.split(',');
              L.circleMarker([centroids[1], centroids[0]], {
                radius: 0,
                opacity: 0,
                fill: false,
                text: properties.code,
                textStyle: m[0].textStyle,
              }).addTo(map.textItems);
            }
          });
        }
        var bounds = map.textItems.getBounds();
        if (bounds.isValid())
          map.fitBounds(map.textItems.getBounds());
      };

      //设置图层点击穿透样式
      map.getPanes().overlayPane.classList.add('m-overlay-pane');

      //定义图层组
      map.queryItems = L.featureGroup().addTo(map);//查询图层组
      map.drawnItems = L.featureGroup().addTo(map);//绘制图层组
      map.textItems = L.featureGroup().addTo(map);//注记图层组
      this.mconfig.maps.forEach(function (val, i) {
        if (i == 0) {
          map.getLayerGroup(val.key).addTo(map);
        } else {
          map.getLayerGroup(val.key);
        }

        //二维地图添加影像图
        if (val.image)
          L.tileLayer(config.getWmtsUrl(), config.wmtsOptions).addTo(map.getLayerGroup(val.key));

        //矢量瓦片
        map[val.key + 'Layer'] = L.vectorGrid.protobuf(config.getMvtUrl(), config.vectorTileOptions(val.key)).on('click', function (e) {
          // console.log(e,that.status.list);
          var building = that.status.list.filter(o => o.code == e.layer.properties.code)[0];
          console.log(building);
          if (building) {
            if (isMobile) {
              that.$router.push({name: 'H5ProgressDetails', params: {id: building.id}})
            } else {
              that.$PopDetails.open(building)
            }
          }
        }).addTo(map.getLayerGroup(val.key));

      });//底图图层组

      //要素服务查询使用
      map.wfst = new L.WFST(config.wfstOptions, new L.Format.GeoJSON({
        crs: crs,
      })).on('load', function (e) {
        if (e) {
          var json = JSON.parse(e.responseText);

          var result = L.geoJSON(json, {
            style: function (feature) {
              return {color: 'red'};
            },
          });

          //查询回调
          if (that.callback) {
            that.callback(json);
          }

          map.queryItems.clearLayers();

          if (that.code || map.drawnItems.getLayers().length > 0)
            result.addTo(map.queryItems);

          //更新注记图(只有楼栋编号为空时，更新全部注记)
          if (!that.code && map.drawnItems.getLayers().length == 0) {
            that.geoJSON = result;
            map.updateText();
          }

          var mb = result.getBounds();

          if (mb.isValid())
            map.fitBounds(mb);
          else
            map.zoomOut();

          if (!that.code)
            map.setMaxBounds(mb.pad(0.5));
        }
      }).once('load', function (e) {
        //if (map.wfst && map.wfst.getLayers().length > 0) {
        //  map.wfst.eachLayer(function (lay) {
        //    var properties = lay.feature.properties;
        //    var centroid = properties.centroid;
        //    if (centroid) {
        //      var centroids = centroid.split(',');
        //      mconfig.maps.forEach(function (val, i) {
        //        L.circleMarker([centroids[1], centroids[0]], { radius: 0, opacity: 0, fill: false, text: properties.code, textStyle: val.textStyle }).addTo(map.getLayerGroup(val.key));
        //      });
        //    }
        //  });
        //  var mb = map.wfst.getBounds();
        //  map.fitBounds(mb);
        //  map.setMaxBounds(mb.pad(0.8));
        //}
      });

      //事件
      map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;

        map.drawnItems.addLayer(layer);

        that.queryBuilding('', that.acode, function (e) {
          var str = '';
          e.features.forEach(function (val, i) {
            str += val.properties.code;
          });
          alert(str);
        });
      });

      this.map = map;
    },
    methods: {
      queryBuilding: function (code, acode, callback) {
        //更新项目下所有楼栋基本信息
        this.queryBuildingInfo(acode);

        this.callback = callback;
        this.code = code;
        this.acode = acode;

        var filter = null;
        var gfilter = null;

        var filters = [];
        filters[0] = code ? new L.Filter.Like('code', '*' + code + '*', {matchCase: false}) : null;
        filters[1] = acode ? new L.Filter.EQ('acode', acode, {matchCase: false}) : null;

        var gfilters = [];
        if (this.map.drawnItems.getLayers().length > 0) {
          var i = 0;
          var geom = this.config.wfstOptions.geometryField;
          this.map.drawnItems.eachLayer(function (lay) {
            gfilters[i] = new L.Filter.Intersects(geom, lay, L.CRS.EPSG4326);
            i++;
          });
        }

        filters.forEach(function (val, i) {
          if (!filter) {
            if (val)
              filter = new L.Filter.And(val);
          } else {
            if (val)
              filter.filters.push(val);
          }
        });

        gfilters.forEach(function (val, i) {
          if (!gfilter) {
            if (val)
              gfilter = new L.Filter.Or(val);
          } else {
            if (val)
              gfilter.filters.push(val);
          }
        });

        if (!filter && !gfilter) {
          this.map.queryItems.clearLayers();

          if (callback) {
            callback();
          }

          return;
        }

        var ff = null;

        if (filter)
          ff = filter;

        if (gfilter)
          ff = gfilter;

        if (filter && gfilter)
          ff = new L.Filter.And(filter, gfilter);

        this.map.wfst.loadFeatures(ff);
      },
      queryBuildingByCodes: function (codes) {

        var filter = null;

        var filters = [];

        codes.forEach(function (code, i) {
          filters[i] = new L.Filter.EQ('code', code, {matchCase: false});
        });

        filters.forEach(function (val, i) {
          if (!filter) {
            if (val)
              filter = new L.Filter.Or(val);
          } else {
            if (val)
              filter.filters.push(val);
          }
        });

        if (!filter) {
          filter = new L.Filter.EQ('acode', this.acode);
        }

        //new L.Filter.Or(new L.Filter.And(ff));
        //if (filter) {
        this.map.wfst.loadFeatures(filter);
        //}
      },
      changeBaseMap: function (key, i) {
        this.mapType = i;
        if (this.map) {
          this.key = key;

          //底图切换
          this.mconfig.maps.forEach((val, i) => {
            if (val.key != key) {
              this.map.removeLayer(this.map.getLayerGroup(val.key));
            } else {
              this.map.getLayerGroup(val.key).addTo(this.map);
            }

          });

          //注记切换
          this.map.updateText();

          //状态切换
          this.setStatus();
        }
      },
      chooseStatus: function (status) {

        //记录当前选中状态[]
        this.statusCode = status;

        var result = this.status.list.filter(o => this.statusCode.indexOf(o.status) > -1 && o.acode == this.acode);
        var codes = [];
        result.forEach(function (val, i) {
          codes.push(val.code);
        });

        this.queryBuildingByCodes(codes);

        this.map[this.key + 'Layer'].redraw();
      },
      setStatus: function () {
        var that = this;
        var a = mconfig.maps.filter(o => o.key == that.key);
        if (a.length > 0) {
          var temp = that.status.total.slice();
          temp.forEach(function (val, i) {
            var b = a[0].vectorStyles.filter(o => o.id == val.id);
            if (b.length > 0) {
              val.name = b[0].name;
              val.fillColor = b[0].fillColor;
            }
          });
          that.status.total = temp;
        }
      },
      drawPolygon: function () {
        if (!this.polygonDrawer)
          this.polygonDrawer = new L.Draw.Polygon(this.map);

        if (this.polygonDrawer._enabled)
          this.polygonDrawer.disable();
        else
          this.polygonDrawer.enable();

        this.map.drawnItems.clearLayers();
      },
      clearDraw: function () {
        if (this.polygonDrawer)
          this.polygonDrawer.disable();

        this.map.drawnItems.clearLayers();
      },
      queryBuildingInfo: async function () {
        try {
          let programId = this.acode;
          //获取项目下所有楼栋基本信息(状态)
          const list = await this.$http.get('/biz-basic/buildinginfo/list', {
            params: {
              programId: programId,
              current: 0,
              size: 2000,
            },
          });

          var datas = [];
          list.data.records.forEach((val, i) => {
            datas.push({code: val.buildCode, acode: val.programId, id: val.id, status: val.status});
          });
          this.status.list = datas;//楼栋基本信息列表

          //分组
          let groupData = groupBy(list.data.records, (link) => {
            return link.status
          });

          var total = [];
          for (var item in groupData) {
            total.push({id: Number(item), count: groupData[item].length});
          }
          this.status.total = total;//楼栋状态统计数据

          //设置cad底图对应的状态颜色
          this.setStatus();
        } catch (e) {
          console.info(e);
        }
      },
      onHistorySelect({value}) {
        this.search.value = value;
        this.onSearch();
      },
      onSelectProgram(e) {
        if (!e) return;
        this.onVisibleSearchList(false);
        if (e[e.length - 1].id != this.address.value)
          this.search.value = '';

        this.address.value = e[e.length - 1].id;
        this.onSearch();
      },
      onSelect(item, n) {
        this.onVisibleSearchList(false);
        this.search.value = item.value;
        this.onSearch();
      },
      onSearch() {
        const {source, value} = this.search;
        if (this.search.isLoading) return;
        if (!value) {
          this.search.isHistory = true;
        } else {
          this.onVisibleSearchList(true);

          // 搜索记录还是点击记录，
          this.search.history.unshift({value});
          this.search.history = this.search.history.splice(0, 5);
          this.$store.dispatch('storage/setItem', {
            key: this.storageKey,
            data: this.search.history,
          });
          source.cancel();
        }

        this.search.isLoading = true;

        this.queryBuilding(this.search.value, this.address.value, (e) => {
          //回调
          this.search.list.length = 0;
          if (e) {
            e.features.forEach((val, i) => {
              this.search.list.push({value: val.properties.code});
            });
            this.search.isHistory = false;
          }
          this.search.isLoading = false;
        });

        ////查询楼栋
        //this.$emit('queryBuilding', this.search.value, this.address.value, (e) => {
        //  //回调
        //  this.search.list.length = 0;
        //  if (e) {
        //    e.features.forEach((val, i) => {
        //      this.search.list.push({ value: val.properties.code });
        //    });
        //    this.search.isHistory = false;
        //  }
        //  this.search.isLoading = false;
        //});

        // this.$http.post('', {
        //   cancelToken: source.token,
        // }).then(res => {
        //   // 处理下数据丢到显示列表去
        // }).catch(err => {
        //   // 错误处理
        // });
        //setTimeout(() => {
        //  this.search.list.push({ value: ~~(Math.random() * 1000) + '' });
        //  this.search.isLoading = false;
        //  this.search.isHistory = false;
        //}, 1000 * Math.random());
      },
      onVisibleSearchList(bool) {
        window.clearTimeout(this.search.time);
        if (bool) {
          this.search.visible = true;
        } else {
          this.search.time = window.setTimeout(() => {
            this.search.visible = false;
          }, 300);
        }
      },
    },

  };
</script>
<style scoped lang="scss">
  .map-main #map {
    background: #031148;
    width: 7.6rem;
    height: 8.15rem;
    margin: 0.1rem;
  }
</style>

<style>
  .map-images {
    width: 7.78rem;
    height: 8.38rem;
    background-image: url("./images/mapbox.png");
    background-size: 7.78rem 8.38rem;
    position: absolute;
    top: 0rem;
    left: 0rem;
    z-index: 1000;
    pointer-events: none;
  }

  .map-search {
    background: rgba(16, 13, 67, 0.60);
    box-shadow: inset 0 0 6px 0 rgba(5, 253, 253, 0.55);
    position: absolute;
    top: 0.37rem;
    left: 0.5rem;
    width: 3.8rem;
    height: 0.44rem;
    border: none;
    z-index: 199710051070;
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #9AB6B9;
    padding: 0rem 0.5rem 0rem 0.13rem;
  }

  .map-search-icon {
    background-image: url("./images/searchIcon.png");
    width: 0.2rem;
    height: 0.2rem;
    background-size: 0.2rem 0.2rem;
    position: absolute;
    top: 0.5rem;
    left: 3.89rem;
    color: #05FDFD;
    cursor: pointer;
    z-index: 199710051070;
  }

  .map-search-interval {
    border-left: 1px solid rgba(0, 232, 255, 0.32);
    position: absolute;
    left: 3.72rem;
    top: 0.5rem;
    height: 0.19rem;
    z-index: 199710051070;
  }

  .maptypecad {
    opacity: 0.95;
    background: rgba(16, 13, 66, 0.59);
    box-shadow: inset 0 0 0.08rem 0 rgba(91, 128, 135, 0.87);
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #70878A;
    width: 0.72rem;
    height: 0.32rem;
    position: absolute;
    left: 2.57rem;
    top: -0.1rem;
    text-align: center;
    line-height: 0.32rem;
  }

  .maptypetwo {
    opacity: 0.95;
    background: rgba(16, 13, 66, 0.59);
    box-shadow: inset 0 0 0.08rem 0 rgba(91, 128, 135, 0.87);
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #70878A;
    width: 0.72rem;
    height: 0.32rem;
    position: absolute;
    left: 2.57rem;
    top: 0.42rem;
    text-align: center;
    line-height: 0.32rem;
  }

  .maptypethree {
    opacity: 0.95;
    background: rgba(16, 13, 66, 0.59);
    box-shadow: inset 0 0 0.08rem 0 rgba(91, 128, 135, 0.87);
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #70878A;
    width: 0.72rem;
    height: 0.32rem;
    position: absolute;
    left: 2.57rem;
    top: 0.94rem;
    text-align: center;
    line-height: 0.32rem;
  }

  .map-lenged {
    position: absolute;
    width: 1.2rem;
    height: 1.4rem;
    top: 6rem;
    left: 2.08rem;
    background-image: url('./images/pie-lenged.png');
    background-size: 1.2rem 1.4rem;
    font-size: 0.12rem;
    color: #ffff;
    text-align: left;
    line-height: 0.14rem;
    padding-left: 0.13rem;
    padding-top: 0.11rem;
    pointer-events: none;
  }

  .maptypeactive {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #00E8FF;
    box-shadow: inset 0 0 0.08rem 0 #00E8FF;
  }
</style>

