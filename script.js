(function(){
    "use strict";

    const url = "https://cpe-web-assignments.ucdavis.edu/formprocessing/emailprocessor.php";
    const contactForm = document.getElementById('contactForm')
    contactForm.addEventListener('submit',validate)

    const feedBackMessage = [
        `<div class="error"><h3>Ooops!</h3><p>The name field is required,that's how I know who you are.
        Please fix that and try again!</p></div>`,
        `<div class="error"><h3>Ooops!</h3><p>You forgot to give me a vaild email address.
        Please fix that and try again!</p></div>`,
        `<div class="error"><h3>Ooops!</h3><p>Somehow you forgot to type in your comment.
        Please fix that and try again!</p></div>`,
        `<div class="success"><p>Your thoughts have been sent, and I look forward to 
        reading them.</p></div>`,
        `<div class="preloader"><img src="ZKZg.gif" alt="loading">
        </div>`
    ];

    function validate(evt){
        evt.preventDefault();

        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const commentsField = document.getElementById('comments');

        const reName = /^[a-zA-Z0-9]+$/ ;
        const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
        let errors = 0 ;
        //console.log(nameField.value,emailField.value,commentsField.value)

        if( !reName.test(nameField.value)){
            displayMessage(nameField,feedBackMessage[0])
            errors++;
        }else if( !reEmail.test(emailField.value)){
            displayMessage(emailField,feedBackMessage[1])
            errors++;
        }else if( commentsField.value == '' ){
            displayMessage(commentsField,feedBackMessage[2])
            errors++;
        }
        if( errors==0){
            sendData();
        }
    }

    function displayMessage( field , message ){
        const display = document.getElementById('message');
        display.className = 'show-message';
        display.innerHTML = message ;
        setTimeout(()=>{   
            display.classList.add('fadeOutElement');
            setTimeout(()=>{
                if( field !== 'success'){
                    display.className = 'hide-message';
                    document.getElementById(field.id).focus();
                }else{
                    display.className = 'hide-message';
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('comments').value = '';
                }
            },1500)
        },1500)
        
    }
    
    function sendData(){
        const display = document.getElementById('message');
        display.className = "show-message";
        display.innerHTML = feedBackMessage[4];
        setTimeout(async()=>{
            const formData = new FormData(contactForm);
            const response  = await fetch(url,{method:"POST",body:formData})
            const jsonData = await response.json();
            //console.log(jsonData.result)
            if(jsonData.result == 'success'){
                displayMessage( 'success', feedBackMessage[3]);
            }
        },1500)
    }

})();