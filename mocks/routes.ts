// Updated to use default export
const routes = [
  {
    id: 'route1',
    name: "L'oltretomba egizio",
    description: "Esplora le credenze e i rituali degli antichi Egizi riguardo alla vita dopo la morte, dalle mummie ai sarcofagi e ai papiri del Libro dei Morti.",
    duration: 45,
    stops: [
      { id: 'stop1', name: "Sala delle Mummie", exhibitIds: ['ex5'] },
      { id: 'stop2', name: "Libro dei Morti", exhibitIds: ['ex3'] },
      { id: 'stop3', name: "Corredi Funerari", exhibitIds: ['ex7'] },
      { id: 'stop4', name: "Amuleti Protettivi", exhibitIds: ['ex12'] }
    ],
    imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg",
    difficulty: "medium",
    recommended: true,
    exhibits: ['ex5', 'ex3', 'ex7', 'ex12'] // Added exhibits array for compatibility
  },
  {
    id: 'route2',
    name: "La danza dei Re",
    description: "Un viaggio attraverso la storia dei faraoni egizi, dalle prime dinastie fino al periodo tolemaico, con focus sulle statue e i manufatti reali.",
    duration: 60,
    stops: [
      { id: 'stop1', name: "Statue Reali", exhibitIds: ['ex1'] },
      { id: 'stop2', name: "Gioielli Reali", exhibitIds: ['ex2'] },
      { id: 'stop3', name: "Trono del Faraone", exhibitIds: ['ex10'] },
      { id: 'stop4', name: "Ritratti Reali", exhibitIds: ['ex6'] }
    ],
    imageUrl: "https://www.museiditorino.it/wp-content/uploads/2023/12/statua-museo-egizio-torino.jpg",
    difficulty: "easy",
    recommended: true,
    exhibits: ['ex1', 'ex2', 'ex10', 'ex6'] // Added exhibits array for compatibility
  },
  {
    id: 'route3',
    name: "Arte ed architettura",
    description: "Scopri l'evoluzione dell'arte e dell'architettura egizia attraverso i secoli, dai rilievi templari alle pitture tombali e agli elementi architettonici.",
    duration: 50,
    stops: [
      { id: 'stop1', name: "Rilievi Templari", exhibitIds: ['ex14'] },
      { id: 'stop2', name: "Pitture Tombali", exhibitIds: ['ex15'] },
      { id: 'stop3', name: "Elementi Architettonici", exhibitIds: ['ex8'] },
      { id: 'stop4', name: "Evoluzione Artistica", exhibitIds: ['ex13'] }
    ],
    imageUrl: "https://www.apollo-magazine.com/wp-content/uploads/2024/11/LEAD-26-The-Gallery-of-the-Kings-by-Marco-Cappelletti.jpg?resize=900%2C600",
    difficulty: "medium",
    recommended: false,
    exhibits: ['ex14', 'ex15', 'ex8', 'ex13'] // Added exhibits array for compatibility
  }
];

export default routes;