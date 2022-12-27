
class EmployeePayrollData {
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
    
    get id() 
      { 
       return this._id
       }
     set id(id)
      {
        this._id = id;
        }
        
     get profilePic()
     { 
        return this._profilePic; 
        }
     set profilePic(profilePic)
     {
        this._profilePic = profilePic;
        }
    get gender()
    {
      return this._gender;
             }
     set gender(gender)
     {
       this._gender = gender;
    }
    
    get department()
    {
      return this._department; 
        }
    set department(department){
        this._department = department;
    }
        
     get salary()
      { 
         return this._salary}
    set salary(salary) 
    {
    this._salary = salary
      }
    get note()
    { 
        return this._note;
        }
    set note(note){
      this._note = note;
      }
    get startDate() {
     return this._startDate
       }
     set startDate(startDate)
     {
       startDate = new Date(startDate);
      this._startDate = startDate;
    }
        
     toString() {
      const options = {year : 'numeric', month : 'long', day : 'numeric'};
        (new Date(this.startDate)).toLocaleDateString("en-US", options);
        return "name = " + this._name + ", gender="+this._gender+
            ", profilePic="+this._profilePic+", department="+this._department+", salary = " 
            + this._salary + ", start date = " + this.startDate+", note="+this._note;
        }
    }
window.addEventListener('DOMContentLoaded', () => {

const salary = document.querySelector('#salary');      //getting salary element,queryselector return element within documents
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () { // to salary element adding listner when input fired then function being called
    output.textContent = salary.value;
});

const name = document.querySelector('#name');//Event listener for name
const textError = document.querySelector('.text-error');
name.addEventListener('input', function(){
    if(name.value.length == 0){
        textError.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
        textError.textContent = "";
    }catch(e){
        textError.textContent = e;
    }
});
});

const save = () => {
    try{
        let employeePayrollData = createEmployeePayrollData();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}
function createAndUpdateStorage(employeePayrollData){   //storing the data in local storage
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));//list of data into storage
}

const createEmployeePayrollData = () => {  //Creating employee payroll object 
    let employeePayrollData = new EmployeePayrollData();
try{
        employeePayrollData.name = getInputValueById('#name')  //getting the value input filed
    }
catch(e){
        setTextValue('.text-error', e);
        throw e
    }
    employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop(); //profile can be one so poping remaining option
    employeePayrollData.gender = getSelectedValues('[name = gender]').pop();// passing gender
    employeePayrollData.department = getSelectedValues('[name = department]'); //multiple depatment we can select
    employeePayrollData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
               getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    employeePayrollData.note = getInputValueById('#notes');
    alert(employeePayrollData.toString());
    return employeePayrollData;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;    // getting value of elemnt  and returning value
    return value;
} 
const getSelectedValues = (propertyValue) => {  // taking value of name profile,populatin array and returning back
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {   //number of profile pic is there
        if(item.checked){          //select one of them
            setItems.push(item.value);
        }
    });
    return setItems;
}


const resetForm = () => {    //Resetting the form on clicking reset button
    setValue('#name','');
    unsetSelectedValues('[name = gender');
    unsetSelectedValues('[name = department');
    unsetSelectedValues('[name = profile');
    setValue('#salary', ' ');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
    setValue('#notes', '');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });    
}
const setTextValue = (id, value)=>{
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value)=>{
    const element = document.querySelector(id);
    element.value = value;
}