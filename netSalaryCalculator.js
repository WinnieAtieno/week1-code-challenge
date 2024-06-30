/*  Challenge 3: Net Salary Calculator (Toy Problem)

write a program whose major task is to calculate an individual’s Net Salary by getting the inputs of basic salary and benefits.
Calculate the payee (i.e. Tax), NHIF Deductions, NSSF Deductions, gross salary, and net salary. 
*/

const readline = require('readline'); //Initializes the readline interface which allows interaction with the user via standard input (process.stdin) and output (process.stdout).

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(prompt) {
    return new Promise((resolve, reject) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

function netSalaryCalculator(basicSalary, benefits) {
    //defining constants
    //tax deductions
    const TAX_DEDUCTIONS = [
        { min: 0, max: 24000, rate: 0.1 },
        { min: 24001, max: 32333, rate: 0.25 },
        { min: 32334, max: 500000, rate: 0.3 },
        { min: 500001, max: 800000, rate: 0.325 },
        { min: 800001, max: Infinity, rate: 0.35 }
    ];

    //nhif deductions
    const NHIF_RATES = [
        { min: 0, max: 5999, amount: 150 },
        { min: 6000, max: 7999, amount: 300 },
        { min: 8000, max: 11999, amount: 400 },
        { min: 12000, max: 14999, amount: 500 },
        { min: 15000, max: 19999, amount: 600 },
        { min: 20000, max: 24999, amount: 750 },
        { min: 25000, max: 29999, amount: 850 },
        { min: 30000, max: 34999, amount: 900 },
        { min: 35000, max: 39999, amount: 950 },
        { min: 40000, max: 44999, amount: 1000 },
        { min: 45000, max: 49999, amount: 1100 },
        { min: 50000, max: 59999, amount: 1200 },
        { min: 60000, max: 69999, amount: 1300 },
        { min: 70000, max: 79999, amount: 1400 },
        { min: 80000, max: 89999, amount: 1500 },
        { min: 90000, max: 99999, amount: 1600 },
        { min: 100000, max: Infinity, amount: 1700 }
    ];

    const NSSF_RATE_EMPLOYEE = 0.06;
    //const HOUSING_LEVY_RATE = 0.015;

    // Validate input
    if (isNaN(basicSalary) || isNaN(benefits) || basicSalary < 0 || benefits < 0) {
        throw new Error('Invalid input. Salary and benefits must be valid positive numbers.');
    }

    // Calculate gross income
    let grossIncome = basicSalary + benefits;

    // Calculate PAYE deduction
    let payeDeduction = 0;
    for (let i = 0; i < TAX_DEDUCTIONS.length; i++) {
        if (grossIncome > TAX_DEDUCTIONS[i].max) {
            payeDeduction += (TAX_DEDUCTIONS[i].max - TAX_DEDUCTIONS[i].min + 1) * TAX_DEDUCTIONS[i].rate;
        } else {
            payeDeduction += (grossIncome - TAX_DEDUCTIONS[i].min + 1) * TAX_DEDUCTIONS[i].rate;
            break;
        }
    }

    // Calculate NHIF deduction
    let nhifDeduction = 0;
    for (let i = 0; i < NHIF_RATES.length; i++) {
        if (grossIncome >= NHIF_RATES[i].min && grossIncome <= NHIF_RATES[i].max) {
            nhifDeduction = NHIF_RATES[i].amount;
            break;
        }
    }

    // Calculate NSSF deduction
    let nssfDeduction = grossIncome * NSSF_RATE_EMPLOYEE;

    // Calculate Housing Levy deduction
    //let housingLevyDeduction = grossIncome * HOUSING_LEVY_RATE;

    // Calculate net salary
    let netSalary = grossIncome - payeDeduction - nhifDeduction - nssfDeduction 
    return netSalary;
}

async function calculateNetSalary() {
    try {
        const basicSalary = parseFloat(await getUserInput('Enter basic salary: '));
        const benefits = parseFloat(await getUserInput('Enter benefits: '));

        const netSalary = netSalaryCalculator(basicSalary, benefits);

        console.log(`Net Salary: ${netSalary.toFixed(2)} KES`);

        rl.close();
    } catch (error) {
        console.error(error.message);
        rl.close();
    }
}

// Invoking function to start the net salary calculation
calculateNetSalary();
