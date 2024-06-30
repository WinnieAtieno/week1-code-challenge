/*Challenge 1: Student Grade Generator (Toy Problem)
    
Write a function that prompts the user to input student marks. The input should be between 0 and 100. The output should correspond the correct grade, 
as shown below: 

        A > 79, B - 60 to 79, C -  59 to 49, D - 40 to 49, E - less 40.
*/

const readline = require('readline'); //Initializes the readline interface which allows interaction with the user via standard input (process.stdin) and output (process.stdout).


function studentGradeGenerator (){  

const getGrade = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Student marks: ', (grade) => {   //prompt user for input and  a call back fuction  that closes the readline resource  and
            rl.close();
            resolve(parseFloat(grade)); //resolves promise with a parsed grade value
        });
    });
};

getGrade()  //Subsequent event handlanders
    .then((grade) => {
        if (isNaN(grade) || grade < 0 || grade > 100) {
            throw new Error('Invalid input. Please enter a valid number between 0 and 100.');
        } else if (grade > 79) {
            return 'Grade: A';
        } else if (grade >= 60 && grade <= 79) {
            return 'Grade: B';
        } else if (grade >= 50 && grade <= 59) {
            return 'Grade: C';
        } else if (grade >= 40 && grade <= 49) {
            return 'Grade: D';
        } else {
            return 'Grade: E';
        }
    })
    .then((result) => {
        console.log(result); 
    })
    .catch((err) => {
        console.error('Error:', err.message);
    });

}
    
studentGradeGenerator() 


 
