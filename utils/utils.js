const getValidation = (data,data2)=>{
    var usernameContainer = data2.map((val)=>{return val['Username']});
    var emailContainer = data2.map((val)=>{return val['Email']});
    var phoneContainer = data2.map((val)=>{return val['Phone_number']});
    if(usernameContainer.includes(data['username']))
    {
        return "Username already exists";
    }
    else if(emailContainer.includes(data['email']))
    {
        return "Email already exists";
    }
    else if(phoneContainer.includes(data['phone']))
    {
        return "Phone number already exists";
    }
    else
    {
        return true;
    }
}

const parseDate = (time)=>{
    if(time < 10){
        time ="0" + time;
    }
    return time;
}
const todayDate=(date)=>{
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
 


module.exports = {getValidation,todayDate};