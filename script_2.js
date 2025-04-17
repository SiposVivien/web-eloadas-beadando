  // Adatok tárolása
  let data = [];
  let currentEditId = null;

  // DOM elemek
  const tableBody = document.querySelector('#dataTable tbody');
  const form = document.getElementById('dataForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const rajtszInput = document.getElementById('rajtsz');
  const counInput = document.getElementById('coun');
  const addBtn = document.getElementById('addBtn');
  const updateBtn = document.getElementById('updateBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // Validációs hibákhoz
  const errorElements = {
      name: document.getElementById('nameError'),
      email: document.getElementById('emailError'),
      rajtsz: document.getElementById('rajtszError'),
      coun: document.getElementById('counError')
  };

  // Eseményfigyelők
  addBtn.addEventListener('click', addData);
  updateBtn.addEventListener('click', updateData);
  cancelBtn.addEventListener('click', cancelEdit);

  // Adatok megjelenítése a táblázatban
  function renderTable() {
      tableBody.innerHTML = '';
      
      data.forEach((item, index) => {
          const row = document.createElement('tr');
          
          row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.email}</td>
              <td>${item.rajtsz}</td>
              <td>${item.coun}</td>
              <td>
                  <button onclick="editData(${index})">Szerkesztés</button>
                  <button onclick="deleteData(${index})">Törlés</button>
              </td>
          `;
          
          tableBody.appendChild(row);
      });
  }

  // Validáció
  function validateForm() {
      let isValid = true;
      
      // Név validáció
      if (nameInput.value.length < 3 || nameInput.value.length > 50) {
          errorElements.name.textContent = 'A névnek 3-50 karakter hosszúnak kell lennie!';
          isValid = false;
      } else {
          errorElements.name.textContent = '';
      }
      
      // Email validáció
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
          errorElements.email.textContent = 'Érvényes email címet adj meg!';
          isValid = false;
      } else {
          errorElements.email.textContent = '';
      }
      
      // Rajtsorszám validáció
      if (rajtszInput.value < 1 || rajtszInput.value > 120) {
          errorElements.rajtsz.textContent = 'A rajsorszámra 2-120 között kell lennie!';
          isValid = false;
      } else {
          errorElements.rajtsz.textContent = '';
      }
      
      // Country validáció
      if (counInput.value.length < 2 || counInput.value.length > 30) {
          errorElements.coun.textContent = 'Az országnévnek 2-30 karakter hosszúnak kell lennie!';
          isValid = false;
      } else {
          errorElements.coun.textContent = '';
      }
      
      return isValid;
  }

  // Új adat hozzáadása
  function addData() {
      if (!validateForm()) return;
      
      const newData = {
          name: nameInput.value,
          email: emailInput.value,
          rajtsz: rajtszInput.value,
          coun: counInput.value
      };
      
      data.push(newData);
      renderTable();
      form.reset();
  }

  // Adat szerkesztése
  function editData(index) {
      const item = data[index];
      nameInput.value = item.name;
      emailInput.value = item.email;
      rajtszInput.value = item.rajtsz;
      counInput.value = item.coun;
      
      currentEditId = index;
      addBtn.style.display = 'none';
      updateBtn.style.display = 'inline-block';
      cancelBtn.style.display = 'inline-block';
  }

  // Adat frissítése
  function updateData() {
      if (!validateForm()) return;
      
      data[currentEditId] = {
          name: nameInput.value,
          email: emailInput.value,
          rajtsz: rajtszInput.value,
          coun: counInput.value
      };
      
      renderTable();
      cancelEdit();
  }

  // Szerkesztés megszakítása
  function cancelEdit() {
      form.reset();
      currentEditId = null;
      addBtn.style.display = 'inline-block';
      updateBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      
      // Hibák törlése
      for (const key in errorElements) {
          errorElements[key].textContent = '';
      }
  }

  // Adat törlése
  function deleteData(index) {
      if (confirm('Biztosan törölni szeretnéd ezt a bejegyzést?')) {
          data.splice(index, 1);
          renderTable();
          
          if (currentEditId === index) {
              cancelEdit();
          }
      }
  }

  // Kezdeti adatok betöltése (opcionális)
  function loadSampleData() {
      data = [
          { name: 'Max Verstappen', email: 'super.max@f1.com', rajtsz: 1, coun: 'Hollandia' },
          { name: 'George Russel', email: 'georgi.russl@f1.com', rajtsz: 63, coun: 'Anglia' },
          { name: 'Lando Norris', email: 'landooo@f1.com', rajtsz: 4, coun: 'Anglia' },
          { name: 'Oscar Piastri', email: 'oscarpi.astri@f1.com', rajtsz: 81, coun: 'Ausztrália' }
      ];
      renderTable();
  }

  // Oldal betöltésekor
  window.onload = loadSampleData;




  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dataTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  function filterTable() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, matchFound;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows
    for (i = 0; i < tr.length; i++) {
      matchFound = false;
      // Check both columns (0 and 1)
      for (var col = 0; col <= 4; col++) {
        td = tr[i].getElementsByTagName("td")[col];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            matchFound = true;
            break; // No need to check other columns if match found
          }
        }
      }
      
      // Show/hide row based on match
      tr[i].style.display = matchFound ? "" : "none";
    }
  } 
  // Make functions available globally
window.editData = editData;
window.deleteData = deleteData;
window.filterTable = filterTable;
window.sortTable = sortTable;
