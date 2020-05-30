const config = {
  "maps": [
    {
      "key": "cad",
      "name": "CAD图",
      className: "icon-cad",
      textStyle: {
        stroke: false,
        color: "#000",
        font: "12px"
      },
      vectorStyles: [
        {
          "id": 1,
          "name": "未丈量",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#ffffff",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 2,
          "name": "已丈量",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#A5ABFF",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 3,
          "name": "已签约",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#FFAA59",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 4,
          "name": "已交房",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#A1D74D",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 5,
          "name": "已拆平",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#E5E5E5",
          "fill": true,
          "fillOpacity": 0.7
        }
      ]
    },
    {
      "key": "twoDimension",
      "name": "二维视图",
      image: true,
      className: "icon-two-dimension",
      textStyle: {
        stroke: false,
        color: "#fff",
        font: "12px"
      },
      vectorStyles: [
        {
          "id": 1,
          name: '未丈量',
          weight: 0.5,
          color: '#9e9e9e',
          opacity: 1,
          fillColor: 'red',
          fill: true,
          fillOpacity: 0.7
        },
        {
          "id": 2,
          "name": "已丈量",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#a5abff",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 3,
          "name": "已签约",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#a5abff",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 4,
          "name": "已交房",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#a5abff",
          "fill": true,
          "fillOpacity": 0.7
        },
        {
          "id": 5,
          "name": "已拆平",
          "weight": 1,
          "color": "#ccc",
          "opacity": 1,
          "fillColor": "#a5abff",
          "fill": true,
          "fillOpacity": 0.7
        }
      ]
    },
    {
      "key": "threeDimension",
      "name": "三维地图",
      className: "icon-three-dimension",
      textStyle: {
        stroke: false,
        color: "#000"
      },
      vectorStyles: []
    }
  ],
  geoserverUrl: 'http://demo.geoai.com.cn:8847',
};

export default config;
