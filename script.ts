//@ts-nocheck
const addedValues: string[] = [];

function addRow() {
  // Get the input value
  const inputValue: string = (document.getElementById('inputValue') as HTMLInputElement).value.trim();

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
  const tableBody: HTMLElement | null = document.querySelector('#dataTable tbody');

  if (!tableBody) {
    return;
  }

  // Create a new row
  const newRow: HTMLTableRowElement = document.createElement('tr');

  // Create cells for the columns
  const checkboxCell: HTMLTableCellElement = document.createElement('td');
  const valueCell: HTMLTableCellElement = document.createElement('td');
  const statusCell: HTMLTableCellElement = document.createElement('td');
  const deleteCell: HTMLTableCellElement = document.createElement('td');

  // Create checkbox element
  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';

  // Create a dropdown element for the status
  const statusDropdown: HTMLSelectElement = document.createElement('select');
  const options: string[] = ['To-Do', 'In-Progress', 'Completed'];

  // Populate dropdown options
  options.forEach(option => {
    const optionElement: HTMLOptionElement = document.createElement('option');
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
  (document.getElementById('inputValue') as HTMLInputElement).value = '';
}

function deleteRow(button: HTMLElement) {
  const row: HTMLTableRowElement | null = button.closest('tr');

  if (!row) {
    return;
  }

  const valueCell: HTMLTableCellElement | null = row.querySelector('td:nth-child(2)');

  if (!valueCell) {
    return;
  }

  const value: string = valueCell.textContent || '';
  const index: number = addedValues.indexOf(value);

  if (index !== -1) {
    addedValues.splice(index, 1);
  }

  row.remove();
}

document.getElementById('searchInput')?.addEventListener('input', function (event) {
  const searchQuery: string = (event.target as HTMLInputElement).value.toLowerCase();
  filterTable(searchQuery);
});

// Add event listener for the status dropdown change
document.querySelector('#dataTable tbody')?.addEventListener('change', function (event) {
  if (event.target instanceof HTMLSelectElement) {
    const status: string = event.target.value;
    const row: HTMLTableRowElement | null = event.target.closest('tr');

    if (!row) {
      return;
    }

    const valueCell: HTMLTableCellElement | null = row.querySelector('td:nth-child(2)');
    const checkbox: HTMLInputElement | null = row.querySelector('input[type="checkbox"]');

    if (!valueCell || !checkbox) {
      return;
    }

    if (status === 'Completed') {
      valueCell.classList.add('completed');
      checkbox.checked = true;
      checkbox.disabled = true;
    } else {
      valueCell.classList.remove('completed');
      checkbox.disabled = false;
    }
  }
});

// Add event listener for search input
document.getElementById('searchInput')?.addEventListener('input', function (event) {
  const searchQuery: string = (event.target as HTMLInputElement).value.toLowerCase();
  filterTable(searchQuery);
});

function filterTable(query: string) {
  const rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('#dataTable tbody tr');

  rows.forEach(row => {
    const valueCell: HTMLTableCellElement | null = row.querySelector('td:nth-child(2)');
    const value: string = valueCell?.textContent?.toLowerCase() || '';

    if (value.includes(query)) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
}
