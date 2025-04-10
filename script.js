var selectedIndex = null; 
var array = new Array();


//WebStorage - sessionstorage
//ez számolja hányszor frissítettük az oldalt , de ha bezárjuk elvész a szám
if( sessionStorage.hits )
    sessionStorage.hits = Number(sessionStorage.hits) +1;
else
sessionStorage.hits = 1;
document.write("Az oldal frissítésének a száma, az oldal megnyitásával : " + sessionStorage.hits );
//WebStorage - localstorage
//ez számolja hányszor frissítettük az oldalt , ha bezárjuk akkor is
if( localStorage.hits )
    localStorage.hits = Number(localStorage.hits) +1;
else
    localStorage.hits = 1;
    document.write("Frissítések száma : " + localStorage.hits );

//Web Workers
//ez figyelmeztetést ad, ha túlhasználjuk a gombot
function bigLoop()
{
    for (var i = 0; i <= 1000000000; i += 1)
        var j = i;
        alert("Elérte a " + j + "ismétlést" );
}
function sayHello()
{
    alert("Remek, most kicsit pihenjen kedves, látogató😀" );
}

//Server-Sent Events
//ezt hogy kipróbáljuk kéne php de mi azt nem használhatunk
//és nem is jó maga a "hivatkozás" 
if(typeof(EventSource) !== "undefined") 
    {
        var source = new EventSource("demo_sse.php");
        source.onmessage = function(event)
        {
            document.getElementById("eredmény").innerHTML += event.data + "<br>";
        };
    } 
else
    document.getElementById("eredmény").innerHTML = "Bocsánat, de a böngésződ nem támogatja a szerver által küldött eseményeket...";

//Geolocation API
//a felhasználótól kérdezzük le a földrajzi helyzetét, személyes adat, így a felhasználótól engedélyt kell kérni
var x = document.getElementById("demo");
function Helymeghatarozas() {
    if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(showPosition);
    else
        x.innerHTML = "Geolocation is not supported by this browser.";
}
function showPosition(position) 
{
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " +
    position.coords.longitude;
}

//Drag and Drop API
let dragged = null;

const source = document.getElementById("draggable");
source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
});

const target = document.getElementById("drop-target");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as a link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "dropzone") {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});

//ChartJS menü
const data={
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        data: [203, 384, 199, 234, 547],
        label: 'Value'
    }

    ]

}
const ctx = document.querySelector('#my-chart');

const myChart = new Chart(
    ctx,
    {
        type: 'line',
        data
    }
)