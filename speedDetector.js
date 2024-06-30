/* Challenge 2: Speed Detector (Toy Problem)

Write a program that takes the speed of a car as input e.g 80. If the speed is less than 70, it should print “Ok”. Otherwise, for every 5 km/s above the speed limit (70), it should give the driver one demerit point and print the total number of demerit points.

For example, if the speed is 80, it should print: “Points: 2”. If the driver gets more than 12 points, the function should print: “License suspended”.
*/

const readline = require('readline'); //Initializes the readline interface which allows interaction with the user via standard input (process.stdin) and output (process.stdout).
const speedlimit = 70;
let demeritPoints = 0


const getSpeed= () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Car speed: \n', (speed) => {   //prompt user for input and  a call back fuction  that closes the readline resource  and
            rl.close();
            resolve(parseFloat(speed)); //resolves promise with a parsed speed value
        });
    });
};

getSpeed()  //Subsequent event handlanders
.then((speed) =>{
    if (isNaN(speed) || speed < 0 || speed > 330) {
        throw new Error('Invalid input. Please enter a positive number.');
    }
    else if (speed < 70){
        return 'Ok'
    }
    else{
        demeritPoints = ((speed - speedlimit) / 5);
         
        if(demeritPoints > 12){
            return `“License suspended”`
        }
        else{
            return demeritPoints
        }
        
    }
    
})
.then(result =>{
    console.log (result)
})
.catch((err) => {
    console.error('Error:', err.message);
});
