const d3 = require('d3')

/**
 * 时间戳转时间字符串
 * @param time
 * @returns {string}  2020-02-11
 */
export function time(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);

  return date.toJSON().substr(0, 10);
}

//
// function getdatas() {
//   d3.json("DXYArea.json").then((data) => {
//     let temp2 = 0;
//     let temp3 = 0;
//     //let temp4 = 0;
//     let dead_arr = []
//     for (const datakey in data.results) {
//       temp2 += data.results[datakey].confirmedCount;
//       temp3 += data.results[datakey].deadCount;
//       // temp4 += data.results[datakey].curedCount;
//
//       dead_arr.push({
//         "confirmedcount": data.results[datakey].confirmedCount,
//         "name": data.results[datakey].countryName,
//         "deadcount": data.results[datakey].deadCount,
//         "confirmedCount": data.results[datakey].confirmedCount,
//         "curedCount": data.results[datakey].curedCount
//       })
//     }
//     for (let i = 0; i < dead_arr.length; i++) {
//       dead_arr[i].deadper = (dead_arr[i].deadcount / temp3 * 100).toFixed(1)
//       dead_arr[i].confirmedper = (dead_arr[i].confirmedCount / temp2 * 100).toFixed(1)
//       dead_arr[i].confirmedtotal = temp2
//       dead_arr[i].deadtotal = temp3
//       dead_arr[i].data = [{
//         name: "死亡人数",
//         value: dead_arr[i].deadcount
//       },
//         {
//           name: "治愈人数",
//           value: dead_arr[i].curedCount
//         }]
//     }
//     this.contractDatas.length = 0;
//     dead_arr.sort(this.compare("confirmedCount")).slice(0, 3);
//     this.contractDatas = dead_arr.slice(0, 3);
//     this.contractDatas1.length = 0;
//     window.console.log(this.contractDatas);
//
//     this.contractDatas1 = dead_arr.sort(this.compare("deadcount")).slice(0, 3);
//     for (let i = 0; i < this.contractDatas1.length; i++) {
//       //  this.contractDatas1[i].data.length = 0;
//       this.contractDatas1[i].data1 = [{
//         name: "确诊人数",
//         value: this.contractDatas1[i].confirmedCount
//       },
//         {
//           name: "治愈人数",
//           value: this.contractDatas1[i].curedCount
//         }]
//     }
//   });
// }
