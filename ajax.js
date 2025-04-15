code="BBBBBBefg456"; 
url="http://gamf.nhely.hu/ajax2/"; 

//Height SUM, AVG, MAX
let HeightSUM=0;
let HeightAvg=0;
let HeightMAX=0;
async function read() { 
  document.getElementById("code").innerHTML="code="+code; 
  let response = await fetch(url, { 
      method: 'post', 
      cache: 'no-cache', 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      }, 
      body: "code="+code+"&op=read" 
  }); 
  let data = await response.text(); 
  data = JSON.parse(data); 
  let list = data.list; 
  HeightSUM=0; //reseteljük minden olvasás előtt, aztán adjuk össze
  HeightAvg=0;
  HeightMAX=0;
  for ( let i=0; i<list.length;i++)
  {
    HeightSUM+=parseFloat(list[i].height);
  }
  HeightAvg=HeightSUM/data.rowCount
  for(let i=0; i<list.length;i++)
  {
    if(parseFloat(list[i].height)<HeightMAX) HeightMAX=i;
  }
  // !!! Először String-ben elkészítjük és csak a végén adjuk hozzá a DOM-hoz: divRead.innerHTML=str; 
  str="<H1>Read</H1>"; 
  str+="<p>Number of records: "+data.rowCount+"</p>"; 
  str+="<p>Last max "+data.maxNum+" records:</p>";
  str+="<table><tr><th>id</th><th>name</th><th>height</th><th>weight</th><th>code</th></tr>"; 
  for(let i=0; i<list.length; i++) 
    str += 
"<tr><td>"+list[i].id+"</td><td>"+list[i].name+"</td><td>"+list[i].height+"</td><td>"+list[i].weight+"</td><td>"+list[i].code+"</td></tr>"; 
  str +="</table>"; 
  str+="<p> HeightSUM: "+HeightSUM+"</p>";
  str+="<p> HeightAVG: "+HeightAvg+"</p>";
  str+="<p> HeightMAX: "+list[HeightMAX].height+"</p>";
  document.getElementById("readDiv").innerHTML=str; 
} 
async function create(){ 
  // name: reserved word 
  nameStr = document.getElementById("name1").value; 
  height = document.getElementById("height1").value; 
  weight = document.getElementById("weight1").value; 
  if(nameStr.length>0 && nameStr.length<=30 && height.length>0 && height.length<=30 && 
weight.length>0 && weight.length<=30 && code.length<=30){ 
    let response = await fetch(url, { 
      method: 'post', 
      cache: 'no-cache', 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
      body: "code="+code+"&op=create&name="+nameStr+"&height="+height+"&weight="+weight
    }); 
    let data = await response.text();  
    if(data>0)
      str="Create successful!"; 
    else 
    str="Create NOT successful!"; 
    document.getElementById("createResult").innerHTML=str; 
    document.getElementById("name1").value=""; 
    document.getElementById("height1").value="";
    document.getElementById("weight1").value=""; 
    read(); 
  } 
  else 
    document.getElementById("createResult").innerHTML="Validation error!!"; 
} 
 
async function getDataForId() { 
  let response = await fetch(url, { 
      method: 'post', 
      cache: 'no-cache', 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      }, 
// A már használt op=read kérés segítségével ki tudjuk nyerni az adott ID-hez tartozó adatokat: 
      body: "code="+code+"&op=read" 
  }); 
  let data = await response.text(); 
  data = JSON.parse(data); 
  let list = data.list; 
  for(let i=0; i<list.length; i++) 
// kiválasztjuk azt a rekordot, amelyiknek az ID-je megegyezik a megadott ID-vel, 
// és az datokat beírjuk a beviteli mezőkbe: 
    if(list[i].id==document.getElementById("idUpd").value){ 
      document.getElementById("name2").value=list[i].name; 
      document.getElementById("height2").value=list[i].height; 
      document.getElementById("weight2").value=list[i].weight; 
    } 
} 
async function update(){ 
  // name: reserved word 
  id = document.getElementById("idUpd").value; 
  nameStr = document.getElementById("name2").value; 
  height = document.getElementById("height2").value; 
  weight = document.getElementById("weight2").value; 
  if(id.length>0 && id.length<=30 && nameStr.length>0 && nameStr.length<=30 && height.length>0 && 
height.length<=30 && weight.length>0 && weight.length<=30 && code.length<=30){ 
    let response = await fetch(url, { 
      method: 'post', 
      cache: 'no-cache', 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',}, 
      body: 
"code="+code+"&op=update&id="+id+"&name="+nameStr+"&height="+height+"&weight="+weight
    }); 
    let data = await response.text();  
    if(data>0) 
      str="Update successful!"; 
    else 
    str="Update NOT successful!"; 
    document.getElementById("updateResult").innerHTML=str; 

// a végén kiürítjük a beviteli mezőket: 
    document.getElementById("idUpd").value=""; 
    document.getElementById("name2").value=""; 
    document.getElementById("height2").value=""; 
    document.getElementById("weight2").value=""; 
    read(); 
  } 
  else 
    document.getElementById("updateResult").innerHTML="Validation error!!"; 
} 
 
//delete: resetved word 
async function deleteF(){ 
  id = document.getElementById("idDel").value; 
  if(id.length>0 && id.length<=30){ 
    let response = await fetch(url, { 
      method: 'post', 
      cache: 'no-cache', 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
      body: "code="+code+"&op=delete&id="+id 
    }); 
    let data = await response.text();  
    if(data>0) 
      str="Delete successful!"; 
    else 
    str="Delete NOT successful!"; 
    document.getElementById("deleteResult").innerHTML=str; 
    document.getElementById("idDel").value=""; 
    read(); 
  } 
  else 
    document.getElementById("deleteResult").innerHTML="Validation error!!"; 
} 
 
window.onload = function()
{ 
    read();
}; 
