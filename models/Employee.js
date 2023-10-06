const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    }
});

const Employee = model('Employee', employeeSchema);


// const addEmployee = async (employee) => {

//     const newEmployee = new Employee(employee);

//     try {
//         const docSaved = await newEmployee.save();
//         return docSaved;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// const getEmployees = async () => {

//     const employees = new Employee();


// }

module.exports = Employee;