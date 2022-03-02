import React,{useState,useEffect} from 'react';
import './App.scss';
import Header from './Header';

import QRCode from 'react-qr-code';

const App=()=>
{	
	const [inputValue,setInputValue]=useState('');
	const [widthScreen,setWidthScreen]=useState('');
	const info='Input any text or link. QR Code is generated after change input.';
	const warning_info='Your device has width < 150 px. You should rotate your device.';

	useEffect(()=>
	{
		window.addEventListener('resize',event=>
	    {
	        console.log('width:'+event.target.window.screen.width);
	        setWidthScreen(event.target.window.screen.width);
	    });
	});

	const addZero=(value)=>(value>=10) ? value : `0${value}`;

	const changeText=()=>setText();

	const getDate=()=>
	{
		const day=addZero(new Date().getDate());
		const month=addZero(new Date().getMonth()+1);
		const year=addZero(new Date().getFullYear());
		const hours=addZero(new Date().getHours());
		const minutes=addZero(new Date().getMinutes());
		const seconds=addZero(new Date().getSeconds());
		
		return `${day}-${month}-${year} ${hours}-${minutes}-${seconds}`;
	}

	const imageDownload=()=>
	{
	    const svg=document.getElementById("QRCode");
	    const svgData=new XMLSerializer().serializeToString(svg);
	    const canvas=document.createElement("canvas");
	    const ctx=canvas.getContext("2d");
	    const img=new Image();
	    
	    img.onload=()=>
	    {
	      canvas.width=img.width;
	      canvas.height=img.height;
	      ctx.drawImage(img,0,0);
	      const pngFile=canvas.toDataURL("image/png");
	      const downloadLink=document.createElement("a");
	      
	      const date=`${getDate()}`;
	      const name=`QRCode_${date}`;
	      
	      downloadLink.download=name;
	      downloadLink.href=`${pngFile}`;
	      downloadLink.click();
	    };

	    img.src=`data:image/svg+xml;base64,${btoa(svgData)}`;
	}

	return (
		<div>
			<Header/>
			<div className="content">
				<div className="div_input">
					<input type="text"
						   placeholder="input text"
						   className="i_text"
						   onChange={e=>setInputValue(e.target.value)}/>
				</div>
				<div className="div_info">
					{info}
				</div>
				<div className="qrcode">
					{(widthScreen<520) ?
						<QRCode id="QRCode" value={inputValue} size={120}/>
						: (widthScreen<1024) ?
							<QRCode id="QRCode" value={inputValue} size={175}/>
						: <QRCode id="QRCode" value={inputValue}/>
					}
				</div>
				<div className="div_btn">
					<button onClick={imageDownload}>Download QR Code</button>
				</div>
			</div>
			<div className="warning">
				{warning_info}
			</div>
		</div>
	);
}

export default App;