
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

// Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";

let innerHtml = `${headerHtml}`;
let employeePayrollList = createEmployeePayrollJSON();
 for (const employeePayrollData of employeePayrollList)
 {
    innerHtml = `${innerHtml }
     <tr>
      <td><img class="Profile" src="${employeePayrollData._profilePic}" alt=""></td>
      <td>${employeePayrollData._name}</td>
      <td>${employeePayrollData._gender}</td>
       <td>${getDeptHtml(employeePayrollData._department)}</td>
       <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
        <img name="${employeePayrollData._id}" onclick="remove(this)"
                          src="../images/delete-black-18dp.svg" alt="delete">
         <img name="${employeePayrollData._id}" onclick="update(this)"
                               src="../images/create-black-18dp.svg" alt="edit">
        </td>
         </tr>
       `;
  }
                    
document.querySelector('#display').innerHTML = innerHtml;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: 'Kajal Wankhede',
            _gender: 'Female',
            _department: [
                'HR',
                'Finance'
            ],
            _salary: '3000000',
            _startDate: '1 November 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../ProfileImages/Ellipse -1.png'
        },
        {
            _name: 'Jitendra Jadhav',
            _gender: 'Male',
            _department: [
                'Sales'
            ],
            _salary: '5000000',
            _startDate: '20 October 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../ProfileImages/Ellipse -2.png'
        }
    ];
    return employeePayrollListLocal;
}

