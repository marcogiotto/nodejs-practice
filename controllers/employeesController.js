
const data = {
    employees: require('../data/data.json'),
    setEmployee: function (data) { this.employees = data }
};


const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    const employee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    data.setEmployee([...data.employees, employee]);
    res.json(data.employees);
};

const deleteEmployee = (req, res) => {
    data.setEmployee(data.employees.filter(employee => employee.id !== req.body.id));
    res.json(data.employees)
};

const updateEmployee = (req, res) => {
    const newData = data.employees.map((employee) => {
        if (employee.id == req.body.id) {
            employee.firstName = req.body.firstName,
                employee.lastName = req.body.lastName;
        }
        return employee;
    });
    if (newData) {
        data.setEmployee(newData);
        return res.json(newData)

    }

    res.status(400).json({ error: 'not found' });
};

const getEmployee = (req, res) => {
    const employeeData = data.employees.find(employee => employee.id == req.params.id);
    if (employeeData) {
        return res.json(employeeData);
    }
    res.status(444).json({ error: 'not found' });
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
};