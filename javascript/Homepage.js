window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

// Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
        
<tr>
<td><img class="Profile" alt="" src="../ProfileImages/Ellipse -1.png">
</td>
<td>Kajal Wankhede</td>
<td>Female</td>
<td><div class='dept-label'>HR</div>
    <div class='dept-label'>Finance</div>
</td>
<td>3000000</td>
<td> 1 November 2020</td>
<td>
  <img id="1" onclick="remove(this)" alt="delete" src="../images/delete-black-18dp.svg">
  <img id="1" onclick="update(this)" alt="edit" src="../images/create-black-18dp.svg">
</td>
</tr>
    `;
    document.querySelector('#display').innerHTML = innerHtml;
}
