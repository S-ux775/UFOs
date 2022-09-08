// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {} ;
 
// 3. Use this function to update the filters. 
function updateFilters(){

  let filteredData = tableData;

  let date = d3.select("#datetime").property("value")
  if (date) {
    filteredData = filteredData.filter(row => row.datetime === date);
  }

  let city = d3.select("#city").property("value");
  if (city) {
    filteredData = filteredData.filter(row => row.city === city);
  }

  let state = d3.select("#state").property("value");
  if (state){
    filteredData = filteredData.filter (row => row.state === state);
  }  

  let country = d3.select("#country").property("value");
  if (country){
    filteredData = filteredData.filter (row => row.country === country);
  }  

  let shape = d3.select("shape").property("value");
  if (shape){
    filteredData = filteredData.filter (row => row.shape === shape);
  } 

  // Add a listener
  d3.selectAll("#date").on("change".UpdateFilters);  

  // 4a. Save the element that was changed as a variable .
  let changedElement=d3.select(this);

// 4b. Save the value that was changed as a variable.
  let elementValue = changedElement.property("value");
  console.log(elementValue); 

// 4c. Save the id of the filter that was changed as a variable.
// let element value = changedElement.property("value");
  let filterId = changedElement.attr("id");
  console.log(filterId);

// 5. If a filter value was entered then add that filterId and value
// to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
  filters[filterId]=elementValue;
}
  else {
    delete filters[filterId]; 
  }  

// 6. Call function to apply all filters and rebuild the table
// write code to filter the table based on the user input
// that is stored in the filters variable.
  filterTable();
}

// 7. Use this function to filter the table data 
// by the value that is entered for the "id" that has changed.
function filterTable() {

// 8. Set the filtered data to the tableData.
// create a variable for the filtered data that is equal to the data that builds
// the table. 
// This variable will hold the updated table data based on the user input.
let filteredData = tableData;           

// 9. Loop through all of the filters and keep any data that
// matches the filter values
// store the data that matches the filter values ... 
// in the variable created in Step 8.

  Object.entries(filters).forEach(([key,value])=>{
    filteredData=filteredData.filter(row=>row[key]===value)
   });

// 10. Finally, rebuild the table using the filtered data
// by passing the variable created in Step 8.

buildTable(filteredData)

}
  
// 2. Attach an event to listen for changes to each filter
// Event listener
d3.selectAll("input").on("change".UpdateFilters);
    
// Build the table when the page loads
buildTable(tableData);
