function func() {
	var w, wx; 
	w=$($('.fon2-0')).width();
	wx=w/2480;
		positions(wx,"fon2-1",0,2480,6539,0);
		positions(wx,"fon2-2",0,2480,974,0);
		positions(wx,"fon2-3",181,875,7263,834);
		positions(wx,"block2-1",662,0,852,1314);
		positions(wx,"block2-2",122,0,1353,1736);
		positions(wx,"block2-3",1143,0,2909,1034);
		positions(wx,"block2-4",481,0,1663,931);
		positions(wx,"block2-5",159,0,2547,1601);
}
$(document).ready(function() {
	$('.fon2-0').each(func);
	$(window).resize(func);
	
	document.getElementById("go").addEventListener("click", function() {
		window.parent.postMessage("go", "*");
	});
});


setInterval(function() {
	func();
  }, 500);
  