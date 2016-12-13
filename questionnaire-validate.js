window.onload = function () {
  // Obtain the form and the submit button elements
  // and save them to variables
  var questionnaireElement = document.getElementById("questionnaire");
  var submitButton = document.querySelector("button");
  // When the submit button is clicked...
  submitButton.addEventListener('click', function(event) {
    // ...fire the checkQuestionnaire function
    checkQuestionnaire();
  });
  // When the submit event is detected on the questionnaire form...
  questionnaireElement.addEventListener('submit', function(event) {
    // ...prevent its default operation to send the form
    // since this is not necessary for this project
    event.preventDefault();
  });
  // This function checkes the validity of the options in the questionnaire
  function checkQuestionnaire() {
    // Obtain the current state of the radio elements and other form field
    // and save them to variables
    var radioElements = document.querySelectorAll("input[type=radio]");
    var otherFieldElement = document.querySelector("input[type=text]");
    // Create a selectionMade flag to toggle whether or not a radio
    // option has been selected
    var selectionMade = false;
    // Create a for loop to go through each radio element found in the form
    for (var i = 0; i < radioElements.length; i++) {
      // If a radio element is found to be checked...
      if (radioElements[i].checked === true) {
        // ...toggle the selectionMade flag to true
        selectionMade = true;
        // ...and set the form validity to true on the other field
        // since it can't be put on the radio buttons because they are
        // hidden
        otherFieldElement.setCustomValidity("");
      }
      // If the last radio (the other field) is checked...
      if (radioElements[radioElements.length - 1].checked === true) {
        // ...call the checkOtherField function and pass in the other field
        // element
        checkOtherField(otherFieldElement);
      }
      // If a selection has not been made...
      if (!selectionMade) {
        // ..display a custom message to request some kind of a selection
        otherFieldElement.setCustomValidity("You must choose an element before"+
          " you submit this questionnaire.");
      }
    }
  }
  // The checkOtherField will check the input value of the other field
  function checkOtherField(element) {
    // Capture the string value of the other field and save to a variable
    var input = element.value;
    // If the other field is found empty...
    if (validator.isEmpty(input)) {
      // ...display a custom message requesting for the user to input their
      // custom element
      element.setCustomValidity("You must enter your custom element if you " +
        "choose the option 'Other'.");
      // ...else if the input has extra leading or trailing or containing spaces
    } else if (!validator.isTrimmed(input)){
      // ...display a custom message to request the removal of the extra spaces
      element.setCustomValidity("Please remove any extra space " +
        "characters from your custom element entry.");
      // ...else, set the other field to valid.
    } else {
      element.setCustomValidity("");
    }
  }
};
