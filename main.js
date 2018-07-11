window.onload = () => {
 const allowedCSSProperties = [
  'left','top','width','height',
  'background','color','fontFamily',
  'fontSize',
 ];
 const allowedHTMLProperties = [
  'innerHTML','classList'
 ];
	let remove = false;

	document.querySelector('#add-cell').onclick = () => {
		if(remove){
			remove = false;
			document.querySelector('#rem-cell').style.backgroundColor = getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--primary');
		}
		else{
   const c = document.getElementById('widget');
   let cell;
   if(c.options[c.selectedIndex].value === 'textarea'){
    cell = document.createElement('textarea');	
   }else{
    cell = document.createElement('div');
   }
			cell.style.position = 'absolute';
			cell.style.left =       document.querySelector('#x').value;
			cell.style.top =        document.querySelector('#y').value;
			cell.style.width =      document.querySelector('#width').value;
			cell.style.height =     document.querySelector('#height').value;
			cell.style.background = document.querySelector('#background').value;
   cell.style.color =      document.querySelector('#color').value;
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
			cell.onclick = () => {
				if(remove){
					document.body.removeChild(cell);
					remove = false;
					document.querySelector('#rem-cell').style.backgroundColor = getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--primary');
				}
			}
   if(c.options[c.selectedIndex].value === 'clock') {
    cell.classList.add('clock');
    cell.innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
     cell.innerHTML = new Date().toLocaleTimeString();
    },1000);
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
