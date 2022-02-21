import React,{useState,useEffect} from 'react';
import './App.scss';
import Header from './Header';

import QRCode from 'react-qr-code';

const App=()=>
{	

	return (
		<div>
			<Header/>
			<div className="test">Test 1</div>
			<div className="test2">Test 2</div>
			<div className="qrcode">
				<QRCode value="text"/>
			</div>
		</div>
	);
}

export default App;