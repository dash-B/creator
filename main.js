window.onload = () => {
	let remove = false;

	document.querySelector('#add-cell').onclick = () => {
		if(remove){
			remove = false;
			document.querySelector('#rem-cell').style.backgroundColor = '#6c6';
		}
		else{
			const cell = document.createElement('div');	
			cell.style.position = 'absolute';
			cell.style.left =       document.querySelector('#x').value;
			cell.style.top =        document.querySelector('#y').value;
			cell.style.width =      document.querySelector('#width').value;
			cell.style.height =     document.querySelector('#height').value;
			cell.style.background = document.querySelector('#background').value;
			cell.classList.add('dashb-element');
			cell.onclick = () => {
				if(remove){
					document.body.removeChild(cell);
					remove = false;
					document.querySelector('#rem-cell').style.backgroundColor = '#6c6';
				}
			}
			document.body.appendChild(cell);
		}
	};

	document.querySelector('#rem-cell').onclick = () => {
		remove = true;
		document.querySelector('#rem-cell').style.backgroundColor = '#c66';
	}

	document.querySelector('#download').onclick = () => {
		const profile = {'cells':[]};
		[].forEach.call(document.getElementsByClassName('dashb-element'),v => {
			profile.cells.push({'x':v.style.left,'y':v.style.top,'width':v.style.width,
                       'height':v.style.height,'background':v.style.backgroundColor});
		});
		const a = document.createElement('a');
		a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile)));
		a.setAttribute('download','untitled.dashboard');
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	[...document.getElementsByClassName('clock')].forEach(v => {
		v.innerHTML = new Date().toLocaleTimeString();
		setInterval(() => {
			v.innerHTML = new Date().toLocaleTimeString();
		},1000);
	});
}
