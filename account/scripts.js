import Action from "./classes/Action.js";
import ActionsManager from "./classes/ActionsManager.js";



let manager = new ActionsManager();
let food = new Action("expense", "fruits", 200,"creditCard");
manager.addAction(food);
manager.addAction(new Action("income", "salary", 10000,"creditCard"));
manager.addAction(new Action("income", "salary", 10000,"creditCard"));

///added
let savingManager = new ActionsManager();
let save1 = new Action("saving", "fruits", 200,"creditCard");
savingManager.addAction(save1);
savingManager.addAction(new Action("saving", "salary", 10000,"creditCard"));

const balance=savingManager.calcBalanceFinal()+manager.calcBalanceFinal()
savingManager.updateCalcBalance(balance)

///////להעביר את שני הטבלאות של שניהם


console.log(manager.actions);
// manager.deleteAction(food.id);
// console.log(manager.actions);
// manager.updateAction(food.id,350);
// manager.calcBalance()
// savingManager.calcBalance()
// console.log(manager.balance);


// a function that shows all the actions according to manager.actions array
function showActionsInTable() {
    document.getElementById("actions").innerHTML="";
    for (let action of manager.actions) {
    document.getElementById(
    "actions"
    ).innerHTML += `<tr class=${
    action.type == "income" ? "text-success" : "text-danger"
    }><td>${action.type} </td> <td>${action.description} </td> <td>${action.amount} </td><td>${action.payment} </td><td><i class="fa-regular fa-pen-to-square text-dark" onclick="updateAction(${action.id})"></i> </td> <td><i class="fa-regular fa-trash-can text-dark" onclick="deleteAction(${
    action.id
    },'incomeTable')"></i> </td></tr>`;
    }
}


/////להחליף לצבע כחול 
function showActionsInSavingTable() {
    document.getElementById("saving").innerHTML="";
    for (let action of savingManager.actions) {
    document.getElementById(
    "saving"
    ).innerHTML += `<tr class=
     "text-primary" 
    ><td>${action.type} </td> <td>${action.description} </td> <td>${action.amount} </td><td>${action.payment} </td> <td><i class="fa-regular fa-trash-can text-dark" onclick="deleteAction(${
    action.id
    },'savingTable')"></i> </td></tr>`;
    }
}
showActionsInSavingTable()
showActionsInTable();

window.addNewAction = () => {
  // take the form values
let type = document.getElementById("type").value;
let description = document.getElementById("description").value;
let amount = +document.getElementById("amount").value;
let payment = document.getElementById("payment").value;
  // create action object

///////validtor

console.log(type,description,amount,payment)
///////לטפל בזה שהוא לא סוכם את הסכום של הפקדונות והוא לא מציג אותם בתור הוצאה



 if(description==''){
  alert("you must enter  description");
  return
}
else if(amount==''){
  alert("you must enter amount")
  return
}



  // add newAction to manager actions array
  if(type=="saving"){

    let savingAction = new Action(type, description, amount,payment);
savingManager.addAction(savingAction);

  }
else{


  
  
let newAction = new Action(type, description, amount,payment);
  manager.addAction(newAction)
 
}

const balance=savingManager.calcBalanceFinal()+manager.calcBalanceFinal()
savingManager.updateCalcBalance(balance)
document.getElementById("type").value = "income";
document.getElementById("description").value = "";
document.getElementById("amount").value = "";
document.getElementById("payment").value = "Direct";
 showActionsInTable();
showActionsInSavingTable()
};


 window.updateAction=async (id)=>{
  ////local storage
  //////לשנות את הסכום ולשנות האם זה הכנסה או הוצאה
  const { value: fruits } = await Swal.fire({
  title: 'Select type of income',
  input: 'select',
  inputOptions: {
    'typeOfIncome': {
      income: 'income',
      expense: 'expense',
     
    },
  },
  inputPlaceholder: '',
  showCancelButton: true,
  inputValidator: (value) => {
    return new Promise((resolve) => {
      if (value === 'income'||value==='expense') {
        resolve()
      } 
    })
  }
})

console.log({ value: fruits })

const { value: formValues } = await Swal.fire({
  title: 'enter new amount:',
  html:
    '<input id="swal-input1" class="swal2-input">' 
    ,
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
    
    ]
  }
})

if (formValues) {
  // Swal.fire(JSON.stringify(formValues))
}

let newAmount={ value: formValues }.value
if (newAmount== null || newAmount =="")
alert("sorry! something went wrong");
else{
manager.updateAction(id,+newAmount,{ value: fruits }.value )


    showActionsInTable();
showActionsInSavingTable()

const balance=savingManager.calcBalanceFinal()+manager.calcBalanceFinal()
savingManager.updateCalcBalance(balance)
}
};













window.deleteAction = (id,type) => {
// console.log(type)
console.log(type)
  // confirm
if (confirm("Are you sure?")) {


  if(type=="savingTable"){
savingManager.deleteAction(id)

  }
  else{
     manager.deleteAction(id); 
  }
  




    showActionsInTable();
showActionsInSavingTable()

const balance=savingManager.calcBalanceFinal()+manager.calcBalanceFinal()
savingManager.updateCalcBalance(balance)

}
};
