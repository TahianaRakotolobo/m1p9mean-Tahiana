var sha256 = require('js-sha256');
class User{
    // constructor(){
    //     this.id = '';
    //     this.name = '';
    //     this.address = '';
    //     this.usertype = '';
    // }

    constructor(name, password, address, phone, usertype){
        this.id = 1;
        this.name = name;
        this.password = sha256(password);
        this.address = address;
        this.usertype = usertype;
        this.phone = phone;
    }

    createtoken(id){
        var currentdate = Date.now();
        var stringdate = currentdate.toString();
        // console.log('token here');
        // return id;
        console.log(sha256(id + stringdate));
        return sha256(id + stringdate);
    }

}
module.exports=User