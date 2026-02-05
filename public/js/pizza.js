document.getElementById("pizza-form").onsubmit = () => {

    clearErrors();

    let isValid = true;

    //validate first name
    let fname = document.getElementById("fname").value.trim();
    if(!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;

    }   

    //validate last name
    let lname = document.getElementById("lname").value.trim();
    if(!fname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;

    }  
    
    // validate email
    let email = document.getElementById("email").value.trim();
    if(!email){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }    

    // validate pizza size 
    let  = document.getElementById("size").value.trim();
    if(size=="none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;

    }
  
    //validate method
    let pickup = document.getElementById("pickup");
    let delivery = document.getElementById("delivery");
    if(!pickup.checked && !delivery.checked) {
        document.getElementById("err-method").style.display = "block"
        isValid = false;
    }


    return isValid;

  

}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for(let i=0; i<errors.length; i++) {
        errors[i].style.display = "none"
    }
}


 
 