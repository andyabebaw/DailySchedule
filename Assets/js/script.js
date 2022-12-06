var timeData = [];
var timeIDs = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5"]
var timeName = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]
var timeValues = [9, 10, 11, 12, 13, 14, 15, 16, 17]

class TimeData {
  constructor(timeID, timeName, timeValue) {
    this.timeID = timeID;
    this.timeName = timeName;
    this.timeValue = timeValue;
  }
  getTense() {
    var hours = new Date().getHours();
    if (hours > this.timeValue) {
      return "past";
    } else if (hours < this.timeValue) {
      return "future";
    } else {
      return "present";
    }
  }
}

// Fills time Data with all the TimeData objects for each work hour
for (let i = 0; i < timeIDs.length; i++) {
  var timeElement = new TimeData(timeIDs[i], timeName[i], timeValues[i]);
  timeData.push(timeElement);
}


$(function () {
  addTimeElements()
  setTextInputOnPageLoad()
  addSaveButtonEventListeners()
  setTodaysDate()
});

// Creates Time Element Html Code and adds it to the webpage
function addTimeElements(){
  timeData.forEach(function (time) {
    var timeElement = createTimeElement(time.timeID, time.timeName, time.getTense());
    $(".container-lg").append(timeElement);
  });
}

// Converts TimeData Object to Html Code
function createTimeElement(timeID, timeName, tense) {
  return ('<div id="' + timeID + '" class="row time-block ' + tense + '">' +
    '<div class="col-2 col-md-1 hour text-center py-3">' + timeName + '</div>' +
    '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>' +
    '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
    '<i class="fas fa-save" aria-hidden="true"></i>' +
    '</button>' +
    '</div>')
}

// Sets Time Elements Text based on LocalStorage
function setTextInputOnPageLoad() {
  $(".description").each(function () {
    var textInput = this;
    var text = localStorage.getItem(textInput.parentElement.id)
    textInput.innerHTML = text;
  })
}

// Adds event listeners to all the save buttons 
function addSaveButtonEventListeners() {
  $(".saveBtn").each(function () {
    var button = this;
    var parentID = button.parentElement.id;
    button.addEventListener("click", function () {

      event.preventDefault();
      var textInput = $("#" + parentID).children('textarea')
      localStorage.setItem(parentID, textInput.val())
    });
  })
}

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