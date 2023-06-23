export default class ActionsManager{
    constructor(){
this.actions=[];
this.balance=0
    }
    get (propName){
        return this[propName];
    }
    set (propName,value){
        this[propName]=value;
    }
    addAction(action){
        this.actions.push(action);
        this.calcBalance();

    }

    deleteAction(id){
let indexToDelete= this.actions.findIndex ((action)=> action.id==id);
this.actions.splice(indexToDelete,1);
this.calcBalance();
    }


   updateAction(id, newAmount,typeOfIncome) {
    let indexToUpdate = this.actions.findIndex((action) => action.id == id);
    this.actions[indexToUpdate].type =typeOfIncome;
    console.log( "type:", this.actions[indexToUpdate].type);
  
    this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "expense"? -newAmount : newAmount;
this.calcBalance();


  }
calcBalanceFinal() {
    return this.actions.reduce(
      (total, action) => total + action.amount,0
    );
}

updateCalcBalance(balance){
    document.getElementById("balance").innerHTML=`Your Balance: ${balance}` 

    if(balance<0){
        document.getElementById("balance").className="error";
      Swal.fire(
  '',
  'you are in overdraft',
  'question'
 )
    }
    else{
        document.getElementById("balance").className="alert alert-secondary text-center bg-success"
    }
  
    
}
 calcBalance() {
    this.balance = this.actions.reduce(
      (total, action) => total + action.amount,0
    );
    document.getElementById("balance").innerHTML=`Your Balance: ${this.balance}`


localStorage.setItem("sum",this.balance)











//// control k + control c   
///// control k +control u

//     if(this.balance<0){
//         document.getElementById("balance").className="error";
//       Swal.fire(
//   '',
//   'you are in overdraft',
//   'question'
//  )
//     }
//     else{
//         document.getElementById("balance").className="alert alert-secondary text-center bg-light "
//     }
  }
}