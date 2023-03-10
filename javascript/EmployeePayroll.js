let isUpdate=false;
let employeePayrollObj={};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function () {
        if (name.value.length == 0) {
            textError.textContent = "*Name field is empty!!";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (exception) {
            textError.textContent = exception;
        }
    });

    const startDate = document.querySelector("#startDate");
    let newDate=new Array();
    const dateError = document.querySelector(".date-error");
    startDate.addEventListener("input", function() {
        newDate.push(document.querySelector("#day").value);
        newDate.push(document.querySelector("#month").value);
        newDate.push(document.querySelector("#year").value);
        try {
            (new EmployeePayrollData()).startDate = newDate;
            dateError.textContent = "";
        } catch (exception) {
            dateError.textContent = exception;
        }
        newDate=new Array();
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });

    checkForUpdate();
});

class EmployeePayrollData{

    get id() {return this._id;}
    set id(id){
        this._id=id;
    }
    get name()
    { 
          return this._name; 
      }
  set name(name) 
      {
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
         if (nameRegex.test(name)) {
            this._name = name;
            }
              else throw 'Name is incorrect!';
          }


    get profilePic() {return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get gender() {return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    get department() {return this._department;}
    set department(department){
        this._department = department;
    }

    get salary() {return this._salary;}
    set salary(salary){
        this._salary = salary;
    }

    get startDate() {return this._startDate;}
    set startDate(startDate){
        let newDate = new Date(startDate[2],(startDate[1]-1),startDate[0]);
        //console.log(newDate);
        if(newDate<=new Date()) this._startDate = newDate;
        else throw 'Start Date is incorrect';
    }

    get notes() {return this._notes}
    set notes(notes){
        this._notes = notes;
    }

    //toString method
    toString(){
        return "id="+this.id+" : name="+this.name+
                " : gender="+this.gender+" : Dept="+this.department+
                " : salary="+this.salary+" : Start Date="+empDate+
                " : Notes="+this.notes;
    }
}

let employees=new Array();
let employeeData = new EmployeePayrollData();

function save() {
    try {
        const output = document.querySelector('.salary-output');

        employeeData.name = document.getElementById('name').value;
        employeeData.id=getid();
        employeeData.profilePic = getRadioValue(document.getElementsByName('profile'));
        employeeData.gender = getRadioValue(document.getElementsByName('gender'));
        employeeData.department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
        employeeData.salary = output.textContent;

        let start=new Array();
        start.push(document.getElementById('day').value);
        start.push(document.getElementById('month').value);
        start.push(document.getElementById('year').value);
        employeeData.startDate = start;

        employeeData.notes = document.getElementById('notes').value;
        console.log(employeeData);
    }
    catch (exception) {
        console.error(exception);
    }
    employees.push(employeeData);
    console.log(employees);
    createAndUpdateStorage(employeeData);
}

function getRadioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function getCheckBoxValue(boxes) {
    let boxlist = new Array();
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            boxlist.push(boxes[i].value)
        }
    }
    return boxlist;
}
function createAndUpdateStorage(employeeData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeeData);
    }else{
        employeePayrollList=[employeeData];
    }
    console.log(employeePayrollList);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const resetForm = ()=>{
    document.forms[0].reset();
    setValue('#salary',400000);
    const output = document.querySelector('.salary-output');
    output.textContent = 400000;
    const textError = document.querySelector('.text-error');
    textError.textContent = "";
    const dateError = document.querySelector(".date-error");
    dateError.textContent = "";
}
function getEmpDataFromLocalStorage(){
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
};
function getid(){
    let empList=getEmpDataFromLocalStorage();
    return empList.length+1;
}
function saveNreset(){
    save();
    resetForm();
}
function checkForUpdate(){
    console.log("Upda");
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson?true:false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    console.log(employeePayrollJson);
    console.log(employeePayrollObj);
    setForm();
}
const setForm = ()=>{
    console.log(employeePayrollObj);
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setCheckBox('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = employeePayrollObj._startDate.toString().slice(0,10).split("-");
    setValue('#day',day[2])
    setValue('#month',date[1])
    setValue('#year',date[0]);
}
const setValue = (id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}
const setSelectedValues = (propertyValue,value)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value==value)
        item.checked = true;
    });
}
const setCheckBox = (property, values) => {
    let items = document.querySelectorAll(property);
    items.forEach(item => {
        if (values.includes(item.value)) {
            item.checked = true;
        }
    });
}
const setTextValue=(id,value)=>{
    const element = document.querySelector(id)
    element.textContent=value;
}