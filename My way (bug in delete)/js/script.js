// MILESTONE 1
// Replica della grafica con la possibilità di avere messaggi 
// scritti dall’utente (verdi) e dall’interlocutore (bianco) 
// assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: 
// tramite la direttiva v-for, visualizzare nome e 
// immagine di ogni contatto

// MILESTONE 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for,
// visualizzare tutti i messaggi relativi al contatto attivo 
// all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// MILESTONE 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa 
// e digitando “enter” il testo viene aggiunto al thread sopra, 
// come messaggio verde.
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, 
// l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// MILESTONE 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono 
// visualizzati solo i contatti il cui nome contiene le lettere inserite 
// (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// MILESTONE 5 - opzionale
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che 
// permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti 


var app = new Vue ({
    el: '#root',
    data: {
		// selectedContactIndex è sempre un numero che rappresenta l'indice
		// del contatto attivo all'interno dell'array dei contatti
        selectedContactIndex: 0,
		// selectedMessageIndex può essere falso o un numero
		// se è falso nessun messaggio è attivo e le sue opzioni
		// sono nascoste. Se è un numero, il messaggio con quell'indice
		// avrà visibile le sue opzioni
		selectedMessageIndex: false,
        userMessage: '',
        userSearch: '',
		lastMessage: '',
		// today viene usata per visualizzare l'ultimo accesso del contatto
		today: dayjs().format('DD/MM/YY'),
        // lastAccess mostra la data di invio del messaggio, mostrata anche
		// nella lista contatti
		lastAccess: dayjs().format('HH:mm'),
		// completeDate salva nel singolo oggetto (contatto) la data e l'ora
		// completi del messaggio, qualora venisse utile in futuro
		completeDate: dayjs().format('DD/MM/YY HH:mm'),

		// A contacts.messages sono state aggiunte diverse proprietà utili
		// allo svolgimento degli extra che avevo in mente e al rendere il
		// più possibile questa demo simile al WhatsApp
        contacts: [
		{
			name: 'Michele',
			avatar: '_1',
			visible: true,
			messages: [
				{
					date: '25/03/21 14:13',
					day: 'ieri',
					hour: '14:13',
					text: 'Hai portato a spasso il cane?',
					status: 'sent',
					isRead: true,

				},
				{
					date: '25/03/21 14:50',
					day: 'ieri',
					hour: '14:50',
					text: 'Ricordati di dargli da mangiare',
					status: 'sent',
					isRead: true,

				},
				{
					date: '25/03/21 16:15',
					day: 'ieri',
					hour: '16:15',
					text: 'Tutto fatto!',
					status: 'received',
					isRead: true,

				},
				{
					date: '25/03/21 16:27',
					day: 'ieri',
					hour: '16:27',
					text: 'Grandissimo!',
					status: 'sent',
					isRead: true,
				}
			],
		},
		{
			name: 'Fabio',
			avatar: '_2',
			visible: true,
			messages: [
				{
					date: '20/03/21 16:28',
					day: 'martedì',
					hour: '16:28',
					text: 'Ciao come stai?',
					status: 'sent',
					isRead: true,
				},
				{
					date: '20/03/21 16:31',
					day: 'martedì',
					hour: '16:31',
					text: 'Bene grazie! Stasera ci vediamo?',
					status: 'received',
					isRead: true,
				},
				{
					date: '20/03/21 16:35',
					day: 'martedì',
					hour: '16:35',
					text: 'Mi piacerebbe ma devo andare a fare la spesa.',
					status: 'sent',
					isRead: true,
				},
				{
					date: '20/03/21 16:37',
					day: 'martedì',
					hour: '16:37',
					text: 'Mi dispiace Fabio...',
					status: 'sent',
					isRead: false,
				}
			],
		},
		{
			name: 'Samuele',
			avatar: '_3',
			visible: true,
			messages: [
				{
					date: '19/03/21 10:12',
					day: 'lunedì',
					hour: '10:12',
					text: 'La Marianna va in campagna',
					status: 'received',
					isRead: true,
				},
				{
					date: '19/03/21 10:20',
					day: 'lunedì',
					hour: '10:20',
					text: 'Sicuro di non aver sbagliato chat?',
					status: 'sent',
					isRead: true,
				},
				{
					date: '19/03/21 16:17',
					day: 'lunedì',
					hour: '16:17',
					text: 'Ah scusa!',
					status: 'received',
					isRead: true,
				}
			],
		},
		{
			name: 'Luigi',
			avatar: '_4',
			visible: true,
			messages: [
				{
					date: '19/03/21 15:34',
					day: 'lunedì',
					hour: '15:34',
					text: 'Lo sai che ha aperto una nuova pizzeria?',
					status: 'sent',
					isRead: true,
				},
				{
					date: '19/03/21 15:53',
					day: 'lunedì',
					hour: '15:53',
					text: 'Si, ma preferirei andare al cinema',
					status: 'received',
					isRead: true,
				}
				,
				{
					date: '19/03/21 16:22',
					day: 'lunedì',
					hour: '16:22',
					text: 'Ma Lu c\'è la pandemia...',
					status: 'sent',
					isRead: true,
				}
			],
		},
		{
			name: 'Paolo',
			avatar: '_5',
			visible: true,
			messages: [
				{
					date: '18/03/21 22:44',
					day: '18/03/21',
					hour: '22:44',
					text: 'So Lillo',
					status: 'sent',
					isRead: true,
				},
				{
					date: '18/03/21 23:06',
					day: '18/03/21',
					hour: '23:06',
					text: 'Noooooooooooo',
					status: 'received',
					isRead: true,
				}
			],
		},
		{
			name: 'Sara',
			avatar: '_6',
			visible: true,
			messages: [
				{
					date: '18/03/21 17:14',
					day: '18/03/21',
					hour: '17:14',
					text: 'Hai comprato le medicine',
					status: 'sent',
					isRead: true,
				},
				{
					date: '18/03/21 17:45',
					day: '18/03/21',
					hour: '17:45',
					text: 'Tutte quante',
					status: 'received',
					isRead: true,
				},
				{
					date: '18/03/21 18:26',
					day: '18/03/21',
					hour: '18:26',
					text: 'Plauso all\'affidabilità',
					status: 'sent',
					isRead: true,
				}
			],
		},
		{
			name: 'Amilcare',
			avatar: '_7',
			visible: true,
			messages: [
				{
					date: '02/03/21 09:18',
					day: '02/03/21',
					hour: '09:18',
					text: 'Ma che nome è Amilcare',
					status: 'sent',
					isRead: true,
				},
				{
					date: '02/03/21 11:57',
					day: '02/03/21',
					hour: '11:57',
					text: 'Ma chi sei tu? o.O',
					status: 'received',
					isRead: true,
				}
			],
		},
		{
			name: 'Woody',
			avatar: '_8',
			visible: true,
			messages: [
				{
					date: '10/10/21 17:28',
					day: '10/10/21',
					hour: '17:28',
					text: 'Woooody',
					status: 'sent',
					isRead: true,
				},
				{
					date: '10/10/21 18:04',
					day: '10/10/21',
					hour: '18:04',
					text: 'Dimmi tutto fratello!',
					status: 'received',
					isRead: true,
				},
				{
					date: '10/10/21 18:13',
					day: '10/10/21',
					hour: '18:13',
					text: 'Niente, te la fai una partita?',
					status: 'sent',
					isRead: true,
				},
				{
					date: '10/10/21 18:19',
					day: '10/10/21',
					hour: '18:19',
					text: 'Claro!',
					status: 'received',
					isRead: true,
				}
			],
		},
		{
			name: 'Alebacce',
			avatar: '_9',
			visible: true,
			messages: [
				{
					date: '09/06/96 11:50',
					day: '09/06/96',
					hour: '11:50',
					text: 'E così sei tu il creatore di questa app',
					status: 'sent',
					isRead: true,
				},
				{
					date: '09/06/96 12:00',
					day: '09/06/96',
					hour: '16:27',
					text: 'Esattamente',
					status: 'received',
					isRead: true,
				}
				,
				{
					date: '09/06/96 12:17',
					day: '09/06/96',
					hour: '12:17',
					text: 'Messaggio lunghissimo di prova, superiore ai 30 caratteri così da attivare la funzione .substring()',
					status: 'sent',
					isRead: true,
				}
			],
		}
	]

    },

    methods: {
		/* --------  DISCLAIMER ----------- 
		C'è un bel po' di roba external, ma ciò che era richiesto dall'esercizio
		è stato rispettato
		------------------------------------*/



		/* showChat()
		mostra la chat selezionata sfruttando l'index del
		contatto cliccato che le viene passato nell'HTML nel <li>
		sul quale è applicato il ciclo v-for. */
		showChat(index) {
			// L'index viene reso uguale a selectedContactIndex, che da valore
			// iniziale di 0, assumerà ora il valore di ogni index.
			// Essendo poi che messaggi e informazioni riguardanti l'utente attivo
			// vengono tutte passate sempre grazie a selectedContactIndex, il gioco
			// è fatto
            this.selectedContactIndex = index;
			this.selectedMessageIndex = false;
        },
        



		/* sendMessage() 
		si occupa di inviare messaggi solo alla chat al momento attiva. */ 
		sendMessage() {

			//------------QUELLO CHE NON DEVO FARE!!!--------------
			//------------ Lo tengo per promemoria-----------------
            // this.contacts.forEach((element, index) => {
                // element.messages.push(
                //     // Dentro il singolo elemento pusho il nuovo messaggio inviato
                //     {
                //         date: dayjs().format('HH:mm'),
                //         text: this.userMessage,
                //         status: 'sent'
                //     },
                // );
                // Risposta automatica dopo un secondo!
                // setTimeout ( () => {
                //     element.messages.push(
                //         {
                //             date: dayjs().format('HH:mm'),
                //             text: 'Bellissimo messaggio!',
                //             status: 'received'
                //         },
                //         )}, 1000);
            // });

			//---------------------------------------------------


			// Sempre sfruttando selectedContactIndex si accede alla chat attiva
			// in quel momento e ci si pusha un nuovo oggetto con tutte le chiavi e i valori
			// che deve avere un messaggio. 
			// Pusho qui nei messaggi ma solo del contatto attivo
            this.contacts[this.selectedContactIndex].messages.push(
                {
                    date: this.completeDate,
					day: this.today,
					hour: this.lastAccess,
                    text: this.userMessage,
                    status: 'sent',
					isRead: true,          
				}
            );
			
			// L'input per inviare messaggi torna vuoto dopo l'invio di un messaggio
			this.userMessage = '';
			
			// Mi salvo in questa variabile l'utente al quale ho effettivamente mandato
			// il messaggio (che è il selectedContactIndex di quel momento), che non può 
			// cambiare come invece cambia selectedContactIndex, rimane per forza quell'utente 
			// a cui ho mandato il messaggio, per cui cambiando velocemente chat non corro il 
			// rischio di avere la risposta automatica in un'altra chat, ossia quello che ne 
			// deriverebbe appunto da selectedContactIndex
			const sentActiveContact = this.selectedContactIndex;

			// Inoltre con un setTimeout() si pusha all'interno della stessa chat una risposta 
			//automatica che arriva dopo solo un secondo. 
			//Molto impegnati i contatti eh?
            setTimeout ( () => {
                this.contacts[sentActiveContact].messages.push(
                {
                    date: this.completeDate,
					day: this.today,
					hour: this.lastAccess,
                    text: 'Bellissimo messaggio!',
                    status: 'received',
					isRead: true,
                }
            )}, 1000)
        },



		/* filterChat() 
		si occupa di filtrare le varie chat, accedendo solo a quella/e
		desiderata/a. */  
        filterChat() {
            this.contacts.forEach((element) => {
				// Accedendo all'array dei contatti si passano al vaglio tutti gli
				// elementi e si verifica che la chiave 'name' di questi corrisponda al valore
				// inserito dal'utente nella searchbar ripreso con una v-model.
				// Si sfrutta la funzione .includes() e si annulla ii case sensitive utilizzando
				// .toLowerCase(). 
                if(element.name.toLowerCase().includes(this.userSearch.toLowerCase())) {
                    // Se l'elemento è presente allora il valore della sua chiave visible sarà true, 
					// altrimenti sarà false.
					// Un v-if posto nell'HTML sull'elelemento si occuperà di mostrarlo se visible è true
					// altrimenti l'elemento non verrà mostrato
					element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },



		/* getLastMessage 
		riporta nell'anteprima della chat nella lista dei contatti l'ultimo messaggio
		inviato o ricevuto dal contatto */
		getLastMessage(index) {
			// Verifico se ci siano o meno messaggi nell'array dei messaggi
			let messagesArray = this.contacts[index].messages;
			let emptyMessage ='';

			// Se non c'è nessun messaggio allora getLastMessage ritorna una stringa vuota
			if (messagesArray.length == 0) {
				return emptyMessage;

			// Altrimenti ritorna il testo del messaggio
			} else {
				let lastMessage = messagesArray[messagesArray.length - 1].text;
				let lastMessageLength = 30;
				let lastMessageShort = lastMessage.substring(0, lastMessageLength);
				// Se la lunghezza del messaggio supera i 30 caratteri, viene riportato spezzato
				// con l'aggiunta di 3 puntini di sospensione per far capire che il messaggio non
				// è intero e c'è ancora altro da leggere
				if (lastMessage.length > 30) {
					return lastMessageShort + '...';
				// Altrimenti viene riportato il messaggio nella sua interezza
				} else {
					return lastMessage;
				}
			}			
		},



		/* messageSent 
		fa comparire la spunta di lettura quando il messaggio ha
		come status sent, ossia inviato */
		messageSent(index) {
			let messagesArray = this.contacts[index].messages;
			let sentStatus = messagesArray[messagesArray.length - 1].status;
			if (sentStatus == 'sent') {
				return '<i class="fas fa-check-double"></i>';
			}
		},



		/* getLastDate 
		si occupa di stampare la data dell'ultimo messaggio */
		getLastDate(index) {
			let messagesArray = this.contacts[index].messages;
			let emptyDate ='';

			// Se non ci sono date disponibili, allora non viene stampato nulla
			if (messagesArray.length == 0) {
				return emptyDate;
			// Altrimenti viene stampata l'ultima data
			} else {
				let lastDate = messagesArray[messagesArray.length - 1].day;

				return lastDate;
			}
		},



		/* messageOptions 
		attiva le funzionalità della chevron, permettendo di
		accedere alle opzioni del messaggio */
		messageOptions(index) {
			// this.contacts[this.selectedContactIndex].messages[index].active = !this.contacts[this.selectedContactIndex].messages[index].active;
			// index === this.selectedMessageIndex;
			if (this.selectedMessageIndex === index) {
				this.selectedMessageIndex = false;
			} else {
				this.selectedMessageIndex = index; 
			}
		},



		/* infoMessage 
		da informazioni sul messaggio, comunica lo stato di questo
		e la sua data completa con un alert all'utente */
		infoMessage(index) {
			alert(this.contacts[this.selectedContactIndex].messages[index].status + ' ' + this.contacts[this.selectedContactIndex].messages[index].date)
		},



		/* deleteMessage 
		si occupa di eliminare il messaggio selezionato */
		deleteMessage(index) {
			console.log('prima', this.selectedMessageIndex);
			this.contacts[this.selectedContactIndex].messages.splice(index, 1);
			// Resetto selectedMessageIndex per non avere problemi di indici dopo l'eliminazione
			// di un messaggio
			this.selectedMessageIndex = false;
			console.log('dopo', this.selectedMessageIndex);
		}
		
    },

});