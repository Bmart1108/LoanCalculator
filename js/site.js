//calculate the payment for the loan
function calcPayment(amount, rate, term) {
    return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}
//calculate the interest for the current balance of the loan
function calcInterest(balance, rate) {
    return balance * rate;

}
//convert rate to a monthly interest rate
function calcRate(rate) {

    return rate / 1200
}


function getValues() {
    let loanAmount = document.getElementById("lamount").value;
    //months inputted from the user
    let loanTerm = document.getElementById("lterm").value;
    let loanRate = document.getElementById("lrate").value;

    loanAmount = Number(loanAmount);
    loanTerm = parseInt(loanTerm);
    loanRate = parseFloat(loanRate);
    loanRate = calcRate(loanRate);

    //Calculate a payment

    let payment = calcPayment(loanAmount, loanRate, loanTerm);

    //return a list of payment objects
    let payments = getPayments(loanAmount, loanRate, loanTerm, payment)


    displayData(payments, loanAmount, payment);


}

//build amoritization schedule
function getPayments(amount, rate, term, payment) {

    let payments = [];
    let balance = amount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;

    for (let month = 1; month <= term; month++) {

        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = Math.abs(balance - monthlyPrincipal);

        //add the details to an object
        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        };

        payments.push(curPayment);
    }

    return payments;

}

//display data to the user
function displayData(payments, loanAmount, payment) {
    let tableBody = document.getElementById("scheduleBody");

    let template = document.getElementById("schedule-Template");

    //clears the table of previous data
    tableBody.innerHTML = ""

    //configure currency formatter
    let currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    for (let index = 0; index < payments.length; index++) {

        //<tr>.....</tr>
        let payRow = template.content.cloneNode(true);

        let payCols = payRow.querySelectorAll("td");

        payCols[0].textContent = payments[index].month;
        payCols[1].textContent = currencyFormatter.format(payments[index].payment.toFixed(2));
        payCols[2].textContent = currencyFormatter.format(payments[index].principal.toFixed(2));
        payCols[3].textContent = currencyFormatter.format(payments[index].interest.toFixed(2));
        payCols[4].textContent = currencyFormatter.format(payments[index].totalInterest.toFixed(2));
        payCols[5].textContent = currencyFormatter.format(payments[index].balance.toFixed(2));

        tableBody.appendChild(payRow);
    }
    //total interest is in the last row of the payment
    let totalInterest = payments[payments.length - 1].totalInterest

    //calculate the total cost
    let totalCost = Number(loanAmount) + totalInterest;

    let totalPrincipal = Number(loanAmount);

    let labelPrincipal = document.getElementById("totalPrincipal");

    labelPrincipal.innerHTML = totalPrincipal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"

    });

    let labelPayment = document.getElementById("payment");
    labelPayment.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let labelTotalCost = document.getElementById("totalCost");
    labelTotalCost.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

}