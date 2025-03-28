import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, TextInput, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Trophy, Clock, Star, CheckCircle, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import treasureHunts from '@/mocks/treasure-hunts';
import Button from '@/components/Button';
import { useUserStore } from '@/store/user-store';
import EgyptianPattern from '@/components/EgyptianPattern';

export default function SpecialChallengeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const treasureHunt = treasureHunts.find(hunt => hunt.id === id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  const { treasureHuntProgress } = useUserStore();
  
  // Check if the user has completed the treasure hunt
  const huntProgress = treasureHuntProgress && treasureHuntProgress[id as string];
  const hasCompletedHunt = huntProgress && huntProgress.completed;
  
  // Special challenge questions
  const questions = [
    {
      question: "Quale divinità egizia era rappresentata con la testa di sciacallo?",
      options: ["Anubi", "Osiride", "Ra", "Horus"],
      correctAnswer: 0
    },
    {
      question: "Quale faraone è noto per aver spostato la capitale a Tell el-Amarna e aver promosso il culto di Aton?",
      options: ["Tutankhamon", "Ramses II", "Akhenaton", "Thutmose III"],
      correctAnswer: 2
    },
    {
      question: "Quale strumento veniva usato dagli antichi egizi per misurare il livello del Nilo?",
      options: ["Astrolabio", "Nilometro", "Meridiana", "Clessidra"],
      correctAnswer: 1
    },
    {
      question: "Quale materiale veniva utilizzato per scrivere i testi sacri nell'antico Egitto?",
      options: ["Pergamena", "Papiro", "Argilla", "Pietra"],
      correctAnswer: 1
    },
    {
      question: "Quale struttura architettonica egizia è considerata una delle Sette Meraviglie del Mondo Antico?",
      options: ["Tempio di Karnak", "Piramide di Cheope", "Tempio di Abu Simbel", "Sfinge di Giza"],
      correctAnswer: 1
    }
  ];
  
  if (!treasureHunt) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Sfida Speciale",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.headerButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </Pressable>
            ),
          }} 
        />
        <Text style={styles.errorText}>Caccia al tesoro non trovata</Text>
        <Button title="Torna indietro" onPress={() => router.back()} />
      </View>
    );
  }
  
  if (!hasCompletedHunt) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Sfida Speciale",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.headerButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </Pressable>
            ),
          }} 
        />
        <View style={styles.content}>
          <View style={styles.lockedContainer}>
            <Image 
              source={{ uri: "https://i.imgur.com/Wb48y2z.jpeg" }} 
              style={styles.lockedImage}
              resizeMode="cover"
            />
            <View style={styles.lockedOverlay}>
              <View style={styles.lockIconContainer}>
                <X size={40} color={Colors.error} />
              </View>
              <Text style={styles.lockedTitle}>Sfida Bloccata</Text>
              <Text style={styles.lockedText}>
                Devi completare la caccia al tesoro "{treasureHunt.name}" prima di accedere alla sfida speciale.
              </Text>
              <Button 
                title="Torna alla caccia al tesoro" 
                onPress={() => router.back()}
                style={styles.lockedButton}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index.toString();
    setAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let newScore = 0;
      for (let i = 0; i < questions.length; i++) {
        if (parseInt(answers[i], 10) === questions[i].correctAnswer) {
          newScore++;
        }
      }
      setScore(newScore);
      setShowResults(true);
    }
  };
  
  const handleFinish = () => {
    router.back();
  };
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Sfida Speciale",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <View style={styles.content}>
        {!showResults ? (
          <>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeBadge}>
                <Trophy size={16} color={Colors.card} />
                <Text style={styles.challengeBadgeText}>Sfida Speciale</Text>
              </View>
              <Text style={styles.challengeTitle}>{treasureHunt.name}: Quiz Finale</Text>
              <View style={styles.timerContainer}>
                <Clock size={16} color={Colors.gold} />
                <Text style={styles.timerText}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              Domanda {currentQuestion + 1} di {questions.length}
            </Text>
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
              
              <View style={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <Pressable 
                    key={index}
                    style={[
                      styles.optionButton,
                      answers[currentQuestion] === index.toString() && styles.optionButtonSelected
                    ]}
                    onPress={() => handleSelectAnswer(index)}
                  >
                    <Text style={[
                      styles.optionText,
                      answers[currentQuestion] === index.toString() && styles.optionTextSelected
                    ]}>
                      {option}
                    </Text>
                    {answers[currentQuestion] === index.toString() && (
                      <CheckCircle size={20} color={Colors.card} />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
            
            <Button 
              title={currentQuestion < questions.length - 1 ? "Prossima domanda" : "Termina quiz"} 
              onPress={handleNextQuestion}
              style={styles.nextButton}
              disabled={!answers[currentQuestion]}
            />
          </>
        ) : (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Trophy size={40} color={Colors.gold} />
              <Text style={styles.resultsTitle}>Quiz Completato!</Text>
              <Text style={styles.resultsScore}>
                Hai totalizzato {score} su {questions.length} punti
              </Text>
            </View>
            
            <EgyptianPattern color={Colors.gold} style={styles.divider} />
            
            <View style={styles.rewardContainer}>
              <Text style={styles.rewardTitle}>Il tuo premio:</Text>
              
              <View style={styles.rewardCard}>
                <View style={styles.rewardIconContainer}>
                  <Star size={24} color={Colors.gold} />
                </View>
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardName}>
                    {score >= 4 ? "Medaglia d'Oro del Faraone" : 
                     score >= 3 ? "Medaglia d'Argento del Faraone" : 
                     "Medaglia di Bronzo del Faraone"}
                  </Text>
                  <Text style={styles.rewardDescription}>
                    {score >= 4 ? "Hai dimostrato una conoscenza eccezionale dell'antico Egitto!" : 
                     score >= 3 ? "Hai dimostrato una buona conoscenza dell'antico Egitto." : 
                     "Hai completato la sfida dell'antico Egitto."}
                  </Text>
                </View>
              </View>
              
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>
                  + {score * 50} punti
                </Text>
              </View>
            </View>
            
            <Button 
              title="Torna alla caccia al tesoro" 
              onPress={handleFinish}
              style={styles.finishButton}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  challengeHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    gap: 8,
  },
  challengeBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.card,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 24,
  },
  questionContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.papyrus,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionButtonSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  optionTextSelected: {
    color: Colors.card,
    fontWeight: 'bold',
  },
  nextButton: {
    marginBottom: 32,
  },
  resultsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  resultsScore: {
    fontSize: 18,
    color: Colors.text,
  },
  divider: {
    marginBottom: 24,
  },
  rewardContainer: {
    marginBottom: 24,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: Colors.papyrus,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginBottom: 16,
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  rewardContent: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  pointsContainer: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  finishButton: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 24,
  },
  lockedContainer: {
    position: 'relative',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  lockedText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  lockedButton: {
    minWidth: 200,
  },
});