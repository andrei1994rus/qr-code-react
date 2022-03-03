const express=require('express');
const path=require('path');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname,'../dist')));

app.get('/',(req,res)=>res.sendFile('index.html'));

app.listen(port,()=>console.log(`Server is running in ${port}`));