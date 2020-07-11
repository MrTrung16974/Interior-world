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

