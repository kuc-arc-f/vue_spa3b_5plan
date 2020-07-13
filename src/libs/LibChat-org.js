import axios from 'axios'
//
export default {
    /**********************************************
     *
     *********************************************/
    fcm_get_token: function(messaging,  CHAT_MEMBER_ID ,post_url){
        var textInstanceIdToken = document.getElementById('textInstanceIdToken');
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
//                console.log(currentToken);
                this.sendTokenToServer(currentToken);
                var IID_TOKEN = currentToken;
                textInstanceIdToken.value = IID_TOKEN;
                this.send_token(IID_TOKEN, CHAT_MEMBER_ID ,post_url);
                console.log(CHAT_MEMBER_ID);
            } else {
                alert("ブラウザ通知を許可に設定下さい。メッセージを送受信できません");
                console.log('No Instance ID token available. Request permission to generate one.');
                //updateUIForPushPermissionRequired();
                this.setTokenSentToServer(false);
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token.', err);
            this.setTokenSentToServer(false);
        });
    },
    /**********************************************
     *
     *********************************************/
    fcm_send :function (send_title, send_body, IID_TOKEN, FCM_SERVER_KEY){
        if(IID_TOKEN.length < 1){ return; }
        var key = FCM_SERVER_KEY;
        var to = IID_TOKEN;
        var notification = {
            'title': send_title,
            'body': send_body,
            'icon': 'firebase-logo.png',
            'click_action': 'http://localhost'
        };
    // console.log(notification);
        fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'notification': notification,
            'to': to,
            })
        }).then(function(response) {
            response = "";
            console.log(response);
        }).catch(function(error) {
            console.error(error);
        })
    },
    /**********************************************
     *
     *********************************************/
    fcm_send_member:function (CHAT_MEMBERS, CHAT_ID, body, FCM_SERVER_KEY){
        CHAT_MEMBERS.forEach(function(item){
            var send_title = CHAT_ID + "," + item.user_id;
            this.fcm_send(send_title, body, item.token, FCM_SERVER_KEY);
        });
    },    
    sendTokenToServer: function (){
        if (!this.isTokenSentToServer()) {
            console.log('Sending token to server...');
            // TODO(developer): Send the current token to your server.
            this.setTokenSentToServer(true);
        } else {
            console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
        }       
    },
    isTokenSentToServer: function() {
        return window.localStorage.getItem('sentToServer') === '1';
    } ,  
    setTokenSentToServer :function (sent) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    },    
    /**********************************************
     *
     *********************************************/
    send_token :function (token, CHAT_MEMBER_ID, post_url ){
        var data = {
            'chat_member_id': CHAT_MEMBER_ID,
            'token': token,
        };
        axios.post(post_url , data ).then(res => {
            console.log(res.data );
        });
    },     
    //
    func1 :function(){
        console.log('#_func1aa')
    },

}
