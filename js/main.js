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
            activeBellStatus:false,
            darkModeTogle:true,
            recive:'chatRecive',
            sent:'chatSent',
            indexSoundTogle:-1,
            search:'',
            sound:true,
            soundCheck:true,
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
        mounted: function () {
            // aggiugo un nuovo valore per ogni contatto, ovvero il silenzioso
            for(i=0;i<this.contacts.length;i++){
                this.contacts[i].sound=false;
                this.contacts[i].soundCheck=false;
            }
        },
        'methods':{
            //funzione di debug
            log:function(elem){
                console.log(elem);
            },
            //chat attiva a destra
            insertHeaderRight:function(indice){
                this.activeChat=indice;
            },
            //invio di un nuovo messaggio nella chat attiva
            addMessages:function(element,stat){ 
                if(element.length>0){
                    this.newMessageObj.text=element;
                    this.newMessageObj.status=stat;
                    this.contacts[this.activeChat].messages.unshift(this.newMessageObj);
                    // oppure splice
                }else console.log('Non hai scritto nessun messaggio');
                this.newMessage='';
                
            },
            //risposta automatica
            answareMessages:function(){
                this.newMessageObjAns.text='ok';
                this.contacts[this.newActiveChat].messages.unshift(this.newMessageObjAns);
            },
            //delay della risposta automatica
            delayMessages:function(){
                this.newActiveChat=this.activeChat;
                setTimeout(this.answareMessages,1000);            
            },
            // aggiungere il valore del contextMenu nel singolo messaggio inviato, invece di metterlo di default in tutti i messaggi per risparmiare memoria
            addBooleanOnContact:function(index){
                activeMessage=index;
                this.contacts[this.activeChat].messages[this.activeMessage].contextMenu=true;
                console.log(activeMessage);
                console.log(this.contacts[this.activeChat].messages);
            },
            contextMenuChat:function(index){
                this.contacts[this.activeChat].messages[index].contextMenu=true;
                console.log(this.contacts[this.activeChat]);
            },
            contextMenuChatRemove:function(){
                if(this.activeChat>-1 &&this.indexSoundTogle>-1){
                    // console.log(this.contacts[this.activeChat].messages[this.activeMessage].contextMenu);
                    this.contacts[this.activeChat].messages[this.activeMessage].contextMenu=false;
                    // console.log(this.contacts[this.activeChat].messages[this.activeMessage].contextMenu);
                    this.contacts[this.indexSoundTogle].soundCheck=false;
                }
            },
            //funzione per eliminare il singolo messaggio
            delateMessage: function(index){
                this.contacts[this.activeChat].messages.splice(index);
            },
            //disattivare l'audio della chat
            soundCheckTogle:function(index){
                this.contacts[index].soundCheck=!this.contacts[index].soundCheck;
                this.indexSoundTogle=index;
            },
            soundTogle:function(index){
                this.contacts[index].sound=!this.contacts[index].sound;
            },
            //disattivare le notifiche, div azzurro sopra la chat
            activeBell:function(){
                this.activeBellStatus = !this.activeBellStatus
                console.log(this.activeBellStatus);
            },
            darkMode:function(){
            this.darkModeTogle= !this.darkModeTogle;
            console.log(this.darkModeTogle);
            },
            //funzione per far inserire il colore delle spunte blu in ritardo

            // color:function(){
            //     return 
            // },
            // delayColorCheck:function(elem){
            //     setTimeout(this.elem,3000)
            // }
        }
        
    })
}
document.addEventListener('DOMContentLoaded',init);