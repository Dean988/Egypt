import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable, Modal, Animated, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Send, Bot } from 'lucide-react-native';
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
}

export default function ChatbotModal({ isVisible, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Initial greeting message
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const initialMessages = [
        {
          id: '1',
          text: "Ciao! Sono Khufu, la tua guida virtuale del Museo Egizio. Come posso aiutarti oggi?",
          sender: 'bot',
          timestamp: new Date()
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
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('orari') || input.includes('aperto') || input.includes('chiuso') || input.includes('quando')) {
      return "Il Museo Egizio è aperto tutti i giorni dalle 9:00 alle 18:30. L'ultimo ingresso è consentito un'ora prima della chiusura.";
    }
    
    if (input.includes('bigliett') || input.includes('costo') || input.includes('prezzo') || input.includes('quanto costa')) {
      return "I biglietti per il Museo Egizio costano €15 per gli adulti, €11 ridotto per studenti e over 65, €7 per i bambini dai 6 ai 14 anni. I bambini sotto i 6 anni entrano gratis.";
    }
    
    if (input.includes('dove') || input.includes('indirizzo') || input.includes('come arrivare')) {
      return "Il Museo Egizio si trova in Via Accademia delle Scienze, 6, nel centro di Torino. È facilmente raggiungibile con i mezzi pubblici o a piedi dal centro città.";
    }
    
    if (input.includes('mostra') || input.includes('esposizion') || input.includes('collezione')) {
      return "Il Museo Egizio ospita la più importante collezione di antichità egizie al mondo dopo quella del Cairo. Tra i pezzi più importanti ci sono il Tempio di Ellesija, la tomba di Kha e Merit, e numerosi papiri, mummie e sarcofagi.";
    }
    
    if (input.includes('visita guidata') || input.includes('guida') || input.includes('tour')) {
      return "Il museo offre visite guidate in diverse lingue. Puoi prenotare una visita guidata presso la biglietteria o in anticipo sul nostro sito web. Abbiamo anche audioguide disponibili in 8 lingue.";
    }
    
    if (input.includes('bambini') || input.includes('famiglia') || input.includes('attività per ragazzi')) {
      return "Il museo offre percorsi speciali per famiglie e bambini, tra cui la nostra popolare caccia al tesoro! Ci sono anche laboratori didattici nei fine settimana. È un'esperienza educativa e divertente per tutte le età.";
    }
    
    if (input.includes('foto') || input.includes('fotografare') || input.includes('fotografie')) {
      return "È permesso scattare fotografie senza flash in quasi tutte le sale del museo. In alcune aree speciali potrebbero esserci restrizioni, indicate da appositi cartelli.";
    }
    
    if (input.includes('ciao') || input.includes('salve') || input.includes('buongiorno') || input.includes('buonasera')) {
      return "Ciao! Sono Khufu, la tua guida virtuale del Museo Egizio. Come posso aiutarti oggi?";
    }
    
    if (input.includes('grazie') || input.includes('thank')) {
      return "Prego! Sono qui per aiutarti. Hai altre domande sul Museo Egizio?";
    }
    
    return "Mi dispiace, non ho informazioni specifiche su questo argomento. Posso aiutarti con orari, biglietti, mostre in corso, servizi per famiglie o indicazioni per raggiungere il museo. Puoi provare a riformulare la tua domanda?";
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