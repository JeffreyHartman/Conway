var ctx = canvas.getContext("2d");

setInterval(function() {
	for (var y=0; y<1024; y+=16) {
		for (var x=0; x<1024; x+=16) {
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			ctx.fillRect(x, y, 16, 16);
		}
	}
}, 0);