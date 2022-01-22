//get user inputs
function getValues() {
    let loanAmount = document.getElementById("loanAmount").value;

    let term = document.getElementById("term").value

    let interestRate = document.getElementById("rate").value;

    let calculatedRate = calcRate(interestRate);

    let payment = calcPayment(loanAmount, calculatedRate, term,);

    let totalPayments = calcPaymentSchedule(loanAmount, calculatedRate, term, payment);

    displayData(totalPayments);
}

//calculate the interest rate
function calcRate(interestRate) {
    return (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
}

//calculate the monthly payment
function calcPayment() {
    return (balance * rate);
}

//calculate payment schedule
function calcPaymentSchedule() {
    let payments = [];

    //variables for the schedule
    let balance = amount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;

    //loop for each month of the loan term
    for (month = 1; month <= term; month++) {
        monthlyInterest = calcRate;
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal

        //information contained in the object
        let loanPayment = {
            month: month,
            payments: payments,
            principal: monthlyPrincipal,
            totalInterest: totalInterest,
            balance: balance
        }
        payments.push(loanPayment);
    }
    return payments;
}


//display data in the table
function displayData(payments, loanAmount, payment) {
    let tableBody = document.getElementById("paymentBody");
    let template = document.getElementById("paymentSchedule");

    //clear the table for more calculations
    tableBody.innerHTML = "";

    for (let index = 0; index < payments.length; index++) {

        payRow = template.contentEditable.cloneNode(true);
        payCols = payRow.querySelectorAll("td");

        //build the row
       
        paycols[0].textContent = payments[i].month;
        paycols[1].textContent = payments[i].payment.toFixed(2);
        paycols[2].textContent = payments[i].principal.toFixed(2);
        paycols[3].textContent = payments[i].interest.toFixed(2);
        paycols[4].textContent = payments[i].totalInterest.toFixed(2);
        paycols[5].textContent = payments[i].balance.toFixed(2);

        //append to the table
        tableBody.appendChild(payRow);
    }

    //total interest is in the last row of the payments array.
    let totalInterest = payments[payments.length - 1].totalInterest;
    //calculate total cost
    let totalCost = Number(loanAmount) + totalInterest;

    //Build out the summary area
    let labelPrincipal = document.getElementById("totalPrincipal");
    labelPrincipal.innerHTML = Number(loanAmount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    let paymentdiv = document.getElementById("payment");
    paymentdiv.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    let totalCostDiv = document.getElementById("totalCost");

    totalCostDiv.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

}