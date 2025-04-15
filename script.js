var selectedIndex = null; 
var array = new Array();
//WebStorage - sessionstorage
//ez számolja hányszor frissítettük az oldalt , de ha bezárjuk elvész a szám
if( sessionStorage.hits )
    sessionStorage.hits = Number(sessionStorage.hits) + 1;
else
sessionStorage.hits = 1;
document.write("Az oldal frissítésének a száma, az oldal megnyitásával : " + sessionStorage.hits);
//WebStorage - localstorage
//ez számolja hányszor frissítettük az oldalt , ha bezárjuk akkor is
if( localStorage.hits )
    localStorage.hits = Number(localStorage.hits) + 1;
else
    localStorage.hits = 1;
    document.write("Frissítések száma : " + localStorage.hits);
//Web Workers
//ez figyelmeztetést ad, ha túlhasználjuk a gombot
function bigLoop()
{
    for (var i = 0; i <= 1000000000; i += 1)
        var j = i;
        alert("Elérte a " + j + "ismétlést");
}
function sayHello()
{
    alert("Remek😀" );
}
//Server-Sent Events
if(typeof(EventSource) !== "undefined") 
    {
        var source = new EventSource("demo_sse.php");
        source.onmessage = function(event)
        {
            document.getElementById("eredmény").innerHTML += event.data + "<br>";
        };
    } 
else
    document.getElementById("eredmény").innerHTML = "Bocsánat, de a böngésződ nem támogatja a szerver által küldött eseményeket";
//Geolocation API
//a felhasználótól kérdezzük le a földrajzi helyzetét, személyes adat, így a felhasználótól engedélyt kell kérni
var x = document.getElementById("demo");
function Helymeghatarozas()
{
    if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(showPosition);
    else
        x.innerHTML = "Geolocation is not supported by this browser";
}
function showPosition(position) 
{
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}
//Drag and Drop API
let dragged = null;
const sourc = document.getElementById("draggable");
sourc.addEventListener("dragstart", (event) =>
{
  // store a ref. on the dragged elem
  dragged = event.target;
});
const target = document.getElementById("drop-target");
target.addEventListener("dragover", (event) =>
{
  // prevent default to allow drop
  event.preventDefault();
});
target.addEventListener("drop", (event) =>
{
  // prevent default action (open as a link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "dropzone")
    {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }
});
//Canvas
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null,
}
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y= event.y;
    drawCircle();
})
function drawCircle(){
ctx.fillStyle='orange';
ctx.beginPath();
ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
ctx.fill();
}
drawCircle();

