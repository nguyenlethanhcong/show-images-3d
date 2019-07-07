window.onload = function () {
	var dds = document.getElementsByTagName('dd');
	var dl = document.getElementsByTagName('dl')[0];
	dl.style.transform = "rotateX(-10deg) rotateY(0deg)";
	for (var i = 0; i < dds.length; i++) {
		var inverted = document.createElement('div');
		var inverteds = document.createElement('div');
		var img = document.createElement('img');
		img.src = dds[i].getElementsByTagName('img')[0].src;
		inverted.appendChild(img);
		inverted.className = 'inverted';
		inverteds.appendChild(inverted)
		inverteds.className = 'inverteds';
		dds[i].appendChild(inverteds);
	}
	deal(dds, dds.length - 1);
	window.onmousedown = function (e) {
		e = e || window.event;
		var mouseX = e.clientX, mouseY = e.clientY;
		var transform = dl.style.transform;
		var rotateX = transform.substr(transform.indexOf('rotateX(') + 8);
		var rotateY = transform.substr(transform.indexOf('rotateY(') + 8);
		rotateX = parseInt(rotateX.substring(0, rotateX.indexOf('deg')));
		rotateY = parseInt(rotateY.substring(0, rotateY.indexOf('deg')));
		window.onmousemove = function (e) {
			e = e || window.event;
			var x = rotateX - (e.clientY - mouseY);
			var y = rotateY + (e.clientX - mouseX);
			if (x > 360 || x < -360)
				x %= 360;
			if (y > 360 || y < -360)
				y %= 360;
			dl.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
		}
		window.onmouseup = function () {
			window.onmousemove = null;
		}
	}
	function deal(dds, n) {
		var speed = 100;
		var translateZTerminus = 400;
		var angle = 360 / dds.length * n;
		var translateZ = 0;
		var rotateY = 0;
		var time = setInterval(function () {
			translateZ += translateZTerminus / speed * 10;
			rotateY += angle / speed * 10;
			dds[n].style.transform = 'rotateY(' + rotateY + 'deg) translateZ(' + translateZ + 'px)';
			if (rotateY >= angle && translateZ >= translateZTerminus) {
				clearInterval(time);
				dds[n].style.transform = 'rotateY(' + angle + 'deg) translateZ(' + translateZTerminus + 'px)';
				if (n > 0)
					deal(dds, n - 1);
			}
		}, 10);
	}
}