Array.prototype.count = function(el){
	let count = 0;
	for(let i=0;i<this.length;i++){
		if(this[i] === el){count++;}
	}
	return count;
}

window.onload = () => {
	const allowedCSSProperties = [
		'left','top','width','height',
		'background','color','fontFamily',
		'fontSize',
	];
	const allowedHTMLProperties = [
		'innerHTML','classList'
	];
	const colors = {
		'Red':'red',
		'Green':'green',
		'Dark Red':'darkred'
	};
	let remove = false;

	function checkColor(color) {
		if(typeof color !== 'undefined' && '0123456789'.includes(color.charAt(0))) {
				if(color.count(',') === 2){
					color = 'rgb(' + color + ')';
				}else if(color.count(',') === 3){
					color = 'rgba(' + color + ')';
				}
			}
			color = color.toLowerCase();
			color = color.replace(/\s/g,'');
			return color;
	}

	document.querySelector('#add-cell').onclick = () => {
		if(remove){
			remove = false;
			document.querySelector('#rem-cell').style.backgroundColor = getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--primary');
		}
		else{
			const w = document.getElementById('widget');
			const c = document.getElementById('corners');
			let cell;
			if(w.options[w.selectedIndex].value === 'textarea'){
				cell = document.createElement('textarea');	
			}else{
				cell = document.createElement('div');
			}
			cell.style.position = 'absolute';
			cell.style.left =       document.querySelector('#x').value || '0';
			cell.style.top =        document.querySelector('#y').value || '0';
			cell.style.width =      document.querySelector('#width').value || '10px';
			cell.style.height =     document.querySelector('#height').value || '10px';
			cell.style.backgroundColor = checkColor(document.querySelector('#background').value) || '#f00';
			cell.style.color =      checkColor(document.querySelector('#color').value) || '#f00';
			if(typeof document.querySelector('#font').value !== 'undefined' && document.querySelector('#font').value.length > 0){
				WebFont.load({
					'google':{
						'families':[document.querySelector('#font').value]
					}
				});
			}
			cell.style.fontFamily = document.querySelector('#font').value;
			cell.style.fontSize =   document.querySelector('#fontsize').value;
			cell.innerHTML =        document.querySelector('#text').value;
			cell.classList.add('dashb-element');
			cell.style.marginTop = '10vh';
			cell.onclick = () => {
				if(remove){
					document.body.removeChild(cell);
					remove = false;
					document.querySelector('#rem-cell').style.backgroundColor = getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--primary');
				}
			}
			if(w.options[w.selectedIndex].value === 'clock') {
				cell.classList.add('clock');
				cell.innerHTML = new Date().toLocaleTimeString();
				setInterval(() => {
					cell.innerHTML = new Date().toLocaleTimeString();
				},1000);
			}
			if(c.options[c.selectedIndex].value === 'rounded'){
				cell.style.borderRadius = '10px';
			}
			document.body.appendChild(cell);
		}
	};

	document.querySelector('#rem-cell').onclick = () => {
		remove = true;
		document.querySelector('#rem-cell').style.backgroundColor = getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--tertiary');
	}

	document.querySelector('#download').onclick = () => {
		const profile = {'cells':[]};
		[].forEach.call(document.getElementsByClassName('dashb-element'),v => {
			let cell = {},prop;
			for(let i=0;i<allowedCSSProperties.length;i++){
				prop = allowedCSSProperties[i];
			}
			profile.cells.push();
		});
		const a = document.createElement('a');
		a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile)));
		a.setAttribute('download','untitled.dashboard');
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
};
