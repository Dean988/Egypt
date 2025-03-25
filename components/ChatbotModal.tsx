import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Modal, Animated, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Send, Bot, MapPin, Ticket, Award, Calendar, Info, Clock, Coffee, ShoppingBag, Compass, Sparkles, Search, Book, Camera, Star, Users, HelpCircle, Lightbulb, Palette, Bookmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import EgyptianPattern from './EgyptianPattern';

interface ChatbotModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: Action[];
}

interface Action {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

// Knowledge base for Egyptian facts
const egyptianFacts = [
  "La Grande Piramide di Giza è l'unica delle Sette Meraviglie del Mondo Antico ancora esistente.",
  "Gli antichi Egizi inventarono il calendario di 365 giorni, diviso in 12 mesi.",
  "La Sfinge di Giza è la più grande statua monolitica del mondo, lunga 73 metri e alta 20 metri.",
  "Gli antichi Egizi furono tra i primi a produrre e indossare gioielli, circa 5.000 anni fa.",
  "Il faraone Tutankhamon salì al trono quando aveva solo 9 anni.",
  "Gli antichi Egizi credevano che il cuore, non il cervello, fosse la sede dell'intelligenza e delle emozioni.",
  "La mummificazione poteva durare fino a 70 giorni e coinvolgeva l'uso di natron, un tipo di sale, per disidratare il corpo.",
  "Il Museo Egizio di Torino ospita la più importante collezione di antichità egizie al mondo dopo quella del Cairo.",
  "Il papiro di Torino, conservato nel Museo Egizio, è una delle più importanti fonti per la cronologia dell'Antico Egitto.",
  "La tomba di Kha e Merit, visibile al Museo Egizio, è una delle tombe più complete mai ritrovate, con oltre 500 oggetti.",
  "Il Tempio di Ellesija, all'interno del Museo Egizio, fu donato all'Italia dall'Egitto come ringraziamento per l'aiuto nella salvaguardia dei monumenti nubiani.",
  "Gli antichi Egizi furono tra i primi a utilizzare la scrittura, con i geroglifici che risalgono al 3200 a.C. circa.",
  "Il Libro dei Morti era una collezione di incantesimi che si credeva aiutassero i defunti nel loro viaggio nell'aldilà.",
  "Gli antichi Egizi addomesticavano i gatti non solo come animali da compagnia, ma anche per controllare i roditori.",
  "La birra era la bevanda nazionale dell'antico Egitto, consumata da tutti, dai faraoni ai contadini.",
  "Gli Egizi usavano il papiro per creare una forma primitiva di carta già dal 3000 a.C.",
  "Il trucco degli occhi non era solo estetico, ma aveva anche funzioni medicinali e protettive contro il sole.",
  "Gli antichi Egizi praticavano la medicina e la chirurgia con tecniche sorprendentemente avanzate per l'epoca.",
  "La prima testimonianza scritta di un medico risale all'Antico Egitto, con Imhotep (2650-2600 a.C.).",
  "Gli Egizi furono i primi a creare inchiostri colorati, usando minerali e piante per ottenere diversi pigmenti.",
  "Il gioco da tavolo Senet era molto popolare nell'antico Egitto e si credeva aiutasse il defunto nel viaggio verso l'aldilà.",
  "Gli antichi Egizi avevano un sistema di scrittura corsiva chiamato ieratico, usato principalmente per documenti amministrativi.",
  "Le piramidi non furono costruite da schiavi, ma da lavoratori salariati e contadini durante la stagione delle inondazioni del Nilo.",
  "Gli Egizi furono tra i primi a produrre vetro colorato, già dal 1500 a.C.",
  "Il faraone Hatshepsut, una delle poche donne a governare l'Egitto, si faceva spesso rappresentare con attributi maschili.",
  "Gli Egizi furono pionieri nell'astronomia, creando mappe stellari e utilizzando le stelle per la navigazione e il calendario.",
  "Il primo trattato di pace documentato della storia fu firmato tra Egizi e Ittiti nel 1259 a.C., dopo la battaglia di Qadesh.",
  "Gli antichi Egizi avevano un sistema di canali e dighe per controllare le inondazioni del Nilo e irrigare i campi.",
  "La pietra di Rosetta, che permise la decifrazione dei geroglifici, contiene lo stesso testo in tre scritture: geroglifica, demotica e greca.",
  "Gli Egizi furono tra i primi a utilizzare profumi e oli essenziali, sia per l'igiene personale che per cerimonie religiose."
];

// Museum information
const museumInfo = {
  history: "Il Museo Egizio di Torino è stato fondato nel 1824 e ospita una delle collezioni di antichità egizie più importanti al mondo. La collezione iniziò con l'acquisto di 5.268 reperti da parte del re Carlo Felice di Savoia.",
  collection: "La collezione comprende oltre 40.000 reperti, di cui circa 6.500 esposti. Tra i pezzi più importanti ci sono il Tempio di Ellesija, la tomba di Kha e Merit, e numerosi papiri, mummie e sarcofagi.",
  renovation: "Il museo ha subito una completa ristrutturazione tra il 2012 e il 2015, che ha modernizzato gli spazi espositivi e migliorato l'esperienza dei visitatori.",
  director: "Il museo è attualmente diretto da Christian Greco, egittologo di fama internazionale.",
  location: "Il museo si trova nel centro storico di Torino, in Via Accademia delle Scienze, 6.",
  architecture: "L'edificio che ospita il museo è il seicentesco Palazzo dell'Accademia delle Scienze, progettato dall'architetto Guarino Guarini."
};

// Expanded knowledge base for general topics
const generalKnowledge = {
  // Art and culture
  art: [
    "L'arte egizia è caratterizzata da uno stile distintivo che è rimasto relativamente invariato per oltre 3000 anni.",
    "Le rappresentazioni artistiche egizie seguivano rigide convenzioni: figure umane con testa e arti di profilo ma occhi e spalle frontali.",
    "I colori nell'arte egizia avevano significati simbolici: il blu e il verde rappresentavano la rinascita, il rosso la vita e la vittoria, il giallo l'eternità.",
    "Le proporzioni nelle figure umane erano basate su una griglia di quadrati per mantenere la coerenza stilistica.",
    "L'arte egizia era principalmente funzionale, creata per servire uno scopo religioso o funerario piuttosto che per il puro piacere estetico."
  ],
  
  // Religion and mythology
  religion: [
    "La religione egizia era politeista, con un pantheon di oltre 2000 divinità.",
    "Gli dei potevano assumere forme umane, animali o ibride.",
    "Ra, il dio del sole, era considerato una delle divinità più importanti e viaggiava ogni giorno attraverso il cielo su una barca solare.",
    "Osiride era il dio dell'oltretomba e della resurrezione, ucciso dal fratello Seth e riportato in vita dalla moglie Iside.",
    "Anubi, il dio con testa di sciacallo, era associato all'imbalsamazione e guidava le anime nell'aldilà.",
    "Il faraone era considerato un dio vivente, figlio di Ra e intermediario tra gli dei e gli uomini.",
    "Il concetto di Ma'at rappresentava l'ordine cosmico, la verità e la giustizia, fondamentale nella religione egizia."
  ],
  
  // Daily life
  dailyLife: [
    "La dieta degli antichi Egizi era basata principalmente su pane, birra, cipolle e legumi, con carne riservata principalmente alle classi più agiate.",
    "Le case erano costruite con mattoni di fango essiccato al sole, con tetti piatti spesso usati come spazi abitativi aggiuntivi.",
    "L'igiene personale era molto importante, con bagni regolari nel Nilo e l'uso di oli profumati.",
    "I bambini egizi giocavano con bambole, palle e altri giocattoli simili a quelli moderni.",
    "La maggior parte degli Egizi indossava abiti di lino, leggeri e adatti al clima caldo, con gioielli per indicare lo status sociale."
  ],
  
  // Science and technology
  science: [
    "Gli Egizi svilupparono un sistema matematico avanzato che permise loro di costruire monumenti con straordinaria precisione.",
    "Conoscevano il teorema di Pitagora molto prima che fosse formalizzato dai Greci.",
    "Svilupparono un sistema di misurazione basato sulle parti del corpo umano, come il cubito (lunghezza dell'avambraccio).",
    "Erano esperti in astronomia e potevano prevedere le inondazioni del Nilo osservando la stella Sirio.",
    "Praticavano la medicina con tecniche chirurgiche sorprendentemente avanzate e conoscevano l'uso di molte piante medicinali."
  ],
  
  // Mummification
  mummification: [
    "La mummificazione era un processo complesso che durava circa 70 giorni.",
    "Il cervello veniva rimosso attraverso le narici usando un uncino di metallo.",
    "Gli organi interni, tranne il cuore, venivano rimossi e conservati in vasi canopi.",
    "Il corpo veniva disidratato con natron, un tipo di sale naturale.",
    "Dopo la disidratazione, il corpo veniva avvolto in bende di lino con amuleti protettivi inseriti tra gli strati.",
    "Il processo di mummificazione era accompagnato da rituali religiosi e incantesimi per proteggere il defunto nell'aldilà.",
    "Anche gli animali sacri, come gatti, ibis e coccodrilli, venivano mummificati."
  ],
  
  // Architecture
  architecture: [
    "Le piramidi di Giza furono costruite durante la IV dinastia (circa 2580-2560 a.C.).",
    "La Grande Piramide di Cheope contiene circa 2,3 milioni di blocchi di pietra, ciascuno del peso medio di 2,5 tonnellate.",
    "I templi egizi seguivano generalmente uno schema standard: un viale di sfingi, piloni d'ingresso, un cortile aperto, una sala ipostila e un santuario.",
    "Gli obelischi erano monumenti monolitici di granito, simboli del dio sole Ra.",
    "Le colonne nei templi egizi spesso imitavano forme vegetali come il papiro, il loto o la palma.",
    "Le tombe rupestri della Valle dei Re erano decorate con scene del viaggio del faraone nell'aldilà."
  ],
  
  // Writing and language
  writing: [
    "I geroglifici erano la scrittura formale usata principalmente per iscrizioni monumentali e testi religiosi.",
    "Lo ieratico era una forma corsiva dei geroglifici, usata per documenti amministrativi e letterari.",
    "Il demotico era una scrittura ancora più semplificata, sviluppata in epoca tarda.",
    "La lingua egizia appartiene alla famiglia afro-asiatica e ha influenzato il copto, ancora usato nella liturgia della Chiesa Copta.",
    "La decifrazione dei geroglifici fu possibile grazie alla Stele di Rosetta, scoperta nel 1799 durante la campagna napoleonica in Egitto."
  ]
};

// App navigation information
const appNavigation = {
  home: {
    description: "La home page mostra le mostre in evidenza, gli eventi speciali e le novità del museo.",
    route: "/",
    icon: <Compass size={16} color={Colors.card} />
  },
  tickets: {
    description: "Acquista biglietti per il museo, prenota visite guidate o eventi speciali.",
    route: "/tickets",
    icon: <Ticket size={16} color={Colors.card} />
  },
  treasureHunt: {
    description: "Partecipa a emozionanti cacce al tesoro per esplorare il museo in modo divertente.",
    route: "/treasure-hunt",
    icon: <Award size={16} color={Colors.card} />
  },
  khufuGame: {
    description: "Metti alla prova le tue conoscenze sull'antico Egitto con la Sfida di Khufu.",
    route: "/khufu-game",
    icon: <Sparkles size={16} color={Colors.card} />
  },
  map: {
    description: "Consulta la mappa interattiva del museo per orientarti meglio.",
    route: "/map",
    icon: <MapPin size={16} color={Colors.card} />
  },
  shop: {
    description: "Acquista souvenir, libri e riproduzioni di reperti egizi.",
    route: "/shop",
    icon: <ShoppingBag size={16} color={Colors.card} />
  },
  cafe: {
    description: "Scopri il menu della caffetteria del museo.",
    route: "/cafe",
    icon: <Coffee size={16} color={Colors.card} />
  },
  customRoute: {
    description: "Crea un percorso personalizzato in base ai tuoi interessi e al tempo a disposizione.",
    route: "/custom-route",
    icon: <Sparkles size={16} color={Colors.card} />
  }
};

// Conversation context types
type ConversationContext = {
  topic?: string;
  lastQuestion?: string;
  followUpCount: number;
  mentionedTopics: string[];
  suggestedRoutes: string[];
  userInterests?: string[];
  visitDuration?: string;
  userName?: string;
  isFirstInteraction: boolean;
};

export default function ChatbotModal({ isVisible, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    followUpCount: 0,
    mentionedTopics: [],
    suggestedRoutes: [],
    isFirstInteraction: true
  });
  
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  
  // Initial greeting message
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const initialMessages = [
        {
          id: '1',
          text: "Ciao! Sono Khufu, la tua guida virtuale del Museo Egizio. Come posso aiutarti oggi?",
          sender: 'bot',
          timestamp: new Date(),
          actions: [
            { 
              label: "Esplora il museo", 
              route: "/", 
              icon: <Compass size={16} color={Colors.card} />
            },
            { 
              label: "Acquista biglietti", 
              route: "/tickets", 
              icon: <Ticket size={16} color={Colors.card} />
            },
            { 
              label: "Caccia al tesoro", 
              route: "/treasure-hunt", 
              icon: <Award size={16} color={Colors.card} />
            }
          ]
        }
      ];
      setMessages(initialMessages);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    // Update conversation context
    const updatedContext = analyzeUserInput(inputText, conversationContext);
    setConversationContext(updatedContext);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText, updatedContext);
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
      // Update context after response
      setConversationContext(prevContext => ({
        ...prevContext,
        followUpCount: prevContext.followUpCount + 1,
        isFirstInteraction: false
      }));
    }, 1000);
  };

  const navigateTo = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  // Analyze user input to update conversation context
  const analyzeUserInput = (input: string, currentContext: ConversationContext): ConversationContext => {
    const lowerInput = input.toLowerCase();
    const updatedContext = { ...currentContext };
    
    // Detect topic
    if (lowerInput.includes("bigliett") || lowerInput.includes("prezzo") || lowerInput.includes("costo")) {
      updatedContext.topic = "tickets";
      if (!updatedContext.mentionedTopics.includes("tickets")) {
        updatedContext.mentionedTopics.push("tickets");
      }
    } else if (lowerInput.includes("orari") || lowerInput.includes("apertura") || lowerInput.includes("chiusura")) {
      updatedContext.topic = "hours";
      if (!updatedContext.mentionedTopics.includes("hours")) {
        updatedContext.mentionedTopics.push("hours");
      }
    } else if (lowerInput.includes("mostra") || lowerInput.includes("esposizion") || lowerInput.includes("collezione")) {
      updatedContext.topic = "exhibits";
      if (!updatedContext.mentionedTopics.includes("exhibits")) {
        updatedContext.mentionedTopics.push("exhibits");
      }
    } else if (lowerInput.includes("mummia") || lowerInput.includes("sarcofago") || lowerInput.includes("mummificazione")) {
      updatedContext.topic = "mummies";
      if (!updatedContext.mentionedTopics.includes("mummies")) {
        updatedContext.mentionedTopics.push("mummies");
      }
    } else if (lowerInput.includes("dio") || lowerInput.includes("dea") || lowerInput.includes("religione") || lowerInput.includes("mito")) {
      updatedContext.topic = "religion";
      if (!updatedContext.mentionedTopics.includes("religion")) {
        updatedContext.mentionedTopics.push("religion");
      }
    } else if (lowerInput.includes("arte") || lowerInput.includes("pittura") || lowerInput.includes("scultura")) {
      updatedContext.topic = "art";
      if (!updatedContext.mentionedTopics.includes("art")) {
        updatedContext.mentionedTopics.push("art");
      }
    } else if (lowerInput.includes("caccia al tesoro") || lowerInput.includes("gioco") || lowerInput.includes("sfida")) {
      updatedContext.topic = "games";
      if (!updatedContext.mentionedTopics.includes("games")) {
        updatedContext.mentionedTopics.push("games");
      }
    } else if (lowerInput.includes("mappa") || lowerInput.includes("orientarmi") || lowerInput.includes("perso")) {
      updatedContext.topic = "map";
      if (!updatedContext.mentionedTopics.includes("map")) {
        updatedContext.mentionedTopics.push("map");
      }
    }
    
    // Detect user name
    const nameMatch = input.match(/mi chiamo ([A-Za-z]+)/i) || input.match(/sono ([A-Za-z]+)/i);
    if (nameMatch && nameMatch[1]) {
      updatedContext.userName = nameMatch[1];
    }
    
    // Detect visit duration
    if (lowerInput.includes("ore") || lowerInput.includes("giornata") || lowerInput.includes("tempo")) {
      if (lowerInput.includes("un'ora") || lowerInput.includes("1 ora") || lowerInput.includes("poco tempo")) {
        updatedContext.visitDuration = "short";
      } else if (lowerInput.includes("mezza giornata") || lowerInput.includes("3 ore") || lowerInput.includes("alcune ore")) {
        updatedContext.visitDuration = "medium";
      } else if (lowerInput.includes("giornata intera") || lowerInput.includes("tutto il giorno")) {
        updatedContext.visitDuration = "long";
      }
    }
    
    // Detect interests
    const interests = [];
    if (lowerInput.includes("arte") || lowerInput.includes("pittura") || lowerInput.includes("scultura")) {
      interests.push("arte");
    }
    if (lowerInput.includes("mummie") || lowerInput.includes("mummificazione")) {
      interests.push("mummie");
    }
    if (lowerInput.includes("religione") || lowerInput.includes("dei") || lowerInput.includes("miti")) {
      interests.push("religione");
    }
    if (lowerInput.includes("vita quotidiana") || lowerInput.includes("società")) {
      interests.push("vita quotidiana");
    }
    if (lowerInput.includes("architettura") || lowerInput.includes("piramidi") || lowerInput.includes("templi")) {
      interests.push("architettura");
    }
    if (lowerInput.includes("scrittura") || lowerInput.includes("geroglifici") || lowerInput.includes("papiri")) {
      interests.push("scrittura");
    }
    
    if (interests.length > 0) {
      updatedContext.userInterests = interests;
    }
    
    // Store last question for context
    updatedContext.lastQuestion = input;
    
    return updatedContext;
  };

  // Get a random fact from the knowledge base
  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * egyptianFacts.length);
    return egyptianFacts[randomIndex];
  };

  // Get a random fact from a specific topic
  const getTopicFact = (topic: string) => {
    if (topic in generalKnowledge) {
      const facts = generalKnowledge[topic as keyof typeof generalKnowledge];
      const randomIndex = Math.floor(Math.random() * facts.length);
      return facts[randomIndex];
    }
    return getRandomFact();
  };

  // Check if input contains any of the words
  const containsAny = (input: string, words: string[]) => {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
  };

  // Generate a response based on user input and conversation context
  const generateBotResponse = (userInput: string, context: ConversationContext): Message => {
    const input = userInput.toLowerCase();
    let responseText = "";
    let actions: Action[] = [];
    
    // Personalized greeting if we know the user's name
    const personalizedGreeting = context.userName ? `Ciao ${context.userName}! ` : "";
    
    // Greetings
    if (containsAny(input, ['ciao', 'salve', 'buongiorno', 'buonasera', 'hey', 'ehi'])) {
      const greetings = [
        `${personalizedGreeting}Sono Khufu, la tua guida virtuale del Museo Egizio. Come posso aiutarti oggi?`,
        `${personalizedGreeting}Sono qui per aiutarti a scoprire i tesori del Museo Egizio. Cosa ti interessa vedere?`,
        `${personalizedGreeting}Sono Khufu, pronto ad accompagnarti in un viaggio nell'antico Egitto. Di cosa hai bisogno?`
      ];
      responseText = greetings[Math.floor(Math.random() * greetings.length)];
      
      // Suggest actions based on context
      if (context.mentionedTopics.includes("tickets")) {
        actions.push({ 
          label: "Acquista biglietti", 
          route: "/tickets", 
          icon: <Ticket size={16} color={Colors.card} />
        });
      } else {
        actions.push({ 
          label: "Esplora il museo", 
          route: "/", 
          icon: <Compass size={16} color={Colors.card} />
        });
      }
      
      if (context.mentionedTopics.includes("games")) {
        actions.push({ 
          label: "Caccia al tesoro", 
          route: "/treasure-hunt", 
          icon: <Award size={16} color={Colors.card} />
        });
      } else if (context.mentionedTopics.includes("map")) {
        actions.push({ 
          label: "Mappa del museo", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else {
        actions.push({ 
          label: "Acquista biglietti", 
          route: "/tickets", 
          icon: <Ticket size={16} color={Colors.card} />
        });
      }
    }
    
    // Biglietti e orari
    else if (containsAny(input, ['bigliett', 'costo', 'prezzo', 'quanto costa', 'acquistare', 'comprare', 'pagare'])) {
      responseText = "I biglietti per il Museo Egizio costano €15 per gli adulti, €11 ridotto per studenti e over 65, €7 per i bambini dai 6 ai 14 anni. I bambini sotto i 6 anni entrano gratis. Puoi acquistarli direttamente dalla sezione biglietti dell'app.";
      actions = [
        { 
          label: "Acquista biglietti", 
          route: "/tickets", 
          icon: <Ticket size={16} color={Colors.card} />
        },
        { 
          label: "Orari di apertura", 
          route: "/", 
          icon: <Clock size={16} color={Colors.card} />
        }
      ];
      
      // Add a personalized suggestion based on context
      if (context.visitDuration === "short") {
        responseText += " Dato che hai poco tempo a disposizione, ti consiglio di concentrarti sui capolavori principali seguendo il percorso breve.";
        actions.push({ 
          label: "Percorso breve", 
          route: "/custom-route", 
          icon: <Sparkles size={16} color={Colors.card} />
        });
      } else if (context.visitDuration === "long") {
        responseText += " Visto che hai un'intera giornata a disposizione, potresti considerare anche una visita guidata per approfondire meglio la collezione.";
        actions.push({ 
          label: "Visite guidate", 
          route: "/tickets", 
          icon: <Users size={16} color={Colors.card} />
        });
      }
    }
    
    else if (containsAny(input, ['orari', 'aperto', 'chiuso', 'quando', 'apertura', 'chiusura', 'visita'])) {
      responseText = "Il Museo Egizio è aperto tutti i giorni dalle 9:00 alle 18:30. L'ultimo ingresso è consentito un'ora prima della chiusura. Ti consiglio di pianificare almeno 2-3 ore per una visita completa.";
      actions = [
        { 
          label: "Acquista biglietti", 
          route: "/tickets", 
          icon: <Ticket size={16} color={Colors.card} />
        },
        { 
          label: "Informazioni", 
          route: "/", 
          icon: <Info size={16} color={Colors.card} />
        }
      ];
      
      // Add a personalized suggestion based on context
      if (context.userInterests && context.userInterests.length > 0) {
        const interest = context.userInterests[0];
        responseText += ` Vedo che sei interessato a ${interest}. Ti suggerisco di dedicare più tempo alle sale relative a questo tema.`;
        actions.push({ 
          label: `Sale su ${interest}`, 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Percorsi e visite
    else if (containsAny(input, ['percors', 'itinerari', 'visita guidata', 'guida', 'tour', 'giro'])) {
      responseText = "Il museo offre diversi percorsi tematici e visite guidate. Puoi scegliere tra percorsi predefiniti o creare un percorso personalizzato con il mio aiuto. Nella sezione 'Percorsi' troverai tutte le opzioni disponibili, con descrizioni dettagliate e durata stimata.";
      actions = [
        { 
          label: "Esplora percorsi", 
          route: "/routes", 
          icon: <MapPin size={16} color={Colors.card} />
        },
        { 
          label: "Percorso personalizzato", 
          route: "/custom-route", 
          icon: <Sparkles size={16} color={Colors.card} />
        }
      ];
      
      // Add a personalized suggestion based on context
      if (context.visitDuration === "short") {
        responseText += " Per una visita breve, ti consiglio il percorso 'Highlights' che ti mostrerà i capolavori principali in circa un'ora.";
        actions.push({ 
          label: "Percorso Highlights", 
          route: "/routes", 
          icon: <Star size={16} color={Colors.card} />
        });
      } else if (context.userInterests && context.userInterests.includes("religione")) {
        responseText += " Vedo che sei interessato alla religione egizia. Ti consiglio il percorso tematico 'Dei e culti dell'antico Egitto'.";
        actions.push({ 
          label: "Percorso Dei e culti", 
          route: "/routes", 
          icon: <Star size={16} color={Colors.card} />
        });
      }
    }
    
    // Caccia al tesoro
    else if (containsAny(input, ['caccia al tesoro', 'gioco', 'bambini', 'famiglia', 'attività', 'ragazzi', 'divertimento'])) {
      responseText = "Il museo offre emozionanti cacce al tesoro per famiglie e bambini! È un modo divertente ed educativo per esplorare il museo. Abbiamo anche la Sfida di Khufu con 10 prove emozionanti sull'Antico Egitto. Nella sezione dedicata puoi scegliere il livello di difficoltà e iniziare subito l'avventura!";
      actions = [
        { 
          label: "Caccia al tesoro", 
          route: "/treasure-hunt", 
          icon: <Award size={16} color={Colors.card} />
        },
        { 
          label: "Sfida di Khufu", 
          route: "/khufu-game", 
          icon: <Sparkles size={16} color={Colors.card} />
        }
      ];
      
      // Add a personalized suggestion
      if (input.includes("bambini") || input.includes("famiglia") || input.includes("ragazzi")) {
        responseText += " Per i più piccoli, abbiamo una caccia al tesoro speciale con indizi semplici e divertenti. Per iniziare, vai alla sezione 'Caccia al tesoro' e seleziona il livello 'Piccoli esploratori'.";
        actions.push({ 
          label: "Piccoli esploratori", 
          route: "/treasure-hunt", 
          icon: <Award size={16} color={Colors.card} />
        });
      }
    }
    
    // Mappa e orientamento
    else if (containsAny(input, ['mappa', 'dove', 'piano', 'orientarmi', 'perso', 'trovare', 'posizione'])) {
      responseText = "Puoi consultare la mappa interattiva del museo per orientarti meglio. Ti mostrerà la tua posizione attuale e i punti di interesse più vicini. Puoi anche cercare specifici reperti o sale e ottenere indicazioni precise su come raggiungerli.";
      actions = [
        { 
          label: "Apri mappa", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        },
        { 
          label: "Cerca reperti", 
          route: "/", 
          icon: <Search size={16} color={Colors.card} />
        }
      ];
      
      // Add specific guidance based on input
      if (input.includes("statua") || input.includes("sfinge")) {
        responseText += " Se stai cercando le statue principali, vai al secondo piano, sala 1. Troverai la mappa dettagliata nella sezione 'Mappa'.";
        actions.push({ 
          label: "Sala statue", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("mummia") || input.includes("sarcofago")) {
        responseText += " Le mummie e i sarcofagi si trovano al primo piano, sala 14. Puoi vedere la loro posizione esatta sulla mappa.";
        actions.push({ 
          label: "Sala mummie", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("papiro") || input.includes("scrittura")) {
        responseText += " I papiri più importanti sono esposti al terzo piano, sala 9. Consulta la mappa per trovare facilmente questa sala.";
        actions.push({ 
          label: "Sala papiri", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Esposizioni e mostre
    else if (containsAny(input, ['mostra', 'esposizion', 'collezione', 'esibizion', 'reperti', 'oggetti', 'manufatti', 'artefatti'])) {
      responseText = "Il Museo Egizio ospita la più importante collezione di antichità egizie al mondo dopo quella del Cairo. Tra i pezzi più importanti ci sono il Tempio di Ellesija, la tomba di Kha e Merit, e numerosi papiri, mummie e sarcofagi. Nella home page puoi vedere le mostre in evidenza e gli oggetti più famosi.";
      actions = [
        { 
          label: "Esposizioni", 
          route: "/", 
          icon: <Calendar size={16} color={Colors.card} />
        },
        { 
          label: "Reperti famosi", 
          route: "/", 
          icon: <Star size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on input
      if (input.includes("tempio") || input.includes("ellesija")) {
        responseText += " Il Tempio di Ellesija è uno dei pezzi più straordinari della collezione. Fu donato all'Italia dall'Egitto come ringraziamento per l'aiuto nella salvaguardia dei monumenti nubiani durante la costruzione della diga di Assuan. Si trova al piano terra del museo.";
        actions.push({ 
          label: "Tempio di Ellesija", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("kha") || input.includes("merit") || input.includes("tomba")) {
        responseText += " La tomba di Kha e Merit è una delle tombe più complete mai ritrovate, con oltre 500 oggetti. Kha era un architetto reale della XVIII dinastia e la sua tomba, scoperta intatta nel 1906, offre uno spaccato unico della vita quotidiana dell'antico Egitto.";
        actions.push({ 
          label: "Tomba di Kha e Merit", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Servizi (caffetteria, negozio)
    else if (containsAny(input, ['caffè', 'caffetteria', 'ristorante', 'mangiare', 'bere', 'cibo', 'pranzo', 'colazione'])) {
      responseText = "Il museo dispone di una caffetteria dove puoi rilassarti e gustare bevande e snack. Si trova al piano terra, vicino all'ingresso principale. Offre una selezione di caffè, tè, succhi, panini, insalate e dolci. Puoi consultare il menu completo nella sezione dedicata dell'app.";
      actions = [
        { 
          label: "Caffetteria", 
          route: "/cafe", 
          icon: <Coffee size={16} color={Colors.card} />
        },
        { 
          label: "Menu", 
          route: "/cafe", 
          icon: <Book size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on time of day
      const hour = new Date().getHours();
      if (hour < 12) {
        responseText += " Per colazione, ti consiglio di provare i nostri croissant appena sfornati e il caffè egiziano speziato, una specialità della casa!";
      } else if (hour >= 12 && hour < 15) {
        responseText += " Per pranzo, oggi lo chef consiglia l'insalata mediterranea con falafel e la zuppa di lenticchie, ispirata alle ricette dell'antico Egitto.";
      } else {
        responseText += " Nel pomeriggio, puoi gustare i nostri dolci tipici egiziani come il baklava e il basbousa, accompagnati da un tè alla menta.";
      }
    }
    
    else if (containsAny(input, ['negozio', 'souvenir', 'regalo', 'acquistare', 'shop', 'comprare', 'merchandise'])) {
      responseText = "Il negozio del museo offre una vasta gamma di souvenir, libri, gioielli e riproduzioni di reperti egizi. È un ottimo posto per trovare un ricordo della tua visita o un regalo speciale. Puoi sfogliare il catalogo online e anche acquistare direttamente dall'app con consegna a domicilio.";
      actions = [
        { 
          label: "Negozio", 
          route: "/shop", 
          icon: <ShoppingBag size={16} color={Colors.card} />
        },
        { 
          label: "Catalogo online", 
          route: "/shop", 
          icon: <Book size={16} color={Colors.card} />
        }
      ];
      
      // Add specific recommendations based on input
      if (input.includes("libro") || input.includes("pubblicazion")) {
        responseText += " La nostra libreria specializzata offre pubblicazioni accademiche, guide illustrate e libri per bambini sull'antico Egitto. Tra i bestseller c'è 'I segreti delle piramidi' e 'La vita quotidiana nell'antico Egitto'.";
        actions.push({ 
          label: "Libri e pubblicazioni", 
          route: "/shop", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (input.includes("gioiell") || input.includes("bijoux")) {
        responseText += " La nostra collezione di gioielli include riproduzioni di pezzi storici e creazioni contemporanee ispirate all'arte egizia. Molto popolari sono gli scarabei portafortuna e i bracciali con geroglifici personalizzati.";
        actions.push({ 
          label: "Gioielli", 
          route: "/shop", 
          icon: <ShoppingBag size={16} color={Colors.card} />
        });
      } else if (input.includes("bambini") || input.includes("giocattol")) {
        responseText += " Per i bambini abbiamo giochi educativi, puzzle, kit di scavo archeologico e peluche a tema egizio. Sono ottimi per continuare l'esperienza educativa anche a casa.";
        actions.push({ 
          label: "Giochi per bambini", 
          route: "/shop", 
          icon: <ShoppingBag size={16} color={Colors.card} />
        });
      }
    }
    
    // Informazioni sul museo
    else if (containsAny(input, ['storia', 'museo', 'fondazione', 'quando', 'creato', 'fondato', 'chi'])) {
      responseText = museumInfo.history;
      actions = [
        { 
          label: "Maggiori informazioni", 
          route: "/", 
          icon: <Info size={16} color={Colors.card} />
        }
      ];
      
      // Add follow-up information based on context
      if (context.followUpCount > 0) {
        responseText += " " + museumInfo.renovation;
        actions.push({ 
          label: "Architettura del museo", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      }
    }
    
    // Collezione
    else if (containsAny(input, ['collezione', 'quanti', 'reperti', 'oggetti', 'pezzi'])) {
      responseText = museumInfo.collection;
      actions = [
        { 
          label: "Esplora collezione", 
          route: "/", 
          icon: <Search size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on context
      if (context.userInterests && context.userInterests.length > 0) {
        const interest = context.userInterests[0];
        responseText += ` Vedo che sei interessato a ${interest}. La nostra collezione include numerosi reperti relativi a questo tema. Ti consiglio di visitare le sale dedicate per approfondire questo aspetto della civiltà egizia.`;
        actions.push({ 
          label: `Reperti su ${interest}`, 
          route: "/", 
          icon: <Search size={16} color={Colors.card} />
        });
      }
    }
    
    // Accessibilità
    else if (containsAny(input, ['disabile', 'accessibile', 'sedia a rotelle', 'mobilità', 'ascensore', 'handicap'])) {
      responseText = "Il Museo Egizio è completamente accessibile alle persone con disabilità motorie. Sono disponibili ascensori per raggiungere tutti i piani, servizi igienici accessibili e sedie a rotelle gratuite su richiesta. Per i visitatori con disabilità visive o uditive, sono disponibili percorsi tattili e guide in lingua dei segni.";
      actions = [
        { 
          label: "Servizi accessibilità", 
          route: "/", 
          icon: <HelpCircle size={16} color={Colors.card} />
        }
      ];
      
      // Add specific guidance based on input
      if (input.includes("sedia a rotelle") || input.includes("mobilità")) {
        responseText += " Per richiedere una sedia a rotelle, puoi rivolgerti al personale all'ingresso o prenotarla in anticipo tramite la sezione 'Servizi' dell'app. Tutti gli spazi espositivi sono accessibili tramite ascensori e rampe.";
        actions.push({ 
          label: "Prenota sedia a rotelle", 
          route: "/", 
          icon: <Calendar size={16} color={Colors.card} />
        });
      } else if (input.includes("visiv") || input.includes("ciec") || input.includes("non vedent")) {
        responseText += " Per i visitatori con disabilità visive, offriamo percorsi tattili con riproduzioni di reperti che possono essere toccati e audioguide descrittive. È consigliabile prenotare in anticipo questo servizio.";
        actions.push({ 
          label: "Percorsi tattili", 
          route: "/", 
          icon: <Calendar size={16} color={Colors.card} />
        });
      } else if (input.includes("uditiv") || input.includes("sord") || input.includes("non udent")) {
        responseText += " Per i visitatori con disabilità uditive, offriamo guide in lingua dei segni e dispositivi con sottotitoli per tutte le presentazioni audiovisive. Puoi prenotare questi servizi nella sezione dedicata dell'app.";
        actions.push({ 
          label: "Guide in LIS", 
          route: "/", 
          icon: <Calendar size={16} color={Colors.card} />
        });
      }
    }
    
    // Fotografie
    else if (containsAny(input, ['foto', 'fotografia', 'fotografare', 'scattare', 'selfie', 'immagini'])) {
      responseText = "È permesso scattare fotografie all'interno del museo per uso personale, senza flash. Per uso commerciale o professionale è necessaria un'autorizzazione speciale. Alcune mostre temporanee potrebbero avere restrizioni specifiche, segnalate all'ingresso delle sale.";
      actions = [
        { 
          label: "Regolamento completo", 
          route: "/", 
          icon: <Camera size={16} color={Colors.card} />
        }
      ];
      
      // Add specific tips based on input
      if (input.includes("selfie") || input.includes("instagram")) {
        responseText += " Per i tuoi selfie, ti consiglio di visitare la sala del Tempio di Ellesija o la galleria delle statue monumentali, che offrono sfondi spettacolari. Ricorda di taggare @MuseoEgizio nei tuoi post sui social!";
        actions.push({ 
          label: "Punti fotografici", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Visite di gruppo
    else if (containsAny(input, ['gruppo', 'scuola', 'classe', 'studenti', 'scolastica', 'comitiva'])) {
      responseText = "Il museo offre tariffe speciali e percorsi dedicati per gruppi e scolaresche. È necessaria la prenotazione anticipata. Per le scuole sono disponibili laboratori didattici e materiali educativi. Contatta il museo con almeno due settimane di anticipo per organizzare la tua visita di gruppo.";
      actions = [
        { 
          label: "Prenotazione gruppi", 
          route: "/tickets", 
          icon: <Users size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on input
      if (input.includes("scuola") || input.includes("classe") || input.includes("studenti")) {
        responseText += " Per le scolaresche offriamo percorsi didattici differenziati per età, dai 6 ai 18 anni. I nostri laboratori permettono agli studenti di sperimentare tecniche di scrittura geroglifica, mummificazione simulata e scavo archeologico.";
        actions.push({ 
          label: "Laboratori didattici", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (input.includes("adulti") || input.includes("comitiva")) {
        responseText += " Per gruppi di adulti offriamo visite guidate tematiche con esperti egittologi. È possibile anche organizzare aperitivi o eventi privati in alcune aree del museo, contattando l'ufficio eventi.";
        actions.push({ 
          label: "Eventi privati", 
          route: "/", 
          icon: <Calendar size={16} color={Colors.card} />
        });
      }
    }
    
    // Curiosità e fatti
    else if (containsAny(input, ['curiosità', 'fatto', 'interessante', 'sapevi', 'raccontami', 'dimmi', 'aneddoto'])) {
      responseText = "Ecco una curiosità sull'antico Egitto: " + getRandomFact();
      actions = [
        { 
          label: "Altra curiosità", 
          route: "/", 
          icon: <Lightbulb size={16} color={Colors.card} />
        },
        { 
          label: "Esplora il museo", 
          route: "/", 
          icon: <Compass size={16} color={Colors.card} />
        }
      ];
      
      // Add related information based on the fact
      if (responseText.includes("mummificazione") || responseText.includes("mummie")) {
        actions.push({ 
          label: "Sala delle mummie", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (responseText.includes("piramid")) {
        actions.push({ 
          label: "Architettura egizia", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (responseText.includes("papiro") || responseText.includes("scrittura")) {
        actions.push({ 
          label: "Sala dei papiri", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Personalizzazione percorso
    else if (containsAny(input, ['personalizza', 'custom', 'preferenze', 'interessi', 'suggerimenti', 'consiglia'])) {
      responseText = "Posso aiutarti a creare un percorso personalizzato in base ai tuoi interessi! Nella sezione 'Personalizza con Khufu', puoi indicare le tue preferenze (arte, religione, vita quotidiana, ecc.), il tempo a disposizione e riceverai un itinerario su misura per te.";
      actions = [
        { 
          label: "Personalizza percorso", 
          route: "/custom-route", 
          icon: <Sparkles size={16} color={Colors.card} />
        }
      ];
      
      // Add personalized suggestions based on context
      if (context.userInterests && context.userInterests.length > 0) {
        const interests = context.userInterests.join(", ");
        responseText += ` Vedo che sei interessato a ${interests}. Posso creare un percorso che si concentri su questi temi. Quanto tempo hai a disposizione per la visita?`;
        actions.push({ 
          label: "Percorso tematico", 
          route: "/custom-route", 
          icon: <Sparkles size={16} color={Colors.card} />
        });
      }
      
      if (context.visitDuration) {
        let durationText = "";
        let routeType = "";
        
        if (context.visitDuration === "short") {
          durationText = "un'ora";
          routeType = "express";
        } else if (context.visitDuration === "medium") {
          durationText = "2-3 ore";
          routeType = "standard";
        } else {
          durationText = "una giornata intera";
          routeType = "completo";
        }
        
        responseText += ` Per una visita di ${durationText}, ti consiglio il percorso ${routeType} che ti permetterà di vedere ${context.visitDuration === "short" ? "i capolavori principali" : context.visitDuration === "medium" ? "le opere più significative di ogni sezione" : "l'intera collezione in modo approfondito"}.`;
        
        actions.push({ 
          label: `Percorso ${routeType}`, 
          route: "/custom-route", 
          icon: <Clock size={16} color={Colors.card} />
        });
      }
    }
    
    // Arte e cultura
    else if (containsAny(input, ['arte', 'cultura', 'pittura', 'scultura', 'bellezza', 'estetica'])) {
      responseText = "L'arte egizia è caratterizzata da uno stile distintivo che è rimasto relativamente invariato per oltre 3000 anni. Le rappresentazioni seguivano rigide convenzioni: figure umane con testa e arti di profilo ma occhi e spalle frontali. Al museo puoi ammirare magnifici esempi di pittura, scultura e arti decorative.";
      actions = [
        { 
          label: "Capolavori artistici", 
          route: "/", 
          icon: <Palette size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on input
      if (input.includes("pittura") || input.includes("dipint")) {
        responseText += " Le pitture egizie utilizzavano colori vivaci ottenuti da minerali e piante. Il blu, ad esempio, era ricavato dal lapislazzuli, mentre il verde dal malachite. Nella sala 6 puoi ammirare splendidi esempi di pittura parietale dalle tombe tebane.";
        actions.push({ 
          label: "Sala delle pitture", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("scultura") || input.includes("statua")) {
        responseText += " La scultura egizia era principalmente in pietra, legno o metallo. Le statue seguivano rigide convenzioni posturali, con figure spesso sedute o in piedi con la gamba sinistra avanzata. Nella sala 2 puoi ammirare alcune delle statue più imponenti della collezione.";
        actions.push({ 
          label: "Sala delle statue", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("gioiell") || input.includes("ornament")) {
        responseText += " I gioielli egizi mostrano una straordinaria maestria orafa. Utilizzavano oro, argento, pietre preziose e pasta vitrea per creare collane, bracciali, anelli e diademi. Nella sala 15 puoi ammirare la collezione di gioielli, tra cui pezzi provenienti da tombe reali.";
        actions.push({ 
          label: "Sala dei gioielli", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Religione e miti
    else if (containsAny(input, ['religione', 'dio', 'dea', 'mito', 'faraone', 'culto', 'credenza', 'anubi', 'osiride', 'iside'])) {
      responseText = "La religione egizia era politeista, con un pantheon di oltre 2000 divinità. Gli dei potevano assumere forme umane, animali o ibride. I più importanti erano Ra (dio del sole), Osiride (dio dell'oltretomba), Iside (dea della maternità e della magia) e Anubi (dio dell'imbalsamazione). Al museo puoi vedere numerose rappresentazioni di queste divinità.";
      actions = [
        { 
          label: "Divinità egizie", 
          route: "/", 
          icon: <Star size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on input
      if (input.includes("osiride") || input.includes("iside") || input.includes("horus")) {
        responseText += " Il mito di Osiride è centrale nella religione egizia: Osiride, ucciso dal fratello Seth, fu riportato in vita dalla moglie Iside abbastanza a lungo da concepire il figlio Horus, che poi vendicò il padre. Questo mito rappresentava il ciclo di morte e rinascita, fondamentale per la cultura egizia.";
        actions.push({ 
          label: "Mito di Osiride", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (input.includes("anubi") || input.includes("oltretomba") || input.includes("aldilà")) {
        responseText += " Anubi, il dio con testa di sciacallo, era il guardiano dell'oltretomba e presiedeva al processo di mummificazione. Si credeva che guidasse le anime nel loro viaggio verso l'aldilà e assistesse alla pesatura del cuore del defunto contro la piuma della verità, per determinare se l'anima poteva accedere all'eternità.";
        actions.push({ 
          label: "Culto funerario", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (input.includes("ra") || input.includes("amon") || input.includes("sole")) {
        responseText += " Ra, il dio del sole, era considerato il creatore dell'universo e viaggiava ogni giorno attraverso il cielo su una barca solare. Di notte attraversava il mondo sotterraneo, affrontando il serpente Apopi, simbolo del caos. Amon-Ra, fusione di Amon (divinità di Tebe) e Ra, divenne la divinità suprema durante il Nuovo Regno.";
        actions.push({ 
          label: "Culto solare", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      }
    }
    
    // Mummie
    else if (containsAny(input, ['mummia', 'mummificazione', 'imbalsamazione', 'sarcofago', 'tomba', 'sepoltura'])) {
      responseText = "La mummificazione era un processo complesso che durava circa 70 giorni. Gli organi interni venivano rimossi e conservati in vasi canopi, mentre il corpo veniva disidratato con natron e avvolto in bende di lino. Il museo ospita diverse mummie umane e animali, oltre a sarcofagi riccamente decorati.";
      actions = [
        { 
          label: "Sala delle mummie", 
          route: "/", 
          icon: <Bookmark size={16} color={Colors.card} />
        }
      ];
      
      // Add specific information based on input
      if (input.includes("process") || input.includes("come")) {
        responseText += " Il processo di mummificazione iniziava con la rimozione del cervello attraverso le narici e degli organi interni attraverso un'incisione nel fianco. Il cuore, considerato sede dell'intelligenza e dell'anima, veniva lasciato nel corpo. Dopo la disidratazione con natron, il corpo veniva unto con oli e resine, avvolto in bende di lino e posto nel sarcofago.";
        actions.push({ 
          label: "Processo di mummificazione", 
          route: "/", 
          icon: <Book size={16} color={Colors.card} />
        });
      } else if (input.includes("animal") || input.includes("gatto") || input.includes("ibis")) {
        responseText += " Gli Egizi mummificavano anche animali sacri come gatti (sacri a Bastet), ibis (sacri a Thot), coccodrilli (sacri a Sobek) e falchi (sacri a Horus). Queste mummie venivano offerte come ex-voto nei templi dedicati alle rispettive divinità. Il museo ospita una notevole collezione di mummie animali nella sala 12.";
        actions.push({ 
          label: "Mummie animali", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      } else if (input.includes("sarcofag") || input.includes("cassa")) {
        responseText += " I sarcofagi egizi erano spesso realizzati in legno o pietra e decorati con scene religiose e formule magiche dal Libro dei Morti. I sarcofagi dei faraoni e dei nobili potevano essere multipli, con uno inserito nell'altro, e quelli più esterni erano spesso antropomorfi, riproducendo le fattezze del defunto. Nella sala 10 puoi ammirare alcuni dei più bei sarcofagi della collezione.";
        actions.push({ 
          label: "Sala dei sarcofagi", 
          route: "/map", 
          icon: <MapPin size={16} color={Colors.card} />
        });
      }
    }
    
    // Saluti e ringraziamenti
    else if (containsAny(input, ['grazie', 'thank', 'ringrazio', 'gentile'])) {
      const thanks = [
        `${personalizedGreeting}Prego! Sono qui per aiutarti. Hai altre domande sul Museo Egizio?`,
        `${personalizedGreeting}Di nulla! È un piacere guidarti alla scoperta dell'antico Egitto. C'è altro che vorresti sapere?`,
        `${personalizedGreeting}Felice di esserti stato utile! Se hai altre curiosità, non esitare a chiedere.`
      ];
      responseText = thanks[Math.floor(Math.random() * thanks.length)];
      
      // Suggest next steps based on context
      if (context.mentionedTopics.length > 0) {
        const lastTopic = context.mentionedTopics[context.mentionedTopics.length - 1];
        if (lastTopic === "tickets") {
          actions.push({ 
            label: "Acquista biglietti", 
            route: "/tickets", 
            icon: <Ticket size={16} color={Colors.card} />
          });
        } else if (lastTopic === "map") {
          actions.push({ 
            label: "Mappa del museo", 
            route: "/map", 
            icon: <MapPin size={16} color={Colors.card} />
          });
        } else if (lastTopic === "games") {
          actions.push({ 
            label: "Caccia al tesoro", 
            route: "/treasure-hunt", 
            icon: <Award size={16} color={Colors.card} />
          });
        }
      } else {
        actions.push({ 
          label: "Esplora il museo", 
          route: "/", 
          icon: <Compass size={16} color={Colors.card} />
        });
      }
      
      actions.push({ 
        label: "Curiosità egizie", 
        route: "/", 
        icon: <Lightbulb size={16} color={Colors.card} />
      });
    }
    
    // General conversation - try to be helpful with any input
    else {
      // First, check for specific topics in our knowledge base
      let foundTopic = false;
      
      // Check for Egyptian topics
      for (const topic in generalKnowledge) {
        const keywords = {
          art: ['arte', 'pittura', 'scultura', 'dipint', 'statua', 'artistic'],
          religion: ['religione', 'dio', 'dea', 'mito', 'culto', 'osiride', 'iside', 'anubi', 'ra', 'amon', 'seth', 'horus'],
          dailyLife: ['vita quotidiana', 'cibo', 'casa', 'famiglia', 'lavoro', 'abbigliamento', 'società'],
          science: ['scienza', 'matematica', 'astronomia', 'medicina', 'tecnologia', 'ingegneria'],
          mummification: ['mummia', 'mummificazione', 'imbalsamazione', 'sarcofago', 'tomba', 'sepoltura'],
          architecture: ['architettura', 'piramide', 'tempio', 'obelisco', 'costruzione', 'monumento'],
          writing: ['scrittura', 'geroglifico', 'papiro', 'ieratico', 'demotico', 'rosetta']
        };
        
        const topicKeywords = keywords[topic as keyof typeof keywords] || [];
        
        if (containsAny(input, topicKeywords)) {
          const facts = generalKnowledge[topic as keyof typeof generalKnowledge];
          responseText = facts[Math.floor(Math.random() * facts.length)];
          
          actions = [
            { 
              label: `Più su ${topic}`, 
              route: "/", 
              icon: <Book size={16} color={Colors.card} />
            },
            { 
              label: "Esplora il museo", 
              route: "/", 
              icon: <Compass size={16} color={Colors.card} />
            }
          ];
          
          foundTopic = true;
          break;
        }
      }
      
      // Check for app navigation queries
      if (!foundTopic) {
        for (const section in appNavigation) {
          const sectionInfo = appNavigation[section as keyof typeof appNavigation];
          
          if (input.includes(section) || 
              (section === "home" && (input.includes("inizio") || input.includes("principale"))) ||
              (section === "tickets" && (input.includes("bigliett") || input.includes("acquist"))) ||
              (section === "treasureHunt" && (input.includes("caccia") || input.includes("tesoro"))) ||
              (section === "map" && (input.includes("mappa") || input.includes("orientarmi"))) ||
              (section === "shop" && (input.includes("negozio") || input.includes("souvenir"))) ||
              (section === "cafe" && (input.includes("caffè") || input.includes("mangiare"))) ||
              (section === "customRoute" && (input.includes("personalizza") || input.includes("percorso")))
          ) {
            responseText = `${sectionInfo.description} Puoi accedere direttamente da qui:`;
            actions = [
              { 
                label: section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1'), 
                route: sectionInfo.route, 
                icon: sectionInfo.icon
              }
            ];
            
            // Add related sections
            if (section === "tickets") {
              actions.push({ 
                label: "Orari di apertura", 
                route: "/", 
                icon: <Clock size={16} color={Colors.card} />
              });
            } else if (section === "treasureHunt") {
              actions.push({ 
                label: "Sfida di Khufu", 
                route: "/khufu-game", 
                icon: <Sparkles size={16} color={Colors.card} />
              });
            } else if (section === "map") {
              actions.push({ 
                label: "Cerca reperti", 
                route: "/", 
                icon: <Search size={16} color={Colors.card} />
              });
            }
            
            foundTopic = true;
            break;
          }
        }
      }
      
      // If still no match, try to extract keywords and provide a relevant response
      if (!foundTopic) {
        // Check for partial matches in our knowledge domains
        if (input.match(/pir[aà]mid[ei]/)) {
          responseText = "Le piramidi sono tra le strutture più iconiche dell'antico Egitto. La Grande Piramide di Giza, costruita per il faraone Cheope, è l'unica delle Sette Meraviglie del Mondo Antico ancora esistente. Al museo puoi vedere modelli di piramidi e apprendere le tecniche di costruzione.";
          actions = [
            { 
              label: "Architettura egizia", 
              route: "/", 
              icon: <Book size={16} color={Colors.card} />
            }
          ];
        } 
        else if (input.match(/gerogl[iy]f[iy]/)) {
          responseText = "I geroglifici erano il sistema di scrittura formale dell'antico Egitto, usato principalmente per iscrizioni monumentali. Il museo ospita numerosi esempi di geroglifici su papiri, stele e oggetti vari. La Stele di Rosetta, che ha permesso la decifrazione dei geroglifici, si trova al British Museum, ma qui puoi vedere altre importanti iscrizioni.";
          actions = [
            { 
              label: "Scrittura egizia", 
              route: "/", 
              icon: <Book size={16} color={Colors.card} />
            }
          ];
        }
        // Try to understand if it's a question about the museum or Egypt
        else if (input.includes("?") || 
                input.match(/^(chi|cosa|come|quando|dove|perché|qual[ei]|quanto)/i) ||
                input.match(/dimmi|parlami|raccontami|spiegami/i)) {
          
          // It's likely a question, try to provide a helpful response
          responseText = "Questa è una domanda interessante! ";
          
          // Check for common question patterns
          if (input.match(/chi (era|fu|è stato)/i)) {
            responseText += "Il Museo Egizio ospita reperti di molti personaggi storici dell'antico Egitto, dai faraoni come Ramses II e Tutankhamon, a nobili come l'architetto Kha e sua moglie Merit. Posso darti informazioni più specifiche se mi dici di quale personaggio sei interessato.";
          } 
          else if (input.match(/quando (è stato|fu|venne)/i)) {
            responseText += "Il Museo Egizio di Torino è stato fondato nel 1824, ma la collezione ha origini più antiche. I reperti esposti coprono un periodo di oltre 4000 anni di storia egizia, dal periodo predinastico (3500 a.C. circa) all'epoca copta (IV-V secolo d.C.).";
          }
          else if (input.match(/dove (si trova|è|posso trovare)/i)) {
            responseText += "Il Museo Egizio si trova nel centro storico di Torino, in Via Accademia delle Scienze, 6. All'interno del museo, puoi utilizzare la mappa interattiva per trovare specifici reperti o sale.";
          }
          else if (input.match(/come (posso|faccio a|si fa a)/i)) {
            responseText += "Posso aiutarti con informazioni pratiche sulla visita al museo, come acquistare biglietti, orientarti con la mappa, o partecipare alle attività. Fammi sapere cosa ti interessa nello specifico.";
          }
          else {
            // Generic question response
            responseText = "Posso aiutarti con informazioni sul Museo Egizio e sull'antica civiltà egizia. La mia conoscenza copre la storia del museo, la sua collezione, i servizi offerti e molti aspetti della cultura egizia come arte, religione, mummificazione e vita quotidiana. Cosa ti interessa sapere nello specifico?";
          }
          
          actions = [
            { 
              label: "Esplora il museo", 
              route: "/", 
              icon: <Compass size={16} color={Colors.card} />
            },
            { 
              label: "Curiosità egizie", 
              route: "/", 
              icon: <Lightbulb size={16} color={Colors.card} />
            }
          ];
        }
        else {
          // Truly generic response for inputs we can't categorize
          responseText = "Mi sembra un argomento interessante! Posso aiutarti con informazioni sul Museo Egizio, la sua collezione, i servizi offerti e molti aspetti della cultura egizia. Ecco alcune opzioni che potrebbero interessarti:";
          actions = [
            { 
              label: "Esplora il museo", 
              route: "/", 
              icon: <Compass size={16} color={Colors.card} />
            },
            { 
              label: "Acquista biglietti", 
              route: "/tickets", 
              icon: <Ticket size={16} color={Colors.card} />
            },
            { 
              label: "Caccia al tesoro", 
              route: "/treasure-hunt", 
              icon: <Award size={16} color={Colors.card} />
            },
            { 
              label: "Mappa del museo", 
              route: "/map", 
              icon: <MapPin size={16} color={Colors.card} />
            }
          ];
        }
      }
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      actions: actions
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.chatContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <View style={styles.botInfoContainer}>
                <View style={styles.botIconContainer}>
                  <Bot size={24} color={Colors.gold} />
                </View>
                <View>
                  <Text style={styles.botName}>Khufu</Text>
                  <Text style={styles.botDescription}>La tua guida del Museo Egizio</Text>
                </View>
              </View>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <X size={24} color={Colors.text} />
              </Pressable>
            </View>
            
            <EgyptianPattern color={Colors.gold} />
            
            {/* Messages Area */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map(message => (
                <View 
                  key={message.id} 
                  style={[
                    styles.messageWrapper,
                    message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper
                  ]}
                >
                  <View 
                    style={[
                      styles.messageBubble,
                      message.sender === 'user' ? styles.userMessageBubble : styles.botMessageBubble
                    ]}
                  >
                    <Text style={[
                      styles.messageText,
                      message.sender === 'user' ? styles.userMessageText : styles.botMessageText
                    ]}>
                      {message.text}
                    </Text>
                    
                    {/* Action buttons */}
                    {message.sender === 'bot' && message.actions && message.actions.length > 0 && (
                      <View style={styles.actionButtonsContainer}>
                        {message.actions.map((action, index) => (
                          <Pressable
                            key={index}
                            style={styles.actionButton}
                            onPress={() => navigateTo(action.route)}
                          >
                            {action.icon}
                            <Text style={styles.actionButtonText}>{action.label}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                  <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                </View>
              ))}
            </ScrollView>
            
            {/* Input Area */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Scrivi un messaggio..."
                placeholderTextColor={Colors.lightText}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={handleSendMessage}
              />
              <Pressable 
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled
                ]} 
                onPress={handleSendMessage}
                disabled={!inputText.trim()}
              >
                <Send size={20} color={!inputText.trim() ? Colors.lightText : Colors.card} />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    marginHorizontal: 20,
  },
  chatContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    maxHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.card,
  },
  botInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  botName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  botDescription: {
    fontSize: 12,
    color: Colors.lightText,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 4,
  },
  userMessageBubble: {
    backgroundColor: Colors.gold,
    borderBottomRightRadius: 4,
  },
  botMessageBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.card,
  },
  botMessageText: {
    color: Colors.text,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.lightText,
    alignSelf: 'flex-end',
  },
  // Action buttons styling
  actionButtonsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 4,
    maxWidth: '100%',
  },
  actionButtonText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
    flexShrink: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 100,
    color: Colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});