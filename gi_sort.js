"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 4

      Author: Christian Gregorio
      Date: 4.5.19
   
   Filename: gi_sort.js
   
   Global Variables:
   tableData
      An 2-dimensional array of the data found in the body of the web table
      
   dataCategories
      An array of the column titles found the head of the web table
      
   sortIndex
      The index number of the column by which the web table should be sorted where 0 = 1st column, 1 = 2nd column, etc.
      
   sortDirection
      A value indicating direction of the sorting where a value of 1 sorts the data in ascending order and a value of -1 sorts the data in descending order
	
   
   
   Functions List:   
   defineDataArray()
      Extracts values from the body of the web table and stores them in the tableData array
      
   writeTableData()
      Writes the sorted data into the table rows and cells       
      
   defineColumns()
      Extracts values form the column heads of the web table and stores them in the dataCategories array; also sets up the onclick event handlers for the column heads so that the table can be sorted by clicking a table heading cell.
           
   columnSort(e)
      Event handler function that sorts the table data when a column heading is clicked  
   
   dataSort2D(a, b)
      Compare function used to sort numeric and alphabetical data from a 2-dimensional array 
    

*/
// Global variables.

var tableData = [];

var dataCategories = [];
// The index number of the column by which the web table should be sorted where 0 = 1st column, 1 = 2nd column, etc.
var sortIndex = 0;
// A value indicating direction of the sorting where a value of 1 sorts the data in ascending order and a value of -1 sorts the data in descending order
var sortDirection = 1;
// Upon loading the page, it will run both the defineDataArray and writeTableData functions.
window.addEventListener("load", function () {
      defineDataArray();
      writeTableData();
      defineColumns();
});


function defineDataArray() {

      var tableRows = document.querySelectorAll("table.sortable tbody tr");
      for (var i = 0; i < tableRows.length; i++) {
            // defines the table rows and all of its children.
            var rowCells = tableRows[i].children;
            // checked this using a window alert to see how many times it would go through(which was the exact amount of table rows there are in the body).
            // Loops through all of the table rows in the table body
            var rowValues = new Array(rowCells.length);

            for (var j = 0; j < rowCells.length; j++) {
                  rowValues = rowCells[j].textContent;
            }
            tableData[i] = rowValues;
      }
      tableData.sort(dataSort2D);
}



function writeTableData() {
      var newTableBody = document.createElement("tbody");
      for (var i = 0; i < tableData.length; i++) {
            var tableRow = document.createElement("tr");
            for (var j = 0; j < tableData[i].length; j++) {
                  var tableCell = document.createElement("td");
                  tableCell.textContent = tableData[i][j];
                  tableRow.appendChild(tableCell);
            }
            newTableBody.appendChild(tableRow);
      }
      var sortTable = document.querySelector("table.sortable");
      var oldTableBody = tableData.appendChild(sortTable);
      document.replaceChild(oldTableBody, newTableBody);
}

function defineColumns() {
      // creates a new stylesheet which will then be appended to the head of the document.
      var sheetLads = document.createElement("style");
      document.head.appendChild(sheetLads);
      // (Can't we just use JavaScript to change the pointer?)
      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th { \
                  cursor: pointer; \
            }", 0);

      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th:after { \
                  content: '\\00a0'; \
                  font-family: monospace; \
                  margin-left: 5px; \
            }", 1);

      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th:nth-of-type(1)::after { \
                  content: '\\25b2'; \
            }", 2);


      for (var i = 0; i < document.querySelectorAll("table thead th").length; i++) {
            dataCategories = i.textContent;
            i.onclick = columnSort;
      }
}

function columnSort(e) {
      var columnText = e.target.textContent;
      var columnIndex = Array.of(dataCategories[columnText]);
      // If the sortIndex matches the columnIndex, make it negative (And switch the direction). Otherwise, make them equal (To switch the direction).
      if (columnIndex === sortIndex) {
            sortDirection * -1;
      } else {
            columnIndex === sortIndex;
      }
      var columnNumber = columnIndex + 1;
      var columnStyles = document.styleSheets[document.styleSheets.length - 1];
      // deletes the third style rule set by the stylesheet in the define columns function
      columnStyles.deleteRule(2);
      if (sortDirection === 1) {
            document.styleSheets[document.styleSheets.length - 1].insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
                        content: '\\25b2'; \
                  }", 2);
      } else {
            document.styleSheets[document.styleSheets.length - 1].insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
                        content: '\\25bc'; \
                  }", 3);
      }
      tableData.sort(dataSort2D);
}







function dataSort2D(a, b) {
      if (isNaN(parseFloat(a[sortIndex])) === false) {
            return (a[sortIndex] - b[sortIndex]) * sortDirection;
      } else {
            var astring = a[sortIndex].toLowerCase();
            var bstring = b[sortIndex].toLowerCase();

            if (bstring > astring) return -sortDirection;
            if (bstring < astring) return sortDirection;
            return 0;
      }
}