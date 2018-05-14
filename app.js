// alert('Hi Michael, are you ready to begin?');

//Listen for Submit on form
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide Results- want to hide everytime after they show and hit Calculate
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loader').style.display = 'block';
    
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate Results Function

function calculateResults(){
    console.log('Calculating...');
//UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    

//******Calculations******

    const principal = parseFloat(amount.value); //parse into decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

//Compute Monthly Payment
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1); //check to see if finite number

if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block';
    //hide loader gif
    document.getElementById('loader').style.display = 'none';
    
} else {
    showError('Please Check your Numbers');  //call showError function

}
 

} //end of Calcurlated Results function


// SHOW ERROR

function showError(error){

    //Hide Results- want to hide everytime after they show and hit Calculate
    document.getElementById('results').style.display = 'none';
     //hide loader gif
    document.getElementById('loader').style.display = 'none';

    //create alert div
    const errorDiv = document.createElement('div');
    //get elements where we want to insert our alert div
    const cardDiv = document.querySelector('div.card');
    const heading = document.querySelector('h1.heading');



    //add class Alert
    errorDiv.className = 'alert alert-danger';
    //add Text, create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above "headhing"
    cardDiv.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds, .setTimeout method of Window
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('div.alert').remove();
}


