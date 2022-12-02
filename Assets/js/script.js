// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function setTextInputOnPageLoad(){
    $(".description").each(function () {
      var textInput = this;
      var text = localStorage.getItem(textInput.parentElement.id)
      textInput.innerHTML = text;
    })
  }

  function addSaveButtonEventListeners() {
    $(".saveBtn").each(function () {
      var button = this;
      var parentID = button.parentElement.id;
      button.addEventListener("click", function () {
        event.preventDefault();
        var textInput = $("#"+parentID).children('textarea')
        localStorage.setItem(parentID, textInput.val())
        console.log(textInput.val());
      });
    })
  }

  setTextInputOnPageLoad()
  addSaveButtonEventListeners()
  setTodaysDate()
});

// Code to display the current date in the header of the page.
function setTodaysDate() {
  var dateEl = $("#currentDay");
  var today = new Date();
  var day = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  var mm = today.toLocaleDateString('en-US', {
    month: 'long',
  });
  var dd = today.getDate();

  today = day + ', ' + mm + ' ' + dd;
  dateEl.text(today);
}

