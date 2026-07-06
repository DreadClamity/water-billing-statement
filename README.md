# Water Billing Statement

A Water Billing Statement a simple web for **Midterm Exam Labratory** (DLSU-D, College of Information and Computer Studies, IT Department).

## The Problem
A local water district serves thousands of residential customers every month. Customer bills are computed based on their water consumption and customer classification. Senior Citizens and Solo Parents receive discounts according to existing policies. Currently, the billing clerk performs the computation manually before recording every transaction in a logbook. This process is slow, prone to human error, and difficult to maintain. To improve efficiency, the management wants a simple web-based Water Billing Statement System that can: 
• compute customer bills automatically, 
• apply discounts correctly, 
• display a professional billing statement, 
• count processed transactions, and 
• automatically save each transaction into Google Sheets for future reference.

## Tech & Control Structures
- **HTML/CSS** — semantic layout, CSS Grid + Flexbox, one responsive breakpoint.
- **if-else / else-if** — validates each form field before processing (`script.js`).
- **switch-case** — maps the computed BMI to a category, message, and color.
- **loop (forEach)** — rebuilds the "Recent Submissions" list from a local array.
- **Google Apps Script** — a `doPost` function appends each submission as a new Sheet row.

## Live Demo


## Google Sheet Data Reciever
https://docs.google.com/spreadsheets/d/1MEqoyyPbTKDEkS-LrqN0PDCxa4mvYqPolCU6O5ga-hw/edit?usp=sharing

## Author
Kyle — BIT31, De La Salle University – Dasmariñas
