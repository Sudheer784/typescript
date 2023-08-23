var _a, _b, _c;
//@ts-nocheck
var addedValues = [];
function addRow() {
    // Get the input value
    var inputValue = document.getElementById('inputValue').value.trim();
    // Check if the input value is empty
    if (inputValue === '') {
        alert('Input value cannot be empty.');
        return;
    }
    // Check if the value has already been added
    if (addedValues.includes(inputValue)) {
        alert('Task already added.');
        return;
    }
    // Get the table body
    var tableBody = document.querySelector('#dataTable tbody');
    if (!tableBody) {
        return;
    }
    // Create a new row
    var newRow = document.createElement('tr');
    // Create cells for the columns
    var checkboxCell = document.createElement('td');
    var valueCell = document.createElement('td');
    var statusCell = document.createElement('td');
    var deleteCell = document.createElement('td');
    // Create checkbox element
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // Create a dropdown element for the status
    var statusDropdown = document.createElement('select');
    var options = ['To-Do', 'In-Progress', 'Completed'];
    // Populate dropdown options
    options.forEach(function (option) {
        var optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        statusDropdown.appendChild(optionElement);
    });
    // Set the content of cells
    valueCell.textContent = inputValue;
    deleteCell.innerHTML = '<button onclick="deleteRow(this)"><ion-icon name="trash-outline"></ion-icon></button>';
    // Append elements to cells
    checkboxCell.appendChild(checkbox);
    statusCell.appendChild(statusDropdown);
    // Append cells to the row
    newRow.appendChild(checkboxCell);
    newRow.appendChild(valueCell);
    newRow.appendChild(statusCell);
    newRow.appendChild(deleteCell);
    // Append the row to the table body
    tableBody.appendChild(newRow);
    // Push the input value into the list
    addedValues.push(inputValue);
    // Clear the input value
    document.getElementById('inputValue').value = '';
}
function deleteRow(button) {
    var row = button.closest('tr');
    if (!row) {
        return;
    }
    var valueCell = row.querySelector('td:nth-child(2)');
    if (!valueCell) {
        return;
    }
    var value = valueCell.textContent || '';
    var index = addedValues.indexOf(value);
    if (index !== -1) {
        addedValues.splice(index, 1);
    }
    row.remove();
}
(_a = document.getElementById('searchInput')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (event) {
    var searchQuery = event.target.value.toLowerCase();
    filterTable(searchQuery);
});
// Add event listener for the status dropdown change
(_b = document.querySelector('#dataTable tbody')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
    if (event.target instanceof HTMLSelectElement) {
        var status_1 = event.target.value;
        var row = event.target.closest('tr');
        if (!row) {
            return;
        }
        var valueCell = row.querySelector('td:nth-child(2)');
        var checkbox = row.querySelector('input[type="checkbox"]');
        if (!valueCell || !checkbox) {
            return;
        }
        if (status_1 === 'Completed') {
            valueCell.classList.add('completed');
            checkbox.checked = true;
            checkbox.disabled = true;
        }
        else {
            valueCell.classList.remove('completed');
            checkbox.disabled = false;
        }
    }
});
// Add event listener for search input
(_c = document.getElementById('searchInput')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (event) {
    var searchQuery = event.target.value.toLowerCase();
    filterTable(searchQuery);
});
function filterTable(query) {
    var rows = document.querySelectorAll('#dataTable tbody tr');
    rows.forEach(function (row) {
        var _a;
        var valueCell = row.querySelector('td:nth-child(2)');
        var value = ((_a = valueCell === null || valueCell === void 0 ? void 0 : valueCell.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        if (value.includes(query)) {
            row.style.display = 'table-row';
        }
        else {
            row.style.display = 'none';
        }
    });
}
