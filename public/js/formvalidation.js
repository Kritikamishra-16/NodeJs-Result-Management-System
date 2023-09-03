

    const setError = (element, msg) => {
        const mb3 = element.parentElement;
        const errorDisplay = element.nextElementSibling; // Get the <small> element next to the input
        errorDisplay.textContent = msg;
        errorDisplay.classList.add('error'); // Apply the 'error' class to the <small> element
                mb3.classList.remove('success');

        mb3.classList.add('error');
    };

    const setSuccess = (element) => {
        const mb3 = element.parentElement;
        const errorDisplay = element.nextElementSibling; // Get the <small> element next to the input
        errorDisplay.textContent = '';
        errorDisplay.classList.remove('error'); // Remove the 'error' class from the <small> element
        mb3.classList.remove('error');
        mb3.classList.add('success');

    };
  
 
  const validateInputs = () => {

    //event.preventDefault();
    const name = document.getElementById('name');
    const rollnumber = document.getElementById('rollnumber');
    const dob = document.getElementById('dob');
    const score = document.getElementById('score');

    const nameval = name.value.trim();
    const rollnumberval = rollnumber.value.trim();
    const dobval = dob.value.trim();
    const scoreval = score.value.trim();


    if (nameval === '') {
      setError(name, 'Name is a required field');
    } else {
      setSuccess(name);
    }

    if (rollnumberval === '') {
      setError(rollnumber, 'Rollnumber is a required field');
    } else if (rollnumberval <= 0 || rollnumberval> 1000 ) {
      setError(rollnumber, 'RollNumber must be between 1 to 1000.');
    } else {
      setSuccess(rollnumber);
    }

    if (scoreval === '') {
      setError(score, 'Score is a required field');
    } else if (scoreval < 0 || scoreval > 100 ) {
      setError(score, 'Score must be between 0 to 100.');
    } else {
      setSuccess(score);
    }

    if (dobval === '') {
      setError(dob, 'dob is a required field');
    } else if (dobval > '2003-01-01' ) {
      setError(dob, 'dob must be less than 01-01-2003.');
    } else {
      setSuccess(dob);
    }

    // Return true or false based on validation
    console.log(document.querySelectorAll('.error').length);
    console.log(!document.querySelectorAll('.error').length);

    return !document.querySelectorAll('.error').length; 
  }
