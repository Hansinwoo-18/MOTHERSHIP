const code =
JSON.parse(
localStorage.getItem(
"mothershipOperator"
)
)?.code;

if(code !== "green"){
    alert("ACCESS DENIED");
    window.location.href =
    "home.html";
}

const map =
L.map("map").setView(
[20,0],
2
);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);


/* =========================
   FAKE OPERATORS
========================= */

const operators = [

{
name:"Raven",
code:"red",
lat:40.7128,
lng:-74.0060
},

{
name:"Ghost",
code:"red",
lat:51.5074,
lng:-0.1278
},

{
name:"Cipher",
code:"purple",
lat:35.6762,
lng:139.6503
},

{
name:"Echo",
code:"yellow",
lat:28.6139,
lng:77.2090
},

{
name:"Atlas",
code:"blue",
lat:-33.8688,
lng:151.2093
}

];

operators.forEach(op=>{

let color="red";

if(op.code==="purple")
color="purple";

if(op.code==="yellow")
color="gold";

if(op.code==="blue")
color="deepskyblue";

const marker =
L.circleMarker(
[op.lat,op.lng],
{
radius:10,
color:color,
fillColor:color,
fillOpacity:1
}
).addTo(map);

marker.bindPopup(
`
<b>${op.name}</b>
<br>
CODE ${op.code.toUpperCase()}
`
);

});