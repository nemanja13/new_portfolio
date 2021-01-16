function fScroll(){
    let y=window.scrollY;
    if(y>150){
        $("#logo-small").slideDown("fast");
    }else{
        $("#logo-small").fadeOut("fast");
    }
}
window.onload=function(){
    fScroll();
    $("#submit").click(send_mail)
}
window.onscroll= function(){
    fScroll();
}
function checkValue(input){
    if(input.val().trim().length == 0){
      if(!input.hasClass("error")){
        input.addClass("error");
      }
      return false
    }else{
      input.removeClass("error");
      return true;
    }
  }
  
  function send_mail(){
    let name=$("#name");
    let email=$("#email");
    let subject=$("#subject");
    let message=$("#message");
  
    let error = "Please fill in all required fields"
  
  
    let submit=[];
    submit.push(checkValue(name));
    submit.push(checkValue(email));
    submit.push(checkValue(subject));
    submit.push(checkValue(message));
  
  
    if(!submit.includes(false)){
        $.ajax({
            url: "mail/mail.php",
            method: "post",
            dataType: "json",
            data:{
                submit: true,
                name: name.val(),
                email: email.val(),
                subject: subject.val(),
                message: message.val()
            },
            success: function(data){
                alertify.success(data.success);
                document.getElementById("contactForm").reset();
            },
            error: function(xhr, status, error){
                if(xhr.status==422){
                    xhr.responseJSON.errors.forEach(el => {
                        alertify.error(el);
                    });
                }
                if(xhr.status==500){
                    alertify.error(xhr.responseJSON.error_message);
                }
                if(xhr.status==400){
                    alertify.error(xhr.responseJSON.error_message);
                }
            }
        });
    }else{
        alertify.error(error);
    }
}


