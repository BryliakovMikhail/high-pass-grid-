ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [55.755821, 37.617635],
      zoom: 13,
      controls: [],
    },
    {
      suppressMapOpenBlock: true,
    }
  );

  var myPlacemark = new ymaps.Placemark(
    [55.769383, 37.638521],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "images/ymap-mark.svg",
      iconImageSize: [12, 12],
      iconImageOffset: [-3, -42],
    }
  );
  myMap.geoObjects.add(myPlacemark);
}
