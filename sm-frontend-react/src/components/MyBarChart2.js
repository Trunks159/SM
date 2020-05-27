import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MyBarChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "March 3",
        fontFamily: "helvetica",
      },
      subtitles: [
        {
          text: "Based on Vehicle Classes",
          fontFamily: "helvetica",
        },
      ],
      axisY: {
        title: "Time",
        prefix: "$",
        lineThickness: 1,
      },
      data: [
        {
          type: "rangeBar",
          indexLabel: "${y[#index]}",
          yValueFormatString: "#,##0",
          dataPoints: [
            { label: "Jordan", y: [1500, 2100] },
            { label: "Lupe", y: [1500, 2100] },
            { label: "Nikki", y: [1500, 2100] },
            { label: "Lorenzo", y: [1500, 2100] },
            { label: "Ryan", y: [800, 1500] },
            { label: "Bob", y: [800, 1500] },
            { label: "Theon", y: [800, 1500] },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default MyBarChart;
