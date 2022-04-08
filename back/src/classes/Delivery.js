class Delivery{
    // constructor(){
    //     this.id = '';
    //     this.name = '';
    //     this.address = '';
    //     this.userType = '';
    // }

    constructor(id, iddeliveryman){
        this.id = 0;
        this.idorder = id;
        this.iddeliveryman = iddeliveryman;
        this.state = 'a livrer';
    }

}
module.exports=Delivery