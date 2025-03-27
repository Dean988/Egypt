import { TreasureHunt } from '@/types';

const treasureHunts: TreasureHunt[] = [
  {
    id: 'hunt1',
    name: "Il Segreto del Faraone",
    description: "Scopri il messaggio nascosto lasciato da un antico faraone risolvendo enigmi relativi agli artefatti reali esposti nel museo.",
    imageUrl: "https://mammarum.com/wp-content/uploads/2020/08/museo-egizio-torino-con-i-bambini19-1024x768.jpg",
    difficulty: "Medio",
    duration: 45,
    locations: 3,
    ageRange: "8+",
    points: 100,
    clues: [
      {
        id: 'clue1-1',
        question: "Mi ergo alto con corona e barba, il mio nome significa 'Ra l'ha forgiato'. Trovami e conta i simboli sulla mia cintura.",
        hint: "Cerca la statua più grande nella Sala Principale.",
        exhibitId: 'ex1',
        answer: "5",
        imageUrl: "https://www.museiditorino.it/wp-content/uploads/2023/12/statua-museo-egizio-torino.jpg"
      },
      {
        id: 'clue1-2',
        question: "Il mio volto è d'oro, i miei occhi osservano. Quale animale è raffigurato sulla mia fronte?",
        hint: "Questa famosa maschera apparteneva a un giovane re.",
        exhibitId: 'ex2',
        answer: "cobra",
        imageUrl: "https://www.torinotoday.it/~media/horizontal-hi/12733984865485/museo-egizio_2.jpg"
      },
      {
        id: 'clue1-3',
        question: "Ho il corpo di un leone ma di chi è il volto che indosso?",
        hint: "Cerca una creatura mitica nel Giardino delle Sculture.",
        exhibitId: 'ex8',
        answer: "faraone",
        imageUrl: "https://www.museiditorino.it/wp-content/uploads/2023/12/statua-museo-egizio-torino.jpg"
      }
    ],
    estimatedTime: 45,
    ageRecommendation: "8+"
  },
  {
    id: 'hunt2',
    name: "Viaggio nell'Aldilà",
    description: "Aiuta un antico egizio immaginario ad affrontare le sfide dell'aldilà trovando oggetti e incantesimi necessari per il suo viaggio.",
    imageUrl: "https://image.jimcdn.com/app/cms/image/transf/none/path/sf63059cf0e80ccf2/image/i277695e35fd5be56/version/1614080422/image.jpg",
    difficulty: "Difficile",
    duration: 60,
    locations: 4,
    ageRange: "10+",
    points: 150,
    clues: [
      {
        id: 'clue2-1',
        question: "Per preservare i miei organi per l'aldilà, ho bisogno di quattro contenitori speciali. Come si chiamano?",
        hint: "Cerca nella Sala delle Pratiche Funerarie i vasi con teste di animali.",
        exhibitId: 'ex7',
        answer: "vasi canopi",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue2-2',
        question: "Ho bisogno di una guida per il mio viaggio. Trova il papiro con gli incantesimi e scrivi il nome del dio con la bilancia che giudica le anime.",
        hint: "Cerca un lungo rotolo di papiro nella Galleria dei Papiri.",
        exhibitId: 'ex3',
        answer: "anubi",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue2-3',
        question: "Per completare il mio viaggio, devo trovare un viaggiatore ben conservato che ha già fatto questo percorso. Qual era la sua professione?",
        hint: "Cerca una mummia nella Sala B1.",
        exhibitId: 'ex5',
        answer: "architetto",
        imageUrl: "https://image.jimcdn.com/app/cms/image/transf/none/path/sf63059cf0e80ccf2/image/i277695e35fd5be56/version/1614080422/image.jpg"
      }
    ],
    estimatedTime: 60,
    ageRecommendation: "10+"
  },
  {
    id: 'hunt3',
    name: "Detective dei Geroglifici",
    description: "Decodifica antichi messaggi trovando e traducendo geroglifici in tutto il museo.",
    imageUrl: "https://www.guidatorino.com/wp-content/uploads/2017/01/museo-egizio-torino_6.jpg",
    difficulty: "Facile",
    duration: 40,
    locations: 3,
    ageRange: "6+",
    points: 80,
    clues: [
      {
        id: 'clue3-1',
        question: "Trova la pietra che aiutò gli studiosi a decifrare i geroglifici. Quante lingue appaiono su di essa?",
        hint: "Cerca una tavoletta di pietra scura nella Sala delle Lingue.",
        exhibitId: 'ex4',
        answer: "3",
        imageUrl: "https://www.guidatorino.com/wp-content/uploads/2017/01/museo-egizio-torino_6.jpg"
      },
      {
        id: 'clue3-2',
        question: "Sul papiro del Libro dei Morti, trova il simbolo che rappresenta la vita. Come si chiama?",
        hint: "Cerca un simbolo simile a una croce con un anello in cima.",
        exhibitId: 'ex3',
        answer: "ankh",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue3-3',
        question: "Trova la regina con la corona alta. Quale simbolo animale appare più frequentemente nel suo cartiglio?",
        hint: "Cerca un bellissimo busto di una regina nella Galleria Reale.",
        exhibitId: 'ex6',
        answer: "uccello",
        imageUrl: "https://www.apollo-magazine.com/wp-content/uploads/2024/11/LEAD-26-The-Gallery-of-the-Kings-by-Marco-Cappelletti.jpg?resize=900%2C600"
      }
    ],
    estimatedTime: 40,
    ageRecommendation: "6+"
  }
];

export default treasureHunts;