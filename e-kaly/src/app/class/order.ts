export class Order {
    id = 0;
    idplate = '';
    nb = 0;
    idclient = -1;
    idresto = -1;
    date = new Date();
    state = '';

    constructor(idplate:string, nb:number, idclient:number, idresto:number, date:Date, state:string) {
        this.id = 0;
        this.idplate = idplate;
        this.nb = nb;
        this.idclient = idclient;
        this.idresto = idresto;
        this.date = date;
        this.state = state;
    }
}
