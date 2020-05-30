<template>
  <div class="m-map">
    <div class="map-main">
      <!--地图相关-->
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
  import {isMobile} from '@/utils/get-client-type';

  //数组分组方法
  const groupBy = (list, fn) => {
    const groups = {};
    list.forEach(function (o) {
      const group = JSON.stringify(fn(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    // return Object.keys(groups).map(function (group) {
    //     return groups[group];
    // });
    return groups;
  }

  export default {
    name: 'main-map',
    data() {
      return {
        isMobile,
        areas: [],
        status: {
          list: [],
          total: [],
        },
      };
    },
    created() {
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
      //this.queryBuildingInfo();

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
          url: '/geoserver/wfs',
          typeNS: 'zhcq',
          typeName: 'buildings_extent',
          maxFeatures: 5000,
          //opacity: 1,
          style: function (layer) {
            // you can use if statemt etc
            return {
              color: 'blue',
              weight: 1,
            };
          },
          //filter: new L.Filter.EQ('acode', that.acode),
        },
        vectorTileOptions: function (key) {
          return {
            //layerURL: mapboxUrl,
            layer: 'zhcq:buildings_extent',
            rendererFactory: L.canvas.tile,
            //rendererFactory: L.svg.tile,
            //tms: true,
            vectorTileLayerStyles: {
              'buildings_extent': function (properties, zoom) {
                if (properties.acode != that.acode) {
                  return {
                    'weight': 1,
                    'color': '#ccc',
                    'opacity': 1,
                    'fillColor': 'gray',
                    'fill': true,
                    //'fillOpacity': 0.1,
                  };
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
          var host = that.mconfig.geoserverUrl;

          var mapboxUrl = '/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=' + config.vectorTileOptions().layer + '&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}';

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
        var m = that.mconfig.maps.filter(o => o.key == that.key);
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
          //if (building) {
          //  that.$router.push({ path: '/singleProject', query: { id: building.id } })
          //}

          //跳转测试
          that.$router.push({path: '/singleProject'});
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

          //map.queryItems.clearLayers();

          //result.addTo(map.queryItems);

          var mb = result.getBounds();
          if (mb.isValid())
            map.fitBounds(mb);
          else
            map.zoomOut();

          map.setMaxBounds(mb.pad(0.5));
        }
      }).once('load', function (e) {

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
        console.log(gfilter)
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
      changeBaseMap: function (key) {
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
        var a = that.mconfig.maps.filter(o => o.key == that.key);
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
      }
    },

  };
</script>
<style scoped lang="scss">
  @import "~@/style/pcmixin";


  .map-main #map {
    width: 60vw;
    background: #031148;
    height: 70vh;
  }
</style>

