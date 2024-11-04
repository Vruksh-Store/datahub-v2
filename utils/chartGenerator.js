// utils/chartGenerator.js
const QuickChart = require("quickchart-js");

const createChart = async (data, title) => {
  const chart = new QuickChart();

  if (typeof data === "number") {
    // Case for total students (single number)
    chart.setConfig({
      type: "bar", // or any type you prefer
      data: {
        labels: ["Total Students"],
        datasets: [
          {
            label: title,
            data: [data], // Wrap the total count in an array
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } else if (Array.isArray(data)) {
    // Case for students by level (array of objects)
    chart.setConfig({
      type: "bar",
      data: {
        labels: data.map((item) => item._id), // Extract levels from the objects
        datasets: [
          {
            label: title,
            data: data.map((item) => item.count), // Extract counts from the objects
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } else {
    throw new Error("Invalid data type provided to createChart");
  }

  chart.setWidth(500).setHeight(300);
  return chart.getUrl(); // Returns the URL of the generated chart image
};

module.exports = { createChart };
