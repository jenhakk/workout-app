const validateNumbers=(event)=>{
    let newText = '';
    let numbers = '0123456789';
 
    for (var i = 0; i < event.length; i++) {
        if (numbers.indexOf(event[i]) > -1) {
          newText += event[i];
        } else {
          alert('Please enter whole numbers only!');
        }
      }

    return newText;
}

export {validateNumbers};