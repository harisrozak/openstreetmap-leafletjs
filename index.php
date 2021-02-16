<!DOCTYPE html>
<html>
<head>
	<title>Open Street Map with LeafletJS</title>

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   	integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   	crossorigin=""/>

   	<!-- Make sure you put this AFTER Leaflet's CSS -->
 	<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   	integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   	crossorigin=""></script>

	<!-- laod style.css -->
	<link rel="stylesheet" href="assets/style.css" />	
</head>
<body>
	<div id="search">
		<input type="text" name="map-search-keywords" id="map-search-keywords">
		<button href="javascript:;" id="map-search-button"">Search on Map</button>
		<input type="text" id='selected_lat' readonly=readonly>
		<input type="text" id='selected_lng' readonly=readonly>
		<div id='map-search-results'></div>
	</div>

	<div id="map-canvas"></div>

	<!-- load scripts -->
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="assets/script.js"></script>
</body>
</html>