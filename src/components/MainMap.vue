<template>
  <div class="m-map">
    <h-map-search v-if="isMobile" v-on:queryBuilding="queryBuilding"/>
    <main-map-search v-else v-on:queryBuilding="queryBuilding"/>
    <main-map-type v-on:changeBaseMap="changeBaseMap"/>
    <main-map-tool v-on:drawPolygon="drawPolygon" v-on:clearDraw="clearDraw" v-if="!isMobile"/>
    <main-map-statistics v-bind:total="status.total" v-on:chooseStatus="chooseStatus"/>
    <div class="map-main">
      <!--地图相关-->
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {isMobile} from '@/utils/get-client-type'
  import {mapGetters} from 'vuex'
  // 数组分组方法
  const groupBy = (list, fn) => {
    const groups = {}
    list.forEach(o => {
      const group = JSON.stringify(fn(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    // return Object.keys(groups).map(function (group) {
    //     return groups[group];
    // });
    return groups
  }

  export default {
    name: 'main-map',
    data() {
      return {
        isMobile,
        areas: [],
        status: {
          list: [],
          total: []
        },
        colorList: []
      }
    },
    created() {
    },
    mounted() {
      const {L} = window

      // 坐标系
      const crs = L.CRS.EPSG4326

      const that = this

      that.key = 'cad'

      // that.acode = 'd48117bfcbe7c13ee2ce58519e60c303';//默认钟宅项目id
      //that.acode = 'ffd684ec3ae1a0a45799cd4779d4db0e' // 默认凤头社项目id
      that.acode = this.selectProgram.id

      that.code = '' // 楼栋编号

      that.statusCode = [] // 状态筛选条件

      // 通过接口传地区编码返回楼栋编号的状态
      this.queryBuildingInfo()

      // 配置参数
      var config = {
        name: '',
        wmtsOptions: {
          tk: 'e99c1e8d5aaa10fadab36db2f6e1945b',
          ns: 'img_w',
          layer: 'img',
          maxZoom: 20,
          tileSize: 256,
          tilematrixset: 'w'
          // zoomOffset: 1,
        },
        wfstOptions: {
          crs,
          // showExisting: true,
          geometryField: 'geom',
          url: '/geoserver/wfs',
          typeNS: 'zhcq',
          typeName: 'buildings',
          maxFeatures: 9000,
          // opacity: 1,
          style(layer) {
            // you can use if statemt etc
            return {
              color: 'blue',
              weight: 1
            }
          },
          filter: new L.Filter.EQ('acode', that.acode)
        },
        vectorTileOptions(key) {

          return {
            // layerURL: mapboxUrl,
            layer: 'zhcq:buildings',
            rendererFactory: L.canvas.tile,
            // rendererFactory: L.svg.tile,
            // tms: true,
            vectorTileLayerStyles: {
              buildings(properties, zoom) {

                if (properties.acode != that.acode) {
                  return {
                    weight: 0,
                    color: '#ccc',
                    opacity: 1,
                    fillColor: 'gray',
                    fill: false,
                    fillOpacity: 0.1
                  }
                }

                const status = that.statusCode
                let style = that.mconfig.maps.filter(o => o.key == key)

                if (style.length > 0) {
                  style = style[0]
                  if (status.length > 0) {
                    const choose = that.status.list.filter(
                      o => status.indexOf(o.status) > -1 && o.code == properties.code
                    )
                    if (choose.length > 0) {
                      return style.vectorStyles.filter(o => o.id == choose[0].status)[0]
                    }
                    return {
                      weight: 1,
                      color: '#ccc',
                      opacity: 1,
                      fillColor: 'gray',
                      fill: false,
                      fillOpacity: 0.1
                    }
                  }

                  const s = that.status.list.filter(o => o.code == properties.code)
                  if (s.length > 0) {
                    const vs = style.vectorStyles.filter(o => o.id == s[0].status)
                    return vs[0]
                  }
                  const random = parseInt(Math.random() * 5)
                  //console.log(properties);
                  //if (properties.color) {
                  //  return properties.color;
                  //}

                  var isRender = that.colorList.filter(o => o.code == properties.code);
                  if (isRender.length > 0) {
                    return isRender[0].color;
                  } else {
                    that.colorList.push({
                      code: properties.code,
                      color: style.vectorStyles[random]
                    })
                    return style.vectorStyles[random]
                  }

                  // 临时注释演示使用
                  // return style.vectorStyles[0];
                }
              }
            },
            interactive: true, // 开启VectorGrid触发mouse/pointer事件
            getFeatureId(f) {
              return f.properties.BCODE
            }
          }
        },
        mapOptions: {
          // crs: crs,
          // minZoom: 1,
          // maxZoom: 20,
          attributionControl: false,
          zoomControl: false,
          renderer: new L.LabelTextCollision({collisionFlg: true})
        },
        getMvtUrl() {
          const mapboxUrl = `/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=${
            config.vectorTileOptions().layer
          }&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}`

          return mapboxUrl
        },
        getWmtsUrl() {
          const that = config.wmtsOptions
          return `http://t0.tianditu.gov.cn/${that.ns}/wmts?tk=${that.tk}&layer=${that.layer}&style=default&tilematrixset=${that.tilematrixset}&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}`
        },
        bounds() {
          const maxBounds = L.latLngBounds(
            [23.56089600000007, 115.84640326200008],
            [28.32071210500004, 120.72437000000002]
          ).pad(0.3)
          return maxBounds
        },
        project() {
          // leaflet 获取使用的坐标都是经纬度的和84坐标一样

          // 地理点单位转化
          const center_latLng = L.latLng(26.42353946419876, 117.36933265055781)

          // 转平面坐标描述的点
          const center_latLng_project = crs.project(center_latLng)
          // 输出只：L.Point {x: 670333.9079398193, y: 3470684.886947584}
          console.log(center_latLng_project)

          // 转经纬度描述的点
          const center_latLng_project_unproject = crs.unproject(center_latLng_project)
          console.log(center_latLng_project_unproject)
        }
      }
      that.config = config

      // 地图示例
      const map = L.map('map', config.mapOptions)

      // 获取自定义图层组
      map.getLayerGroup = function (name) {
        const t = `${name}Group`
        if (!map[t]) {
          map[t] = L.featureGroup()
        }
        return map[t]
      }
      // 更新注记图
      map.updateText = function () {
        map.textItems.clearLayers()
        const m = that.mconfig.maps.filter(o => o.key == that.key)
        if (m.length > 0) {
          that.geoJSON.eachLayer(lay => {
            const {properties} = lay.feature
            const {centroid} = properties
            if (centroid) {
              const centroids = centroid.split(',')
              L.circleMarker([centroids[1], centroids[0]], {
                radius: 0,
                opacity: 0,
                fill: false,
                text: properties.code,
                textStyle: m[0].textStyle
              }).addTo(map.textItems)
            }
          })
        }
        const bounds = map.textItems.getBounds()
        if (bounds.isValid()) {
          map.fitBounds(map.textItems.getBounds())
        }
      }

      // 设置图层点击穿透样式
      map.getPanes().overlayPane.classList.add('m-overlay-pane')

      // 定义图层组
      map.queryItems = L.featureGroup().addTo(map) // 查询图层组
      map.drawnItems = L.featureGroup().addTo(map) // 绘制图层组
      map.textItems = L.featureGroup().addTo(map) // 注记图层组
      this.mconfig.maps.forEach((val, i) => {
        if (i == 0) {
          map.getLayerGroup(val.key).addTo(map)
        } else {
          map.getLayerGroup(val.key)
        }

        // 二维地图添加影像图
        if (val.image) {
          L.tileLayer(config.getWmtsUrl(), config.wmtsOptions).addTo(map.getLayerGroup(val.key))
        }


        // 矢量瓦片
        map[`${val.key}Layer`] = L.vectorGrid
          .protobuf(config.getMvtUrl(), config.vectorTileOptions(val.key))
          .on('click', e => {
            const building = that.status.list.filter(o => o.code == e.layer.properties.code)[0]
            if (building) {
              if (isMobile) {
                that.$router.push({name: 'H5ProgressDetails', params: {id: building.id}})
              } else {
                that.$PopDetails.open(building)
              }
            } else {
              Toast({
                message: '未找到对应楼栋编号的数据',
                duration: 1300
              })
            }
          })
          .addTo(map.getLayerGroup(val.key))
      }) // 底图图层组

      // 要素服务查询使用
      map.wfst = new L.WFST(
        config.wfstOptions,
        new L.Format.GeoJSON({
          crs
        })
      )
        .on('load', e => {
          if (e) {
            const json = JSON.parse(e.responseText)

            const result = L.geoJSON(json, {
              style(feature) {
                return {color: 'red'}
              }
            })

            // 查询回调
            if (that.callback) {
              that.callback(json)
            }

            map.queryItems.clearLayers()

            if (that.code || map.drawnItems.getLayers().length > 0) {
              result.addTo(map.queryItems)
            }

            // 更新注记图(只有楼栋编号为空时，更新全部注记)
            if (!that.code && map.drawnItems.getLayers().length == 0) {
              that.geoJSON = result
              map.updateText()
            }

            const mb = result.getBounds()

            if (mb.isValid()) {
              map.fitBounds(mb)
            } else {
              map.zoomOut()
            }

            if (!that.code) {
              map.setMaxBounds(mb.pad(0.5))
            }
          }
        })
        .once('load', e => {
          const json = JSON.parse(e.responseText)

          // if (map.wfst && map.wfst.getLayers().length > 0) {
          //  map.wfst.eachLayer(function (lay) {
          //    var properties = lay.feature.properties;
          //    var centroid = properties.centroid;
          //    if (centroid) {
          //      var centroids = centroid.split(',');
          //      that.mconfig.maps.forEach(function (val, i) {
          //        L.circleMarker([centroids[1], centroids[0]], { radius: 0, opacity: 0, fill: false, text: properties.code, textStyle: val.textStyle }).addTo(map.getLayerGroup(val.key));
          //      });
          //    }
          //  });
          //  var mb = map.wfst.getBounds();
          //  map.fitBounds(mb);
          //  map.setMaxBounds(mb.pad(0.8));
          // }
        })

      // 事件
      map.on(L.Draw.Event.CREATED, event => {
        const {layer} = event

        map.drawnItems.addLayer(layer)

        that.queryBuilding('', that.acode, e => {
          let str = ''
          e.features.forEach((val, i) => {
            str += val.properties.code
          })
          alert(str)
        })
      })

      this.map = map
    },
    methods: {
      queryBuilding(code, acode, callback) {
        // 更新项目下所有楼栋基本信息
        this.callback = callback
        this.code = code

        if (acode != this.acode) {
          this.acode = acode
          this.queryBuildingInfo()
        }

        this.acode = acode

        let filter = null
        let gfilter = null

        const filters = []
        filters[0] = code ? new L.Filter.Like('code', `*${code}*`, {matchCase: false}) : null
        filters[1] = acode ? new L.Filter.EQ('acode', acode, {matchCase: false}) : null

        const gfilters = []
        if (this.map.drawnItems.getLayers().length > 0) {
          let i = 0
          const geom = this.config.wfstOptions.geometryField
          this.map.drawnItems.eachLayer(lay => {
            gfilters[i] = new L.Filter.Intersects(geom, lay, L.CRS.EPSG4326)
            i++
          })
        }

        filters.forEach((val, i) => {
          if (!filter) {
            if (val) {
              filter = new L.Filter.And(val)
            }
          } else if (val) {
            filter.filters.push(val)
          }
        })

        gfilters.forEach((val, i) => {
          if (!gfilter) {
            if (val) {
              gfilter = new L.Filter.Or(val)
            }
          } else if (val) {
            gfilter.filters.push(val)
          }
        })

        if (!filter && !gfilter) {
          this.map.queryItems.clearLayers()

          if (callback) {
            callback()
          }

          return
        }

        let ff = null

        if (filter) {
          ff = filter
        }

        if (gfilter) {
          ff = gfilter
        }

        if (filter && gfilter) {
          ff = new L.Filter.And(filter, gfilter)
        }

        this.map.wfst.loadFeatures(ff)
      },
      queryBuildingByCodes(codes) {
        let filter = null

        const filters = []

        codes.forEach((code, i) => {
          filters[i] = new L.Filter.EQ('code', code, {matchCase: false})
        })

        filters.forEach((val, i) => {
          if (!filter) {
            if (val) {
              filter = new L.Filter.Or(val)
            }
          } else if (val) {
            filter.filters.push(val)
          }
        })

        if (!filter) {
          filter = new L.Filter.EQ('acode', this.acode)
        }

        // new L.Filter.Or(new L.Filter.And(ff));
        // if (filter) {
        this.map.wfst.loadFeatures(filter)
        // }
      },
      changeBaseMap(key) {
        if (this.map) {
          this.key = key

          // 底图切换
          this.mconfig.maps.forEach((val, i) => {
            if (val.key != key) {
              this.map.removeLayer(this.map.getLayerGroup(val.key))
            } else {
              this.map.getLayerGroup(val.key).addTo(this.map)
            }
          })

          // 注记切换
          this.map.updateText()

          // 状态切换
          this.setStatus()
        }
      },
      chooseStatus(status) {
        // 记录当前选中状态[]
        this.statusCode = status

        const result = this.status.list.filter(o => this.statusCode.indexOf(o.status) > -1 && o.acode == this.acode)
        const codes = []
        result.forEach((val, i) => {
          codes.push(val.code)
        })

        this.queryBuildingByCodes(codes)

        this.map[`${this.key}Layer`].redraw()
      },
      setStatus() {
        const that = this
        const a = that.mconfig.maps.filter(o => o.key == that.key)
        if (a.length > 0) {
          const temp = that.status.total.slice()

          temp.forEach((val, i) => {
            const b = a[0].vectorStyles.filter(o => o.id == val.id)
            if (b.length > 0) {
              val.name = b[0].name
              val.fillColor = b[0].fillColor
            }
          })
          that.status.total = temp
        }
      },
      drawPolygon() {
        if (!this.polygonDrawer) {
          this.polygonDrawer = new L.Draw.Polygon(this.map)
        }

        if (this.polygonDrawer._enabled) {
          this.polygonDrawer.disable()
        } else {
          this.polygonDrawer.enable()
        }

        this.map.drawnItems.clearLayers()
      },
      clearDraw() {
        if (this.polygonDrawer) {
          this.polygonDrawer.disable()
        }

        this.map.drawnItems.clearLayers()
      },
      async queryBuildingInfo() {
        try {
          const programId = this.acode

          // 获取项目下所有楼栋基本信息(状态)
          const list = await this.$http.get('/biz-basic/buildinginfo/list', {
            params: {
              programId,
              current: 0,
              size: 2000
            }
          })

          const datas = []
          list.data.records.forEach((val, i) => {
            datas.push({
              code: val.buildCode,
              acode: val.programId,
              id: val.id,
              status: val.status
            })
          })
          this.status.list = datas // 楼栋基本信息列表

          // 分组统计状态临时注释演示使用
          // let groupData = groupBy(list.data.records, (link) => {
          //  return link.status
          // });

          // var total = [];
          // for (var item in groupData) {
          //  total.push({ id: Number(item), count: groupData[item].length });
          // }
          // this.status.total = total;//楼栋状态统计数据

          this.status.total = [
            {id: 1, count: 200},
            {id: 2, count: 400},
            {id: 3, count: 600},
            {id: 4, count: 800}
          ]

          // 设置cad底图对应的状态颜色
          this.setStatus()
        } catch (e) {
          console.info(e)
        }
      }
    },
    components: {
      MainMapSearch: () => import(/* webpackChunkName: "main-map-search" */ '@/components/MainMapSearch.vue'),
      MainMapType: () => import(/* webpackChunkName: "main-map-type" */ '@/components/MainMapType.vue'),
      MainMapStatistics: () =>
        import(/* webpackChunkName: "main-map-statistics" */ '@/components/MainMapStatistics.vue'),
      MainMapTool: () => import(/* webpackChunkName: "main-map-tool" */ '@/components/MainMapTool.vue'),
      hMapSearch: () => import(/* webpackChunkName: "h5-map-search" */ '@/components/h5-map-search.vue')
    },
    computed: {
      ...mapGetters({
        selectProgram: 'areas/getSelectProgram'
      })
    }
  }
</script>
<style scoped lang="scss">
  @import '~@/style/pcmixin';

  .m-map {
    @include max-box;
  }

  .map-main #map {
    width: 100%;
    background: white;
    height: calc(100vh - 0.3645833333rem);
  }
</style>
