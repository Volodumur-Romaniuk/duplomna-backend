const Objectbut = require("./Objectbut");
class Reservation {
    constructor(date) {
        this.date = date;
        this.objectbutton = []
    for(let i = 0;i < 25;i++){
        this.objectbutton[i]= new Objectbut(i,0,"","",false,"")
    }
       
    }
}

module.exports = Reservation;


