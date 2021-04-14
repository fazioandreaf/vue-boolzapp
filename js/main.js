function init(){
    new Vue({
        'el':'#app',
        'data':{
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: 'img/4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            newActiveChat:-1,
            activeChat:-1, 
            activeMessage:0, 
            recive:'chatRecive',
            sent:'chatSent',
            search:'',
            // prova:0,
            sound:0,
            newMessage:'',
            newMessageObj:{
                date:   new Date().getDate()+ ' / '+ 
                        new Date().getMonth()+ ' / '+
                        new Date().getFullYear() +'  '+ 
                        new Date().getHours()+ ':'+ 
                        new Date().getMinutes()+ ':'+ 
                        new Date().getSeconds(),
                text: '',
                status: 'sent',
            },
            newMessageObjAns:{
                date:   new Date().getDate()+ ' / '+ 
                        new Date().getMonth()+ ' / '+
                        new Date().getFullYear() +'  '+ 
                        new Date().getHours()+ ':'+ 
                        new Date().getMinutes()+ ':'+ 
                        new Date().getSeconds(),
                text: '',
                status: 'received',
            },
            top:'0px',
            left:'0px',

        },
        // mounted: function () {
        //         setInterval(this.addMessages('ok','received'),5000);
        // },
        mounted: function () {
            // aggiugo un nuovo valore per ogni contatto, ovveor il silenzioso
            for(i=0;i<this.contacts.length;i++){
                this.contacts[i].sound=false;
            }
            console.log(this.contacts);
        },

        'methods':{
            insertHeaderRight:function(indice){
                this.activeChat=indice;
            },
            log:function(prova){
                console.log(prova);
            },
            addMessages:function(element,stat){ 
                if(element.length>0){
                    this.newMessageObj.text=element;
                    this.newMessageObj.status=stat;
                    this.contacts[this.activeChat].messages.unshift(this.newMessageObj);
                    // oppure splice
                }else console.log('Non hai scritto nessun messaggio');
                this.newMessage='';
                
            },
            answareMessages:function(){
                this.newMessageObjAns.text='ok';
                this.contacts[this.newActiveChat].messages.unshift(this.newMessageObjAns);
            },
            delayMessages:function(){
                this.newActiveChat=this.activeChat;
                setTimeout(this.answareMessages,1000);            
            },
            addBooleanOnContact:function(index){
                activeMessage=index;
                this.contacts[this.activeChat].messages[this.activeMessage].contextMenu=true;
                 console.log(activeMessage);
                console.log(this.contacts[this.activeChat].messages[this.activeMessage].contextMenu);

            },
            contextMenuChat:function(index){
                this.contacts[this.activeChat].messages[index].contextMenu=true;
                console.log(this.contacts[this.activeChat]);
            },
            contextMenuChatRemove:function(){
                console.log(this.contacts[this.activeChat].messages[this.activeMessage]);
                this.contacts[this.activeChat].messages[this.activeMessage].contextMenu=false;
            },
            delateMessage: function(index){
                this.contacts[this.activeChat].messages.splice(index);
            },
        }
        
    })
}
document.addEventListener('DOMContentLoaded',init);