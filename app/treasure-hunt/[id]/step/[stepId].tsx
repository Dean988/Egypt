import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, TextInput, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle, CheckCircle, ChevronRight, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import treasureHunts from '@/mocks/treasure-hunts';
import Button from '@/components/Button';
import { useUserStore } from '@/store/user-store';
import EgyptianPattern from '@/components/EgyptianPattern';

export default function TreasureHuntStepScreen() {
  const { id, stepId } = useLocalSearchParams();
  const router = useRouter();
  const treasureHunt = treasureHunts.find(hunt => hunt.id === id);
  const stepIndex = parseInt(stepId as string, 10);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const { 
    treasureHuntProgress, 
    updateTreasureHuntProgress,
    completeTreasureHunt
  } = useUserStore();
  
  // Get the current clue
  const clue = treasureHunt?.clues?.[stepIndex - 1];
  
  // Get progress for this specific treasure hunt
  const huntProgress = treasureHuntProgress && treasureHuntProgress[id as string] 
    ? treasureHuntProgress[id as string] 
    : { 
        currentStep: 0, 
        completed: false,
        startedAt: null
      };
  
  useEffect(() => {
    // Reset state when step changes
    setAnswer('');
    setShowHint(false);
    setIsCorrect(false);
  }, [stepId]);
  
  if (!treasureHunt || !clue) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: "Caccia al Tesoro",
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.headerButton}>
                <ArrowLeft size={24} color={Colors.text} />
              </Pressable>
            ),
          }} 
        />
        <Text style={styles.errorText}>Indizio non trovato</Text>
        <Button title="Torna indietro" onPress={() => router.back()} />
      </View>
    );
  }
  
  const handleCheckAnswer = () => {
    if (!answer.trim()) {
      Alert.alert("Risposta mancante", "Inserisci una risposta prima di continuare.");
      return;
    }
    
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = clue.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
    } else {
      Alert.alert("Risposta errata", "La tua risposta non è corretta. Riprova!");
    }
  };
  
  const handleNextStep = () => {
    const nextStep = stepIndex + 1;
    
    // Update progress
    updateTreasureHuntProgress(id as string, {
      ...huntProgress,
      currentStep: nextStep,
    });
    
    // Check if this was the last step
    if (nextStep > treasureHunt.clues.length) {
      // Mark as completed
      completeTreasureHunt(id as string);
      
      // Show completion message
      Alert.alert(
        "Congratulazioni!",
        "Hai completato la caccia al tesoro! Ora puoi accedere alla sfida speciale.",
        [
          {
            text: "Torna alla pagina principale",
            onPress: () => router.push("/treasure-hunt"),
          }
        ]
      );
    } else {
      // Go to next step
      router.push(`/treasure-hunt/${id}/step/${nextStep}`);
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Tappa ${stepIndex}`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerButton}>
              <ArrowLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Tappa {stepIndex} di {treasureHunt.clues.length}</Text>
        </View>
        
        {clue.imageUrl && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: clue.imageUrl }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        
        <View style={styles.clueContainer}>
          <Text style={styles.clueTitle}>Indizio</Text>
          <Text style={styles.clueText}>{clue.question}</Text>
          
          {clue.exhibitId && (
            <View style={styles.exhibitInfo}>
              <MapPin size={16} color={Colors.gold} />
              <Text style={styles.exhibitText}>Cerca vicino all'esposizione #{clue.exhibitId}</Text>
            </View>
          )}
          
          <Pressable 
            style={styles.hintButton} 
            onPress={toggleHint}
          >
            <HelpCircle size={16} color={Colors.gold} />
            <Text style={styles.hintButtonText}>
              {showHint ? "Nascondi suggerimento" : "Mostra suggerimento"}
            </Text>
          </Pressable>
          
          {showHint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>{clue.hint}</Text>
            </View>
          )}
        </View>
        
        <EgyptianPattern color={Colors.gold} style={styles.divider} />
        
        {!isCorrect ? (
          <View style={styles.answerContainer}>
            <Text style={styles.answerTitle}>La tua risposta</Text>
            <TextInput
              style={styles.answerInput}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Scrivi qui la tua risposta..."
              placeholderTextColor={Colors.lightText}
            />
            <Button 
              title="Verifica risposta" 
              onPress={handleCheckAnswer}
              style={styles.checkButton}
            />
          </View>
        ) : (
          <View style={styles.correctAnswerContainer}>
            <View style={styles.correctBadge}>
              <CheckCircle size={20} color={Colors.card} />
              <Text style={styles.correctBadgeText}>Risposta corretta!</Text>
            </View>
            
            <Text style={styles.correctAnswerText}>
              Ottimo lavoro! Hai trovato la risposta giusta.
            </Text>
            
            <Pressable 
              style={styles.nextButton} 
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>
                {stepIndex >= treasureHunt.clues.length 
                  ? "Completa la caccia al tesoro" 
                  : "Vai al prossimo indizio"}
              </Text>
              <ChevronRight size={16} color={Colors.card} />
            </Pressable>
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
  stepIndicator: {
    backgroundColor: Colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  clueContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  clueText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  exhibitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  exhibitText: {
    fontSize: 14,
    color: Colors.text,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  hintButtonText: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: '500',
  },
  hintContainer: {
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  hintText: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
  divider: {
    marginBottom: 24,
  },
  answerContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  answerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  answerInput: {
    backgroundColor: Colors.papyrus,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkButton: {
    marginTop: 8,
  },
  correctAnswerContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  correctBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.success,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  correctBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.card,
  },
  correctAnswerText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.card,
    marginRight: 8,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 24,
  },
});