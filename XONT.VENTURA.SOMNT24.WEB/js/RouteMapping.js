

(function(){
   var obj = document.getElementById('dvActualRoute');
                markersActual = JSON.parse(obj.innerHTML);
				

                var obj1 = document.getElementById('dvPlannedRoute');
                markersPlanned = JSON.parse(obj1.innerHTML);


                var obj2 = document.getElementById('dvintermediatePlannedRoute');
                markers2 = JSON.parse(obj2.innerHTML);


                var obj3 = document.getElementById('dvintermediateActualRoute');
                markers3 = JSON.parse(obj3.innerHTML);
				
				 var obj4 = document.getElementById('dvSalesRoute');
                markersSales = JSON.parse(obj4.innerHTML);
				
				 var obj5 = document.getElementById('dvNonSales');
                markersNonSales = JSON.parse(obj5.innerHTML);
				
				
				 var obj6 = document.getElementById('dvInvalidRoute');
                markersInvalid = JSON.parse(obj6.innerHTML);

                var map = L.map('map', {
                    center: ['7.884459000000000000', '80.637459000000040000'],
                    minZoom: 2,
                    zoom: 7
                });




                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    subdomains: ['a', 'b', 'c']
                }).addTo(map);

				
					
                var end = L.icon({
                    iconUrl: 'start.png',

                    iconSize: [38, 40], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                var start = L.icon({
                    iconUrl: 'end.png',

                    iconSize: [40, 50], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                var arrow = L.icon({
                    iconUrl: 'arrow2.png',

                    iconSize: [38, 40], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                for (var i = 1; i < markersPlanned.length - 1; ++i) {
                    var data = markersPlanned[i];
                    L.marker([data.Latitude, data.Longitude])
                         .bindPopup('<div><div> Retailer : '+ data.RetailerCode + '-'+ data.RetailerName + '</div><br><div> Geo Codes : ' + data.Latitude + '-' + data.Longitude + '</div></div>')
                     .addTo(map);
                }

                L.marker([markersPlanned[0].Latitude, markersPlanned[0].Longitude], { icon: start }).addTo(map);


                L.marker([markersPlanned[markersPlanned.length - 1].Latitude, markersPlanned[markersPlanned.length - 1].Longitude], { icon: end }).addTo(map);


                var pIcon = L.icon({
                    iconUrl: 'ping1.png',

                    iconSize: [38, 40], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
				
				 var yellow = L.icon({
                    iconUrl: 'yellow2.png',

                    iconSize: [38, 40], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
				 var invalid = L.icon({
                    iconUrl: 'invalid1.png',

                    iconSize: [38, 40], // size of the icon                 
                    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

              //  for (var i = 1; i < markersActual.length - 1; ++i) {
               //     var data = markersActual[i];
              //      L.marker([data.Latitude, data.Longitude], { icon: pIcon })
              //           .bindPopup('<div>'+ data.RetailerCode + '-'+ data.RetailerName + '-' + data.RetailerName + '-' + data.Latitude + '-' + data.Longitude + '</div>')
              //       .addTo(map);
              //  }
 
		for (var i = 0; i < markersSales.length; ++i) {
                  var data = markersSales[i];
                 L.marker([data.Latitude, data.Longitude], { icon: pIcon })
                       .bindPopup('<div><div> Retailer : '+ data.RetailerCode + '-'+ data.RetailerName + '</div><br><div> Invoice Value :' + data.TotalInvoiceValue + '</div><br><div> Start Time :' + data.InvoiceStartTime + ' - End Time : ' + data.InvoiceEndTime + ' - Duration :' + data.Duration + ' [minutes]</div><br><div> Geo Codes : ' + data.Latitude + '-' + data.Longitude + '</div></div>')
                   .addTo(map);
              }

			 for (var i = 0; i < markersInvalid.length; ++i) {
                  var data = markersInvalid[i];
                 L.marker([data.Latitude, data.Longitude],{icon:invalid })
                       .bindPopup('<div><div> Retailer : '+ data.RetailerCode + '-'+ data.RetailerName + '</div><br><div> Invoice Value :' + data.TotalInvoiceValue + '</div><br><div> Start Time :' + data.InvoiceStartTime + ' - End Time : ' + data.InvoiceEndTime + ' - Duration :' + data.Duration + ' [minutes]</div><br><div> Geo Codes : ' + data.Latitude + '-' + data.Longitude + '</div></div>')
                   .addTo(map);
              }
			  
			  
			  for (var i = 0; i < markersNonSales.length ; ++i) {
                    var data = markersNonSales[i];
                   L.marker([data.Latitude, data.Longitude], { icon: yellow })
                         .bindPopup('<div><div> Retailer : '+ data.RetailerCode + '-'+ data.RetailerName + '</div><br><div> Geo Codes : ' + data.Latitude + '-' + data.Longitude + '</div></div>')
                     .addTo(map);
                }
			  
                L.marker([markersActual[0].Latitude, markersActual[0].Longitude], { icon: start }).addTo(map);


                L.marker([markersActual[markersActual.length - 1].Latitude, markersActual[markersActual.length - 1].Longitude], { icon: end }).addTo(map);


                var latlngs = Array();
                for (var i = 0; i < markers2.length; ++i) {
                    latlngs.push([markers2[i].Latitude, markers2[i].Longitude]);

                }



                var latlngs1 = Array();
                for (var i = 0; i < markers3.length; ++i) {
                    var data = markers3[i];
                    latlngs1.push([data.Latitude, data.Longitude]);
                }


                var polyline = new L.polyline(latlngs, { color: '#336BFF', weight: '6', opacity: '4' }).addTo(map);
                var polyline1 = new L.polyline(latlngs1, { color: '#12A724', weight: '4', opacity: '5' }).addTo(map);

               
                //////simple arrow
                //L.polylineDecorator(polyline1, {
                //    patterns: [
                //        { offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({ pixelSize: 10, pathOptions: { fillOpacity: 1, weight: 0 } }) }
                //    ]
                //}).addTo(map);

                // animated arrow
                //var arrowHead = L.polylineDecorator(polyline1).addTo(map);
                //var arrowOffset = 0;
                //var anim = window.setInterval(function () {
                //    arrowHead.setPatterns([
                //        { offset: arrowOffset + '%', repeat: 0, symbol: L.Symbol.arrowHead({ pixelSize: 10, polygon: false, pathOptions: { stroke: true } }) }
                //    ])
                //    if (++arrowOffset > 100)
                //        arrowOffset = 0;
                //}, 500);
				
                var markerx = L.animatedMarker(polyline1.getLatLngs(), {
                    icon: arrow,
                    autoStart: true,
					 distance: 300,  // meters
					 interval: 150, // milliseconds
                    onEnd: function () {
                        $(this._shadow).fadeOut();
                        $(this._icon).fadeOut(3000, function () {
                            map.removeLayer(this);
                        });
                    }
                });
				
				
                map.addLayer(markerx);
				 L.control.zoom({position: 'bottomright'}).addTo(map);
                // zoom the map to the polyline       
                map.fitBounds(polyline.getBounds());
               


 
 var markerx;
   $('#start').click(function() {  
    markerx = new L.animatedMarker(polyline1.getLatLngs(), {
                    icon: arrow,
					 distance: 300,  // meters
					 interval: 150, // milliseconds
                    autoStart: true,
                    onEnd: function () {
                        $(this._shadow).fadeOut();
                        $(this._icon).fadeOut(3000, function () {
                            map.removeLayer(this);
                        });
                    }
                });				
				 map.addLayer(markerx);
    $(this).hide();
	$('#stop').show();
  });
 
   $('#stop').click(function() {    
     $(markerx._icon).fadeOut(1000, function () {
                           map.removeLayer(markerx);
                        });			
    $(this).hide();
	$('#start').show();
  });
 
}());