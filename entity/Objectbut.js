
class Reservation {
    constructor(id,countPerson,name,email,isReserved,password) {
        
        this.id = id,
        this.countPerson = countPerson;
        this.name = name;
        this.email = email;
        this.isReserved = isReserved;
        this.password = password;
       
    }
}

module.exports = Reservation;


