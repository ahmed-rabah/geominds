let forms = document.querySelectorAll('form') ; 
forms.forEach(form=>{
  let name = form.name ; 
  let mail =form.mail;
  let message= form.message; 
  [mail ,name , message].forEach((input , index)=>{
    input.addEventListener('keyup',()=>{
      let value = input.value ; 
      if((isEmpty(value) && index != 0) ||(index==0 && !isValidEmail(value))){
        input.classList.add('danger-borders')
      }else{
        input.classList.remove('danger-borders')
      }
    })
  })

  form.addEventListener("submit",(e)=>{
    e.preventDefault() ; 
    if(formCheck(form)){
      sendEmail({message : message.value , mail  : mail.value , name : name.value }) ; 
      form.reset() ; 
      return false ; 
    }else{
      [mail ,name , message].forEach((input , index)=>{
          let value = input.value ; 
          if((isEmpty(value) && index != 0) ||(index==0 && !isValidEmail(value))){
            input.classList.add('danger-borders')
          }else{
            input.classList.remove('danger-borders')
          }
      })
  
        Swal.fire({
        title: "Not Sent",
        text: "Make sure all fields are filled, and the email is valid",
        icon: "error" ,
        showCloseButton: true,
      });
    }

  })
})
function sendEmail({message , mail ,name}){
Email.send({
SecureToken : "1989ace9-d5b4-48b1-a4d7-18dd1b16604d" , 
To : "ahmedrabah1937@gmail.com",
From : 'ahmedrabah1937@gmail.com',
Subject : "Geominds_FeedBack from "+ name,
Body : `name : ${name} ,<br>
        email : ${mail} ,<br>
        message : ${message} .<br>`
})
.then(message => {
    if(message == "OK"){

      Swal.fire({
        title: "Success!",
        text: "Message Sent Successfully!",
        icon: "success",
        showCloseButton: true,
      });

    }
  }
)
.catch(error => {
  Swal.fire({
    title: "Oops...",
    text: "server connexion is lost , try later",
    icon: "error" ,
    showCloseButton: true,
  });
});
}
function formCheck(form){
return isValidEmail(form.mail.value) || !isEmpty(form.name.value) || !isEmpty(form.message.value) ; 
}
function isValidEmail(email){
return  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
function isEmpty(input){
return input == ""
}
