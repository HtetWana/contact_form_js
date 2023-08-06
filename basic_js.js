(function(){
    'use strict';

    const url = "https://cpe-web-assignments.ucdavis.edu/formprocessing/processor.php";
    const form = document.getElementById('myform');
    form.addEventListener('submit', validate );

    function validate(evt){
        evt.preventDefault();

        const name = document.getElementById('name').value ;
        const email = document.getElementById('email').value ;
        const url = document.getElementById('url').value ;
        const comments = document.getElementById('comments').value ;

        const reName = /^[a-zA-Z0-9]+$/ ;
        const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
        let errors = 0 ;

        const labels = document.querySelectorAll('label');
        labels.forEach( label => {
            label.style.color = 'black';
        })

        if( !reName.test(name)){
            document.getElementById('name-label').style.color = 'red' ;
            errors++;
        }
        if( !reEmail.test(email)){
            document.getElementById('email-label').style.color = 'red' ;
            errors++;
        }
        if( url == '' ){
            document.getElementById('url-label').style.color = 'red' ;
            errors++;
        }
        if( comments == '' ){
            document.getElementById('comments-label').style.color = 'red' ;
            errors++;
        }
        if( errors==0){
            sendData();
        }
    }

    async function sendData(){
        const dataString = new FormData(form)
        const response  = await fetch(url,{method : "POST" ,body : dataString })
        const text = await response.text();

        console.log(dataString);
        document.getElementById('formdata').innerHTML = text ;
        document.querySelectorAll('.dataFrom').forEach( form =>{
            form.value = "";
        })
    }

    async function load(){
        const response = await fetch(url);
        const text = await response.text();
        document.getElementById('formdata').innerHTML = text ;
    }
    load();

})();