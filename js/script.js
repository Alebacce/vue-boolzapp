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
        selectedContactIndex : 0,
        userMessage: '',
        userSearch: '',
		lastMessage: '',
        lastAccess: dayjs().format('HH:mm'),

        contacts: [
	{
		name: 'Michele',
		avatar: '_1',
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
		avatar: '_2',
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
		avatar: '_3',
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
		name: 'Luigi',
		avatar: '_4',
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
	{
		name: 'Paolo',
		avatar: '_5',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'So Lillo',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Noooooooooooo',
				status: 'received'
			}
		],
	},
	{
		name: 'Miriam',
		avatar: '_6',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Hai comprato le medicine',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Tutte quante',
				status: 'received'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Plauso all\'affidabilità',
				status: 'sent'
			}
		],
	},
	{
		name: 'Amilcare',
		avatar: '_7',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Ma che nome è Amilcare',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Ma chi sei tu? o.O',
				status: 'received'
			}
		],
	},
	{
		name: 'Woody',
		avatar: '_8',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'Woooody',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Dimmi tutto fratello!',
				status: 'received'
			}
		],
	},
	{
		name: 'Alebacce',
		avatar: '_9',
		visible: true,
		messages: [
			{
				date: '10/01/2020 15:30:55',
				text: 'E così sei tu il creatore di questa app',
				status: 'sent'
			},
			{
				date: '10/01/2020 15:50:00',
				text: 'Esattamente',
				status: 'received'
			}
		],
	},
]

    },

    methods: {
		// showChat() mostra la chat selezionata sfruttando l'index del
		// contatto cliccato che le viene passato nell'HTML nell <li>
		// sul quale è applicato il ciclo v-for.
		showChat(index) {
			// L'index viene reso uguale a selectedContactIndex, che da valore
			// iniziale di 0, assumerà ora il valore di ogni index.
			// Essendo poi che messaggi e informazioni riguardanti l'utente attivo
			// vengono tutte passate sempre grazie a selectedContactIndex, il gioco
			// è fatto
            this.selectedContactIndex = index;
        },
        

		// sendMessage() si occupa di inviare messaggi solo alla chat al momento
        // attiva. 
		sendMessage() {
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


			// Sempre sfruttando selectedContactIndex si accede alla chat attiva
			// in quel momento e ci si pusha un nuovo oggetto con tutte le chiavi e i valori
			// che deve avere un messaggio. 
			// Pusho qui nei messaggi ma solo del contatto attivo
            this.contacts[this.selectedContactIndex].messages.push(
                {
                    date: dayjs().format('HH:mm'),
                    text: this.userMessage,
                    status: 'sent'
                },
            );

			// Inoltre con un setTimeout() si pusha all'interno della stessa chat una risposta 
			//automatica che arriva dopo solo un secondo. 
			//Molto impegnatii contatti eh?
            setTimeout ( () => {
                this.contacts[this.selectedContactIndex].messages.push(
                {
                    date: dayjs().format('HH:mm'),
                    text: 'Bellissimo messaggio!',
                    status: 'received'
                }
            )}, 1000)
        },


		// filterChat() si occupa di filtrare le varie chat, accedendo solo a quella/e
		// desiderata/a. 
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
					// un v-if posto nell'HTML sull'elelemento si occuperà di mostrarlo se visible è true
					// altrimenti l'elemento non verrà mostrato
					element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },

    },

	created() {

		printLastMessage( () => {
			this.contacts[index].forEach((element) => {
				this.lastMessage = element.messages.text;
				console.log(this.lastMessage);

				return this.lastMessage
			});
		});
	}

});