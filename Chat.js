(function(){
    var Chat=function(socketLayer){
        var self=this;
        var root;
        var header;
            var headerCloseButton;
        var content;
            var list;
            var footer;
                var footerInput;
                var footerSendButton;

        // init
        function init(){
            initNode();
            socketLayer.onReceive(receiveMessage);
        }

        function initNode(){
            root = initRoot();

            // header
            header = initHeader();
                headerCloseButton = initHeaderCloseButton();
                root.appendChild(headerCloseButton);
            root.appendChild(header);

            // content
            content = initContent();
            
                list = initList();
                content.appendChild(list);

                footer = initFooter();
                content.appendChild(footer);

                    footerInput = initFooterInput();
                    footer.appendChild(footerInput);

                    footerSendButton = initFooterSendButton();
                    footer.appendChild(footerSendButton);

            root.appendChild(content);

            document.getElementsByTagName('body')[0].appendChild(root);
            attachHandlers();
        }

        function initRoot(){
            var node = document.createElement('div');
            node.setAttribute('style',
                '\
                    position:fixed;\
                    bottom:50px;\
                    right:50px;\
                    cursor:pointer;\
                    font-size: 15px;\
                    transition: all 1s;\
                    background-color:#2A2C30;\
                    border:5px solid #2269A2;\
                    border-radius:3px;\
                    width:75px;\
                    height:20px;\
                    text-align:center;\
                    color:white;\
                    overflow:hidden;\
                    font-family:AvenirNext-Regular,HelveticaNeue;\
                '
            );
            return node;
        }

        function initHeader(){
            var node = document.createElement('div');
            node.innerHTML='chat';
            node.setAttribute('style',
                '\
                    cursor:pointer;\
                    font-size: 15px;\
                    transition: all 1s;\
                    background-color:#2269A2;\
                    height:20px;\
                    margin:0px;\
                    width:100%;\
                    text-align:center;\
                    color:white;\
                    font-family:AvenirNext-Regular,HelveticaNeue;\
                '
            );
            return node;
        }

        function initHeaderCloseButton(){
            var node = document.createElement('div');
            node.innerHTML="X";
            node.setAttribute('style',
                '\
                    cursor:pointer;\
                    font-size: 15px;\
                    transition: all 0.3s;\
                    background-color:#2269A2;\
                    height:20px;\
                    margin:0px;\
                    width:100%;\
                    text-align:center;\
                    color:white;\
                    font-family:AvenirNext-Regular,HelveticaNeue;\
                    position:absolute;\
                    top:-20px;\
                    left:5px;\
                    width:5px;\
                '
            );

            return node;
        }

        function initContent(){
            var node = document.createElement('div');
            node.setAttribute('style',
                '\
                    width:100%;\
                    height:250px;\
                    overflow:hidden;\
                    background-color:#2A2C30;\
                '
            );
            return node;
        }

        function initList(){
            var node = document.createElement('div');
            node.setAttribute('style',
                '\
                    width:100%;\
                    height:190px;\
                    overflow:scroll;\
                '
            );
            return node;
        }

        function initFooter(){
            var node = document.createElement('div');
            node.setAttribute('style',
                '\
                    width:100%;\
                    height:55px;\
                    overflow:hidden;\
                    border-top:5px solid #2269A2;\
                    position:relative\
                '
            );
            return node;

        }

        function initFooterInput(){
            var node = document.createElement('input');
            node.setAttribute('placeholder', 'type message here');
            node.setAttribute('style',
                '\
                    outline:none;\
                    -webkit-appearance:none;\
                    border:none;\
                    display:inline;\
                    border:0px solid #24D39A;\
                    width:150px;\
                    height:35px;\
                    color:white;\
                    background-color:transparent;\
                    margin:0px;\
                    position:absolute;\
                    top:0px;\
                    left:0px;\
                '
            );
            return node;
        }

        function initFooterSendButton(){
            var node = document.createElement('input');
            node.setAttribute('type', 'button');
            node.setAttribute('value', 'send');
            node.setAttribute('style',
                '\
                    outline:none;\
                    -webkit-appearance:none;\
                    border:none;\
                    display:inline;\
                    background-color:#24D39A;\
                    border:1px solid #24D39A;\
                    width:50px;\
                    height:35px;\
                    margin:0px;\
                    position:absolute;\
                    top:0px;\
                    left:150px;\
                '
            );
            return node;
        }

        // handlers

        function attachHandlers(){
            header.onclick=openChat;
            headerCloseButton.onclick=closeChat;
            footerInput.onkeypress=footerInputKeyup;
            footerSendButton.onclick=sendMessage;
        }

        function openChat(){
            root.style.width='200px';
            root.style.height='250px';
            headerCloseButton.style.top='0px';
        }

        function closeChat(){
            root.style.width='75px';
            root.style.height='20px';
            headerCloseButton.style.top='-20px';
        }

        function footerInputKeyup (e) {
            var enterKey = 13;
            if(e.keyCode === enterKey){ sendMessage(); }
        }

        function sendMessage(){
            if(footerInput.value){
                socketLayer.send({
                    body: footerInput.value
                });
                receiveMessage({
                    body: footerInput.value,
                    fromMe: true,
                    // NOOOOO the below are global vars on window :'(
                    id: id,
                    emoji: emoji
                });
                footerInput.value = '';
            }
        }

        function receiveMessage(message){
            var node = document.createElement('div');
            var textAlign;
            if(message.fromMe){
                node.innerHTML = message.body + message.emoji;
                textAlign = 'right';
            }else{
                node.innerHTML = message.emoji + message.body;
                textAlign = 'left';
            }
            node.setAttribute('style',
                '\
                    text-align:'+ textAlign +';\
                '
            )
            list.appendChild(node);
            list.scrollTop = list.scrollHeight;
        }

        init();
        return self;
    }// end Chat

    var SocketLayer=function(){
        var self = this;
        var onReceiveCallback;
        // global vars being used from window
        // socket
        // id
        // emoji

        self.send=function(message){
            message.id = id;
            message.emoji = emoji;
            socket.emit('chat', message);
            return self;
        }

        self.onReceive=function(callback){
            if(!arguments.length){
                console.warn('SocketLayer.onReceive in Chat.js is a write only method');
                return;
            }
            onReceiveCallback = callback;
            return self;
        }

        socket.on('chat', function(message){
            if(message.id !== id)
                onReceiveCallback(message);
        });

        return self;
    }

    window.addEventListener('load', function(){
        new Chat(new SocketLayer());
    });
})();