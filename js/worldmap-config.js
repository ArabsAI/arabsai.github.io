/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("map");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true,
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935),
});

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long",
  })
);

pointSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 7,
    fill: am5.color(0xff0000),
    tooltipText: "{name}",
  });

  return am5.Bullet.new(root, {
    sprite: circle,
  });
});

pointSeries.data.setAll([
  // Canada
  {
    name: "Toronto 🇨🇦",
    long: -79.3832,
    lat: 43.6532,
  },
  //   Egypt
  {
    long: 31.2357,
    lat: 30.0444,
    name: "Cairo 🇪🇬",
  },

]);

