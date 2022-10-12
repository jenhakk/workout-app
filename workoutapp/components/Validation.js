const validateNumbers = event => {
  // a variable to hold the value, which is validated here and returned back to Views
  let newText = '';

  //  a variable which consists of allowed marks
  let numbers = '.0123456789';

  // loop goes through received user input and checks if input is found from variable numbers' value
  //  -> if yes and input is zero or greater, it's added to variable newText.
  //  -> otherwise alert is called to inform of an invalid value
  for (var i = 0; i < event.length; i++) {
    if (numbers.indexOf(event[i]) > -1) {
      newText += event[i];
    } else {
      alert('Please enter whole numbers only!');
    }
  }

  return newText;
};

export {validateNumbers};
