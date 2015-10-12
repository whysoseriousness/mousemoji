(function(){
    var EmailForm = function(){
        var self = this;
        var root;
            var closeButton;
        var preview;
        var content;
            var input;
            var errorsNode;
            var submitButton;

        // init
        function init(){

            if(!Parse.applicationId){
                Parse.initialize("7vII1WG85iFkxeRec0304Is0FkQHi4Y8wfPbqXnM", "AVvFTx5uSpFzmAyQ8vXL9B62mihMJmHrVuDbQECo");
            }

            initNode();    
        }

        function initNode () {
            root = initRoot();
            preview = initPreview();
            content = initContent();

            root.appendChild(preview);
            root.appendChild(content);

            document.getElementsByTagName('body')[0].appendChild(root);
            attachHandlers();
        }

        function initRoot () {
            var node = document.createElement('div');
            node.setAttribute('style',
                '\
                    position:fixed;\
                    cursor:pointer;\
                    font-size: 15px;\
                    transition: all 1s;\
                    background-color:#2A2C30;\
                    border:5px solid #2269A2;\
                    border-radius:3px;\
                    width:75px;\
                    text-align:center;\
                    padding:5px;\
                    color:white;\
                    font-family:AvenirNext-Regular,HelveticaNeue;\
                '
            );
            return node;
        }

        function initPreview(){
            var node = document.createElement('div');
            node.innerHTML = "subscribe";
            node.setAttribute('style',
                ''
            );
            return node;
        }

        function initContent(){
            var node = document.createElement('div');
            node.innerHTML = "yes, I want emails";
            node.setAttribute('style',
                '\
                    height:0px;\
                    overflow:hidden;\
                    transition: all 1s;\
                    padding-top:5px;\
                    border-top:5px solid #2269A2;\
                '
            );

            input = document.createElement('input');
            input.setAttribute('placeholder', 'email');
            input.setAttribute('style',
                '\
                    outline:none;\
                    -webkit-appearance:none;\
                    border:none;\
                    border:1px solid #24D39A;\
                    padding:5px;\
                    width:150px;\
                    color:white;\
                    background-color:transparent;\
                    margin:0px;\
                    margin-top:8px;\
                '
            );
            node.appendChild(input);

            errorsNode = document.createElement('div');
            errorsNode.setAttribute('style',
                '\
                    color:#ffaaaa;\
                '
            );
            node.appendChild(errorsNode);

            submitButton = document.createElement('input');
            submitButton.setAttribute('type', 'button');
            submitButton.setAttribute('value', 'tell me about new stuff');
            submitButton.setAttribute('style',
                '\
                    outline:none;\
                    -webkit-appearance:none;\
                    border:none;\
                    background-color:#24D39A;\
                    border:1px solid #24D39A;\
                    padding:5px;\
                    width:150px;\
                    margin-top:0px;\
                '
            );
            node.appendChild(submitButton);

            closeButton=document.createElement('div');
            closeButton.innerHTML="no thanks";
            closeButton.setAttribute('style',
                '\
                    margin-top:0px;\
                    cursor:pointer;\
                    font-size:12px;\
                '
            );
            node.appendChild(closeButton);

            return node;
        }

        // handlers
        function attachHandlers(){
            preview.onclick=function(){
                root.style.width='200px';
                content.style.height='120px';
            }

            closeButton.onclick=close;

            input.onkeyup=function(){
                var email=this.value;
                if(email && !validateEmail(email)){
                    errorsNode.innerHTML='invalid email';
                }else{
                    errorsNode.innerHTML='';
                }
            }

            submitButton.onclick=function(){
                var email=input.value;
                if(!email){
                    errorsNode.innerHTML='please enter an email';
                }else if(!validateEmail(email)){
                    errorsNode.innerHTML='invalid email...';
                }else{
                    errorsNode.innerHTML='';
                    input.value='';

                    var TestObject = Parse.Object.extend("JM54Email");
                    var testObject = new TestObject();
                    testObject.save({email: email, host: window.location.href}).then(function(object) {
                        alert("Thanks for signing up! We'll email you when we come out with new projects!");
                        
                    close();
                    });
                }
            }
        }

        function close(){
            root.style.width='75px';
            content.style.height='0px';
        }

        // helpers
        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        init();
        return self;
    }// END EMAIL FORM

    window.addEventListener('load', function(){
        new EmailForm();
    });

})();
