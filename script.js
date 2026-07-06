// Paste your deployed Google Apps Script Web App URL here
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwDb1r5E1Y6j3R-YGJXwfpR4_w7I_9b7E5JLOkY6PvQ1P9-CcJjGAVLlgTfO8zdseejoA/exec';
const form = document.getElementById('billingForm');
const errorMsg = document.getElementById('errorMsg');
const receiptSection = document.getElementById('receiptSection');
const receiptOutput = document.getElementById('receiptOutput');
const transactionCountDisplay = document.getElementById('transactionCount');
const historyList = document.getElementById('historyList');
let transactionCount = 0;
const sessionHistory = [];
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const consumption = parseFloat(document.getElementById('waterConsumption').value);
    const type = document.getElementById('customerType').value;
    let error = '';
    if (!name) {
        error = 'Please enter the Customer Name.';
    } else if (isNaN(consumption) || consumption <= 0) {
        error = 'Please enter a valid Water Consumption (greater than 0).';
    } else if (!type) {
        error = 'Please select a Customer Type.';
    }
    if (error) {
        errorMsg.textContent = error;
        errorMsg.classList.remove('hidden');
        receiptSection.classList.add('hidden');
        return;
    }
    errorMsg.classList.add('hidden');
    let rate = 0;
    if (consumption >= 1 && consumption <= 20) {
        rate = 25.00;
    } else if (consumption >= 21 && consumption <= 40) {
        rate = 35.00;
    } else if (consumption >= 41 && consumption <= 60) {
        rate = 45.00;
    } else if (consumption > 60) {
        rate = 60.00;
    }
    const amount = consumption * rate;
    let discountRate = 0;
    switch (type) {
        case 'Senior Citizen':
            discountRate = 0.25; 
            break;
        case 'Solo Parent':
            discountRate = 0.15; 
            break;
        case 'Regular':
        default:
            discountRate = 0.00; 
            break;
    }
    const discountAmount = amount * discountRate;
    const totalBill = amount - discountAmount;
    transactionCount++;
    transactionCountDisplay.textContent = transactionCount;
    const receiptText = 
`============================================
                WATER BILLING
============================================

Customer Name        : ${name}
Customer Type        : ${type}
Water Usage          : ${consumption} cu.m
Rate                 : ₱${rate.toFixed(2)} / cu.m
--------------------------------------------
Amount               : ₱${amount.toFixed(2)}
Discount             : ₱${discountAmount.toFixed(2)}
--------------------------------------------
TOTAL BILL           : ₱${totalBill.toFixed(2)}
============================================`;
    receiptOutput.textContent = receiptText;
    receiptSection.classList.remove('hidden');
    const record = { name, consumption, type, totalBill, time: new Date().toLocaleString() };
    sessionHistory.push(record);
    
    historyList.innerHTML = '';
    sessionHistory.forEach(function(entry) {
        const li = document.createElement('li');
        li.textContent = `${entry.name} - ₱${entry.totalBill}`;
        historyList.appendChild(li);
    });
    recordTransaction(record);
    form.reset();
});
function recordTransaction(record) { 
  if (!WEB_APP_URL) { 
    console.warn('Google Apps Script URL not set. Data not saved.'); 
    return; 
  } 
  fetch(WEB_APP_URL, { 
    method: 'POST', 
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, 
    body: JSON.stringify(record) 
  })
  .then(() => console.log('Transaction saved to Google Sheets!')) 
  .catch(err => console.error('Error saving transaction:', err)); 
}