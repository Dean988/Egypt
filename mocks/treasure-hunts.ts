import { TreasureHunt } from '@/types';

const treasureHunts: TreasureHunt[] = [
  {
    id: 'hunt1',
    name: "Pharaoh's Secret",
    description: "Uncover the hidden message left by an ancient pharaoh by solving riddles related to royal artifacts throughout the museum.",
    imageUrl: "https://mammarum.com/wp-content/uploads/2020/08/museo-egizio-torino-con-i-bambini19-1024x768.jpg",
    difficulty: "Medium",
    duration: 45,
    locations: 3,
    ageRange: "8+",
    points: 100,
    clues: [
      {
        id: 'clue1-1',
        question: "I stand tall with crown and beard, my name means 'Ra has fashioned him'. Find me and count the symbols on my belt.",
        hint: "Look for the largest statue in the Main Hall.",
        exhibitId: 'ex1',
        answer: "5",
        imageUrl: "https://www.museiditorino.it/wp-content/uploads/2023/12/statua-museo-egizio-torino.jpg"
      },
      {
        id: 'clue1-2',
        question: "My face is gold, my eyes are watching. What animal is depicted on my forehead?",
        hint: "This famous mask belonged to a boy king.",
        exhibitId: 'ex2',
        answer: "cobra",
        imageUrl: "https://www.torinotoday.it/~media/horizontal-hi/12733984865485/museo-egizio_2.jpg"
      },
      {
        id: 'clue1-3',
        question: "I have the body of a lion but whose face do I wear?",
        hint: "Look for a mythical creature in the Sculpture Garden.",
        exhibitId: 'ex8',
        answer: "pharaoh",
        imageUrl: "https://www.museiditorino.it/wp-content/uploads/2023/12/statua-museo-egizio-torino.jpg"
      }
    ],
    estimatedTime: 45,
    ageRecommendation: "8+"
  },
  {
    id: 'hunt2',
    name: "Journey to the Afterlife",
    description: "Help a fictional ancient Egyptian navigate the challenges of the afterlife by finding objects and spells they would need.",
    imageUrl: "https://image.jimcdn.com/app/cms/image/transf/none/path/sf63059cf0e80ccf2/image/i277695e35fd5be56/version/1614080422/image.jpg",
    difficulty: "Hard",
    duration: 60,
    locations: 4,
    ageRange: "10+",
    points: 150,
    clues: [
      {
        id: 'clue2-1',
        question: "To preserve my organs for the afterlife, I need four special containers. What are they called?",
        hint: "Look in the Funerary Practices Hall for jars with animal heads.",
        exhibitId: 'ex7',
        answer: "canopic jars",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue2-2',
        question: "I need a guide for my journey. Find the papyrus with spells and write down the name of the scale-wielding god who judges souls.",
        hint: "Look for a long papyrus scroll in the Papyrus Gallery.",
        exhibitId: 'ex3',
        answer: "anubis",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue2-3',
        question: "To complete my journey, I must find a well-preserved traveler who has already made the journey. What was his profession?",
        hint: "Look for a mummy in Room B1.",
        exhibitId: 'ex5',
        answer: "architect",
        imageUrl: "https://image.jimcdn.com/app/cms/image/transf/none/path/sf63059cf0e80ccf2/image/i277695e35fd5be56/version/1614080422/image.jpg"
      }
    ],
    estimatedTime: 60,
    ageRecommendation: "10+"
  },
  {
    id: 'hunt3',
    name: "Hieroglyph Detective",
    description: "Decode ancient messages by finding and translating hieroglyphs throughout the museum.",
    imageUrl: "https://www.guidatorino.com/wp-content/uploads/2017/01/museo-egizio-torino_6.jpg",
    difficulty: "Easy",
    duration: 40,
    locations: 3,
    ageRange: "6+",
    points: 80,
    clues: [
      {
        id: 'clue3-1',
        question: "Find the stone that helped scholars decode hieroglyphs. How many languages appear on it?",
        hint: "Look for a dark stone tablet in the Language Hall.",
        exhibitId: 'ex4',
        answer: "3",
        imageUrl: "https://www.guidatorino.com/wp-content/uploads/2017/01/museo-egizio-torino_6.jpg"
      },
      {
        id: 'clue3-2',
        question: "On the Book of the Dead papyrus, find the symbol that represents life. What is it called?",
        hint: "Look for a cross-like symbol with a loop at the top.",
        exhibitId: 'ex3',
        answer: "ankh",
        imageUrl: "https://www.crisalideviaggi.com/uploads/image/museo-egizio(1).jpg"
      },
      {
        id: 'clue3-3',
        question: "Find the queen with the tall crown. What animal symbol appears most frequently in her cartouche?",
        hint: "Look for a beautiful bust of a queen in the Royal Gallery.",
        exhibitId: 'ex6',
        answer: "bird",
        imageUrl: "https://www.apollo-magazine.com/wp-content/uploads/2024/11/LEAD-26-The-Gallery-of-the-Kings-by-Marco-Cappelletti.jpg?resize=900%2C600"
      }
    ],
    estimatedTime: 40,
    ageRecommendation: "6+"
  }
];

export default treasureHunts;