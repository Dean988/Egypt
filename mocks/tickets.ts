const tickets = [
  {
    id: 'ticket1',
    type: 'Biglietto Intero',
    price: 15.00,
    description: 'Accesso completo a tutte le esposizioni permanenti e temporanee del museo.',
    benefits: [
      'Accesso a tutte le esposizioni',
      'Audioguida inclusa',
      'Mappa del museo',
      'Accesso prioritario'
    ],
    validityDays: 1,
    note: 'Valido per un ingresso nella data selezionata.'
  },
  {
    id: 'ticket2',
    type: 'Biglietto Ridotto',
    price: 10.00,
    description: 'Tariffa ridotta per studenti, over 65, gruppi di almeno 15 persone.',
    benefits: [
      'Accesso a tutte le esposizioni',
      'Audioguida inclusa',
      'Mappa del museo'
    ],
    validityDays: 1,
    note: 'È richiesto un documento valido che attesti il diritto alla riduzione.'
  },
  {
    id: 'ticket3',
    type: 'Biglietto Famiglia',
    price: 35.00,
    description: 'Biglietto per famiglie (2 adulti + fino a 3 bambini sotto i 18 anni).',
    benefits: [
      'Accesso a tutte le esposizioni',
      'Audioguida inclusa',
      'Mappa del museo',
      'Attività per bambini',
      'Sconto del 10% al negozio del museo'
    ],
    validityDays: 1,
    note: 'I bambini devono essere accompagnati da almeno un adulto.'
  },
  {
    id: 'ticket4',
    type: 'Abbonamento Annuale',
    price: 50.00,
    description: 'Accesso illimitato al museo per un anno dalla data di acquisto.',
    benefits: [
      'Ingressi illimitati per 12 mesi',
      'Inviti a eventi esclusivi',
      'Sconto del 15% al negozio del museo',
      'Sconto del 10% al caffè del museo',
      'Newsletter mensile'
    ],
    validityDays: 365,
    note: 'Carta nominativa non cedibile. È richiesto un documento d\'identità.'
  },
  {
    id: 'ticket5',
    type: 'Visita Guidata',
    price: 25.00,
    description: 'Biglietto intero con visita guidata da un egittologo esperto (durata 90 minuti).',
    benefits: [
      'Accesso a tutte le esposizioni',
      'Tour guidato di 90 minuti',
      'Mappa del museo',
      'Accesso prioritario'
    ],
    validityDays: 1,
    note: 'Le visite guidate partono alle 10:00, 12:00, 14:00 e 16:00. Si consiglia la prenotazione.'
  },
  {
    id: 'ticket6',
    type: 'Caccia al Tesoro',
    price: 20.00,
    description: 'Biglietto intero con partecipazione alla caccia al tesoro interattiva.',
    benefits: [
      'Accesso a tutte le esposizioni',
      'Kit caccia al tesoro',
      'Mappa speciale con indizi',
      'Premio finale per chi completa il percorso'
    ],
    validityDays: 1,
    note: 'Ideale per famiglie con bambini dai 7 anni in su.'
  }
];

export default tickets;