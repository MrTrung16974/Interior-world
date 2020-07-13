var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var chatIcon = document.querySelector('#shop_model_chat');
var messageFrom = document.querySelector('.send_message');
var messageInput = document.querySelector('#message_input');
var messageArea = document.querySelector('#messageArea');

var stompClient = null;

function connect(event) {
    if(userDto.username) {
        var socket = new SockJS('http://localhost:8099/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('http://localhost:8099/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: userDto.username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}

function onError(error) {
    toastr.error('Could not connect to WebSocket server. Please refresh this page to try again!');
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: userDto.username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("http://localhost:8099/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}
//
chatIcon.addEventListener('click', connect, true);
messageFrom.addEventListener('submit', sendMessage, true);
(function () {
    console.log('OK');
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            // message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
    });

    $(function () {
        // if(pathname == "/home") {
        //     setTimeout(function () {
        //         $(".chat_window").show(500);
        //         $(".chat_icon").hide(300);
        //     }, 2000);
        // }
        $(".button.close").on('click', function () {
            $(".chat_window").hide(700);
            $(".chat_icon").show(1000);
        });
        $("#shop_model_chat").on('click', function () {
            $(".chat_window").show(500);
            $(".chat_icon").hide(300);
        });
        $(".button.maximize").on('click', function () {
            $(".chat_window").addClass("maximize_chat");
        });
        $(".button.minimize").on('click', function () {
            $(".chat_window").removeClass("maximize_chat");
        });
    });

}.call(this));

