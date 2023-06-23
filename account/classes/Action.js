export default class Action{
    constructor(type,description,amount,payment){
        this.id=Math.floor(Math.random()*1001)
        this.type=type
        this.description=description;
        this.payment=payment
        this.amount= type=="expense"||type=="saving" ?-amount:amount
    }
    get(propName){
        return this[propName];
    }
    set(propName,value){
        this[propName]=value;
    }
}