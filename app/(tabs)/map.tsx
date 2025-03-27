import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  Landmark,
  Skull,
  Box,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Home,
  Coffee,
  RotateCw,
  Crown,
  Scroll,
  Gem,
  Sparkles,
  Pyramid,
  Hourglass,
  Music,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Users
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

// Define room type
interface Room {
  id: string;
  number: string;
  name: string;
  floor: number;
  x: number; // position on map grid (0-3)
  y: number; // position on map grid (0-3)
  isSpecial?: boolean;
  sectionId: string;
  icon?: React.ReactNode;
  crowdLevel?: 'low' | 'medium' | 'high';
}

// Define section type
interface Section {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  floor: number;
}

// Generate simplified rooms
const generateRooms = (): Room[] => {
  return [
    // Floor 1 - 4 sections, 7 rooms
    { 
      id: 'room-1', 
      number: '1', 
      name: 'Sala dei Re', 
      floor: 1, 
      x: 0.8, 
      y: 1.2, 
      sectionId: 's1',
      icon: <Crown size={14} color={Colors.gold} />,
      crowdLevel: 'high'
    },
    { 
      id: 'room-2', 
      number: '2', 
      name: 'Galleria dei Papiri', 
      floor: 1, 
      x: 2.5, 
      y: 2.7,
      sectionId: 's2',
      icon: <Scroll size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-3', 
      number: '3', 
      name: 'Camera delle Mummie', 
      floor: 1, 
      x: 3.2, 
      y: 0.8, 
      sectionId: 's2',
      icon: <Skull size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'high'
    },
    { 
      id: 'room-4', 
      number: '4', 
      name: 'Gioielli Reali', 
      floor: 1, 
      x: 3.3,
      y: 1.6,
      sectionId: 's2',
      icon: <Gem size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-5', 
      number: '5', 
      name: 'Artefatti Funerari', 
      floor: 1, 
      x: 1.5, 
      y: 3.5, 
      sectionId: 's3',
      icon: <Pyramid size={14} color={Colors.gold} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-6', 
      number: '6', 
      name: 'Galleria della Sfinge', 
      floor: 1, 
      x: 3.2,
      y: 3.2, 
      sectionId: 's3',
      icon: <Sparkles size={14} color={Colors.gold} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-7', 
      number: '7', 
      name: 'Vita Quotidiana', 
      floor: 1, 
      x: 0.8, 
      y: 3.2, 
      sectionId: 's4',
      icon: <Box size={14} color={Colors.success} />,
      crowdLevel: 'low'
    },
    
    // Special rooms floor 1
    { 
      id: 'entrance', 
      number: 'E', 
      name: 'Ingresso', 
      floor: 1, 
      x: 1.5, 
      y: 1.5, 
      isSpecial: true, 
      sectionId: 's1',
      icon: <Home size={14} color={Colors.nileBlue} />,
      crowdLevel: 'high'
    },
    { 
      id: 'exit', 
      number: 'X', 
      name: 'Uscita', 
      floor: 1, 
      x: 2.5, 
      y: 2.5, 
      isSpecial: true, 
      sectionId: 's3',
      icon: <MapPin size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'stairs1', 
      number: 'S', 
      name: 'Scale', 
      floor: 1, 
      x: 1.2, 
      y: 2.2, 
      isSpecial: true, 
      sectionId: 's4',
      icon: <ArrowUp size={14} color={Colors.gold} />,
      crowdLevel: 'low'
    },
    
    // Floor 2 - 3 sections, 6 rooms
    { 
      id: 'room-8', 
      number: '8', 
      name: 'Galleria delle Armi', 
      floor: 2, 
      x: 0.8, 
      y: 1.8,
      sectionId: 's5',
      icon: <Crown size={14} color={Colors.nileBlue} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-9', 
      number: '9', 
      name: 'Arredi Reali', 
      floor: 2, 
      x: 2.5, 
      y: 1.5, 
      sectionId: 's6',
      icon: <Sparkles size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-10', 
      number: '10', 
      name: 'Cosmetici', 
      floor: 2, 
      x: 3.2, 
      y: 1.5, 
      sectionId: 's6',
      icon: <Gem size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-11', 
      number: '11', 
      name: 'Amuleti', 
      floor: 2, 
      x: 2.5, 
      y: 3.2, 
      sectionId: 's7',
      icon: <Sparkles size={14} color={Colors.gold} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-12', 
      number: '12', 
      name: 'Ceramiche', 
      floor: 2, 
      x: 0.8, 
      y: 3.2, 
      sectionId: 's8',
      icon: <Box size={14} color={Colors.success} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-13', 
      number: '13', 
      name: 'Rilievi Templari', 
      floor: 2, 
      x: 3.2, 
      y: 2.8, 
      sectionId: 's7',
      icon: <Pyramid size={14} color={Colors.gold} />,
      crowdLevel: 'low'
    },
    
    // Special rooms floor 2
    { 
      id: 'cafe', 
      number: 'C', 
      name: 'Ristorazione', 
      floor: 2, 
      x: 1.5, 
      y: 1.5, 
      isSpecial: true, 
      sectionId: 's5',
      icon: <Coffee size={14} color="#8B4513" />,
      crowdLevel: 'medium'
    },
    { 
      id: 'stairs2', 
      number: 'S', 
      name: 'Scale', 
      floor: 2, 
      x: 1.2, 
      y: 2.2, 
      isSpecial: true, 
      sectionId: 's8',
      icon: <ArrowUp size={14} color={Colors.gold} />,
      crowdLevel: 'low'
    },
    
    // Floor 3 - 2 sections, 4 rooms
    { 
      id: 'room-14', 
      number: '14', 
      name: 'Astronomia', 
      floor: 3, 
      x: 0.8, 
      y: 2.0, 
      sectionId: 's9',
      icon: <Hourglass size={14} color={Colors.nileBlue} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-15', 
      number: '15', 
      name: 'Medicina', 
      floor: 3, 
      x: 2.5, 
      y: 1.5, 
      sectionId: 's10',
      icon: <Pyramid size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-16', 
      number: '16', 
      name: 'Musica', 
      floor: 3, 
      x: 3.2, 
      y: 1.5, 
      sectionId: 's10',
      icon: <Music size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'low'
    },
    { 
      id: 'room-17', 
      number: '17', 
      name: 'Giocattoli per Bambini', 
      floor: 3, 
      x: 0.8, 
      y: 2.8, 
      sectionId: 's9',
      icon: <Box size={14} color={Colors.nileBlue} />,
      crowdLevel: 'medium'
    },
    
    // Special rooms floor 3
    { 
      id: 'stairs3', 
      number: 'S', 
      name: 'Scale', 
      floor: 3, 
      x: 1.5, 
      y: 1.8, 
      isSpecial: true, 
      sectionId: 's9',
      icon: <ArrowUp size={14} color={Colors.gold} />,
      crowdLevel: 'low'
    },
  ];
};

const rooms = generateRooms();

// Create sections
const sections: Section[] = [
  // Floor 1
  { 
    id: 's1', 
    name: 'Ala Nord', 
    color: Colors.nileBlue, 
    icon: <Landmark size={24} color={Colors.nileBlue} />,
    x: 0,
    y: 0,
    width: 2,
    height: 2,
    floor: 1,
  },
  { 
    id: 's2', 
    name: 'Ala Est', 
    color: Colors.egyptianRed, 
    icon: <Skull size={24} color={Colors.egyptianRed} />,
    x: 2,
    y: 0,
    width: 2,
    height: 2,
    floor: 1,
  },
  { 
    id: 's3', 
    name: 'Ala Sud', 
    color: Colors.gold, 
    icon: <Box size={24} color={Colors.gold} />,
    x: 2,
    y: 2,
    width: 2,
    height: 2,
    floor: 1,
  },
  { 
    id: 's4', 
    name: 'Ala Ovest', 
    color: Colors.success, 
    icon: <Pyramid size={24} color={Colors.success} />,
    x: 0,
    y: 2,
    width: 2,
    height: 2,
    floor: 1,
  },
  
  // Floor 2
  { 
    id: 's5', 
    name: 'Ala Nord', 
    color: Colors.nileBlue, 
    icon: <Landmark size={24} color={Colors.nileBlue} />,
    x: 0,
    y: 0,
    width: 2,
    height: 2,
    floor: 2,
  },
  { 
    id: 's6', 
    name: 'Ala Est', 
    color: Colors.egyptianRed, 
    icon: <Skull size={24} color={Colors.egyptianRed} />,
    x: 2,
    y: 0,
    width: 2,
    height: 2,
    floor: 2,
  },
  { 
    id: 's7', 
    name: 'Ala Sud', 
    color: Colors.gold, 
    icon: <Box size={24} color={Colors.gold} />,
    x: 2,
    y: 2,
    width: 2,
    height: 2,
    floor: 2,
  },
  { 
    id: 's8', 
    name: 'Ala Ovest', 
    color: Colors.success, 
    icon: <Pyramid size={24} color={Colors.success} />,
    x: 0,
    y: 2,
    width: 2,
    height: 2,
    floor: 2,
  },
  
  // Floor 3
  { 
    id: 's9', 
    name: 'Ala Nord', 
    color: Colors.nileBlue, 
    icon: <Landmark size={24} color={Colors.nileBlue} />,
    x: 0,
    y: 0,
    width: 2,
    height: 4,
    floor: 3,
  },
  { 
    id: 's10', 
    name: 'Ala Est', 
    color: Colors.egyptianRed, 
    icon: <Skull size={24} color={Colors.egyptianRed} />,
    x: 2,
    y: 0,
    width: 2,
    height: 4,
    floor: 3,
  }
];

// Get room by number
const getRoomByNumber = (number: string): Room | undefined => {
  return rooms.find(r => r.number.toLowerCase() === number.toLowerCase());
};

// Generate a path between rooms
const generatePath = (startRoom: Room, endRoom: Room): Room[] => {
  // Simple path generation
  const path: Room[] = [startRoom];
  
  // If rooms are on different floors, add stairs
  if (startRoom.floor !== endRoom.floor) {
    // Find stairs on current floor
    const stairs = rooms.find(r => 
      r.id.includes('stairs') && 
      r.floor === startRoom.floor
    );
    
    if (stairs) {
      path.push(stairs);
      
      // Find stairs on destination floor
      const destStairs = rooms.find(r => 
        r.id.includes('stairs') && 
        r.floor === endRoom.floor
      );
      
      if (destStairs) {
        path.push(destStairs);
      }
    }
  }
  
  // Add destination
  if (path[path.length - 1].id !== endRoom.id) {
    path.push(endRoom);
  }
  
  return path;
};

// Get direction between two points
const getDirection = (startX: number, startY: number, endX: number, endY: number) => {
  const dx = endX - startX;
  const dy = endY - startY;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  } else {
    return dy > 0 ? 'down' : 'up';
  }
};

// Get direction arrow component
const getDirectionArrow = (direction: string, color: string = Colors.nileBlue) => {
  switch (direction) {
    case 'up':
      return <ArrowUp size={16} color={color} />;
    case 'down':
      return <ArrowDown size={16} color={color} />;
    case 'left':
      return <ArrowLeft size={16} color={color} />;
    case 'right':
      return <ArrowRight size={16} color={color} />;
    default:
      return null;
  }
};

// Get color for crowd level
const getCrowdLevelColor = (level: 'low' | 'medium' | 'high' | undefined) => {
  switch (level) {
    case 'low':
      return Colors.success;
    case 'medium':
      return Colors.warning;
    case 'high':
      return Colors.error;
    default:
      return Colors.border;
  }
};

export default function MapScreen() {
  const [currentRoomInput, setCurrentRoomInput] = useState('');
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [destinationRoom, setDestinationRoom] = useState<Room | null>(null);
  const [path, setPath] = useState<Room[]>([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [error, setError] = useState('');
  const [pathVisible, setPathVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sections' | 'rooms'>('sections');
  const [helpVisible, setHelpVisible] = useState(false);
  
  // Handle room input submission
  const handleRoomInputSubmit = () => {
    setError('');
    
    if (!currentRoomInput.trim()) {
      setError("Please enter your current room number");
      return;
    }
    
    const room = getRoomByNumber(currentRoomInput.trim());
    
    if (!room) {
      setError(`Room ${currentRoomInput} not found. Please enter a valid room number.`);
      return;
    }
    
    setCurrentRoom(room);
    setSelectedFloor(room.floor);
    
    // Clear previous path
    setPath([]);
    setPathVisible(false);
    setDestinationRoom(null);
  };
  
  // Handle section click
  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    setViewMode('rooms');
  };
  
  // Handle back to sections
  const handleBackToSections = () => {
    setSelectedSection(null);
    setViewMode('sections');
  };
  
  // Handle room click
  const handleRoomClick = (room: Room) => {
    setError('');
    
    // If no current room is set, show error
    if (!currentRoom) {
      setError("Please enter your current room number first");
      return;
    }
    
    // Set as destination
    setDestinationRoom(room);
    
    // Generate path
    const generatedPath = generatePath(currentRoom, room);
    setPath(generatedPath);
    setPathVisible(true);
    setViewMode('sections'); // Switch back to sections view to see the path
    setSelectedSection(null);
  };
  
  // Reset selections
  const handleReset = () => {
    setCurrentRoomInput('');
    setCurrentRoom(null);
    setDestinationRoom(null);
    setPath([]);
    setError('');
    setPathVisible(false);
    setViewMode('sections');
    setSelectedSection(null);
  };
  
  // Toggle help visibility
  const toggleHelp = () => {
    setHelpVisible(!helpVisible);
  };
  
  // Get sections for current floor
  const currentFloorSections = sections.filter(section => section.floor === selectedFloor);
  
  // Get rooms for selected section
  const sectionRooms = selectedSection 
    ? rooms.filter(room => room.sectionId === selectedSection && room.floor === selectedFloor)
    : [];
  
  // Render sections view
  const renderSectionsView = () => {
    return (
      <View style={styles.mapContainer}>
        <View style={styles.sectionsGrid}>
          {currentFloorSections.map((section) => {
            return (
              <Pressable 
                key={section.id}
                style={[
                  styles.sectionBox, 
                  { 
                    backgroundColor: `${section.color}30`,
                    left: section.x * 75,
                    top: section.y * 75,
                    width: section.width * 75,
                    height: section.height * 75
                  }
                ]}
                onPress={() => handleSectionClick(section.id)}
              >
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={[styles.sectionTitle, { color: section.color }]}>
                      {section.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
          
          {/* Draw path if visible */}
          {pathVisible && path.length > 1 && (
            <View style={styles.pathContainer}>
              {path.map((room, index) => {
                if (index === path.length - 1) return null; // Skip last room
                
                const nextRoom = path[index + 1];
                
                // Skip if not on the current floor
                if (room.floor !== selectedFloor || nextRoom.floor !== selectedFloor) {
                  return null;
                }
                
                // Calculate path line position
                const startX = room.x * 75;
                const startY = room.y * 75;
                const endX = nextRoom.x * 75;
                const endY = nextRoom.y * 75;
                
                // Calculate line length and angle
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
                
                // Get direction for arrow
                const direction = getDirection(room.x, room.y, nextRoom.x, nextRoom.y);
                
                return (
                  <View key={`path-${index}`}>
                    <View 
                      style={[
                        styles.pathLine,
                        {
                          width: length,
                          left: startX,
                          top: startY,
                          transform: [{ rotate: `${angle}deg` }],
                          transformOrigin: '0 0'
                        }
                      ]}
                    />
                    
                    {/* Direction arrow in the middle of the path */}
                    <View 
                      style={[
                        styles.directionArrow,
                        {
                          left: startX + (endX - startX) / 2 - 8,
                          top: startY + (endY - startY) / 2 - 8,
                        }
                      ]}
                    >
                      {getDirectionArrow(direction)}
                    </View>
                  </View>
                );
              })}
              
              {/* Path step markers */}
              {path.map((room, index) => {
                // Skip if not on the current floor
                if (room.floor !== selectedFloor) {
                  return null;
                }
                
                return (
                  <View 
                    key={`marker-${index}`}
                    style={[
                      styles.pathMarker,
                      {
                        left: room.x * 75 - 12,
                        top: room.y * 75 - 12,
                        backgroundColor: index === 0 ? Colors.nileBlue : 
                                         index === path.length - 1 ? Colors.purple : 
                                         Colors.nileBlue
                      }
                    ]}
                  >
                    <Text style={styles.pathMarkerText}>{index + 1}</Text>
                  </View>
                );
              })}
            </View>
          )}
          
          {/* Special rooms and facilities */}
          {rooms.filter(r => r.isSpecial && r.floor === selectedFloor).map(room => (
            <View 
              key={room.id}
              style={[
                styles.specialRoom,
                {
                  left: room.x * 75 - 15,
                  top: room.y * 75 - 15,
                }
              ]}
            >
              <View style={styles.specialRoomIcon}>
                {room.icon}
              </View>
              <Text style={styles.specialRoomNumber}>{room.number}</Text>
            </View>
          ))}
          
          {/* Regular rooms */}
          {rooms.filter(r => !r.isSpecial && r.floor === selectedFloor).map(room => (
            <Pressable 
              key={room.id}
              style={[
                styles.roomCircle,
                {
                  left: room.x * 75 - 15,
                  top: room.y * 75 - 15,
                  backgroundColor: currentRoom?.id === room.id ? Colors.nileBlue :
                                   destinationRoom?.id === room.id ? Colors.purple :
                                   'white',
                  borderColor: getCrowdLevelColor(room.crowdLevel)
                }
              ]}
              onPress={() => handleRoomClick(room)}
            >
              <Text style={[
                styles.roomNumber,
                {
                  color: (currentRoom?.id === room.id || destinationRoom?.id === room.id) ? 'white' : Colors.text
                }
              ]}>
                {room.number}
              </Text>
              {room.icon && (
                <View style={styles.roomIcon}>
                  {room.icon}
                </View>
              )}
            </Pressable>
          ))}
        </View>
        
        {/* Floor selector */}
        <View style={styles.floorSelector}>
          <Text style={styles.floorSelectorLabel}>Piano:</Text>
          {[1, 2, 3].map(floor => (
            <Pressable
              key={floor}
              style={[
                styles.floorButton,
                selectedFloor === floor && styles.floorButtonActive
              ]}
              onPress={() => setSelectedFloor(floor)}
            >
              <Text 
                style={[
                  styles.floorButtonText,
                  selectedFloor === floor && styles.floorButtonTextActive
                ]}
              >
                {floor}
              </Text>
            </Pressable>
          ))}
        </View>
        
        {/* Map legend */}
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legenda:</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.nileBlue }]} />
              <Text style={styles.legendText}>La tua posizione</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.purple }]} />
              <Text style={styles.legendText}>Destinazione</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.nileBlue }]} />
              <Text style={styles.legendText}>Percorso</Text>
            </View>
          </View>
          
          {/* Crowd level legend */}
          <Text style={[styles.legendTitle, { marginTop: 8 }]}>Livelli di affollamento:</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.success }]} />
                <Users size={12} color={Colors.success} />
              </View>
              <Text style={styles.legendText}>Basso</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.warning }]} />
                <Users size={12} color={Colors.warning} />
              </View>
              <Text style={styles.legendText}>Medio</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.error }]} />
                <Users size={12} color={Colors.error} />
              </View>
              <Text style={styles.legendText}>Alto</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  // Render rooms view
  const renderRoomsView = () => {
    const section = sections.find(s => s.id === selectedSection);
    if (!section) return null;
    
    return (
      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          <Pressable 
            style={styles.backButton}
            onPress={handleBackToSections}
          >
            <ArrowLeft size={20} color={Colors.text} />
            <Text style={styles.backButtonText}>Torna alle Sezioni</Text>
          </Pressable>
          <Text style={[styles.mapTitle, { color: section.color }]}>
            {section.name} - Piano {selectedFloor}
          </Text>
        </View>
        
        <View style={[styles.roomsGrid, { borderColor: section.color }]}>
          {sectionRooms.length === 0 ? (
            <Text style={styles.noRoomsText}>
              Nessuna stanza in questo piano in {section.name}
            </Text>
          ) : (
            sectionRooms.map(room => (
              <Pressable 
                key={room.id}
                style={[
                  styles.roomButton,
                  destinationRoom?.id === room.id && { 
                    backgroundColor: `${Colors.purple}20`,
                    borderColor: Colors.purple 
                  },
                  currentRoom?.id === room.id && { 
                    backgroundColor: `${Colors.nileBlue}20`,
                    borderColor: Colors.nileBlue 
                  },
                  (!destinationRoom || destinationRoom.id !== room.id) && 
                  (!currentRoom || currentRoom.id !== room.id) && 
                  { borderColor: getCrowdLevelColor(room.crowdLevel) }
                ]}
                onPress={() => handleRoomClick(room)}
              >
                <View style={styles.roomButtonContent}>
                  <View style={[
                    styles.roomButtonCircle,
                    destinationRoom?.id === room.id && { backgroundColor: Colors.purple },
                    currentRoom?.id === room.id && { backgroundColor: Colors.nileBlue }
                  ]}>
                    <Text style={[
                      styles.roomButtonNumber,
                      (destinationRoom?.id === room.id || currentRoom?.id === room.id) && { color: 'white' }
                    ]}>
                      {room.number}
                    </Text>
                    {room.icon && (
                      <View style={styles.roomButtonIcon}>
                        {room.icon}
                      </View>
                    )}
                  </View>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <View style={[styles.crowdIndicator, { backgroundColor: getCrowdLevelColor(room.crowdLevel) }]}>
                    <Users size={12} color="white" />
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
        
        {/* Floor selector */}
        <View style={styles.floorSelector}>
          <Text style={styles.floorSelectorLabel}>Piano:</Text>
          {[1, 2, 3].map(floor => (
            <Pressable
              key={floor}
              style={[
                styles.floorButton,
                selectedFloor === floor && styles.floorButtonActive
              ]}
              onPress={() => setSelectedFloor(floor)}
            >
              <Text 
                style={[
                  styles.floorButtonText,
                  selectedFloor === floor && styles.floorButtonTextActive
                ]}
              >
                {floor}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.scrollContentInner}>
            {/* Banner all'inizio dello scroll */}
            <View style={styles.bannerContainer}>
              <Image 
                source={{ uri: 'https://i.imgur.com/YM8q5S6.png' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay}>
                <View style={styles.bannerTitleContainer}>
                  <Text style={styles.bannerTitle}>MAPPA DEL MUSEO</Text>
                  <View style={styles.bannerUnderline} />
                </View>
                <Text style={styles.bannerSubtitle}>Sei perso? Ecco a te la mappa!</Text>
              </View>
            </View>

            {/* Header con nuova icona */}
            <View style={styles.header}>
              <View style={styles.headerIcon}>
                <Image 
                  source={{ uri: 'https://i.imgur.com/aOVkk9Y.png' }}
                  style={styles.mapIconImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.headerTitle}>Mappa</Text>
            </View>
            
            {/* Help button tradotto */}
            <Pressable 
              style={styles.helpButton}
              onPress={toggleHelp}
            >
              <HelpCircle size={16} color={Colors.gold} />
              <Text style={styles.helpButtonText}>
                {helpVisible ? "Nascondi Aiuto" : "Hai bisogno di aiuto?"}
              </Text>
              {helpVisible ? (
                <ChevronUp size={16} color={Colors.gold} />
              ) : (
                <ChevronDown size={16} color={Colors.gold} />
              )}
            </Pressable>
            
            {/* Collapsible help section */}
            {helpVisible && (
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>Come usare la mappa:</Text>
                <Text style={styles.helpText}>
                  1. Inserisci il numero della tua stanza attuale sopra, poi premi "Imposta"
                </Text>
                <Text style={styles.helpText}>
                  2. Tocca una sezione o direttamente il numero di una stanza sulla mappa
                </Text>
                <Text style={styles.helpText}>
                  3. Segui il percorso mostrato sulla mappa - dal punto blu (la tua posizione) al punto viola (destinazione)
                </Text>
                <Text style={styles.helpText}>
                  4. Le frecce blu indicano la direzione in cui camminare
                </Text>
                <Text style={styles.helpText}>
                  5. Usa il selettore dei piani per navigare tra i diversi livelli del museo
                </Text>
                <Text style={styles.helpText}>
                  6. Luoghi speciali come scale, ingressi e ristorazione sono indicati con icone speciali
                </Text>
                <Text style={styles.helpText}>
                  7. I bordi delle stanze indicano il livello di affollamento: verde (basso), giallo (medio), rosso (alto)
                </Text>
              </View>
            )}
            
            {/* Sistemazione del contrasto nel location container */}
            <View style={styles.locationContainer}>
              <View style={styles.locationInputWrapper}>
                <Text style={styles.inputLabel}>La tua posizione attuale:</Text>
                <View style={styles.inputWithButtonContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Inserisci numero stanza"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={currentRoomInput}
                    onChangeText={setCurrentRoomInput}
                    keyboardType="default"
                    returnKeyType="done"
                    onSubmitEditing={handleRoomInputSubmit}
                  />
                  <Button 
                    title="Imposta" 
                    onPress={handleRoomInputSubmit} 
                    size="small"
                    style={styles.setButton}
                  />
                </View>
              </View>
              
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    {error === "Please enter your current room number" ? 
                      "Inserisci il numero della tua stanza attuale" : 
                      error.includes("Room") ? 
                      error.replace("Room", "Stanza").replace("not found. Please enter a valid room number.", "non trovata. Inserisci un numero di stanza valido.") : 
                      error === "Please enter your current room number first" ?
                      "Inserisci prima il numero della tua stanza attuale" :
                      error}
                  </Text>
                </View>
              ) : null}
              
              {currentRoom && (
                <View style={[styles.currentLocationDisplay, { backgroundColor: 'rgba(26, 75, 132, 0.1)', borderColor: Colors.nileBlue }]}>
                  <Text style={[styles.currentLocationLabel, { color: Colors.nileBlue }]}>Posizione attuale:</Text>
                  <Text style={styles.currentLocationText}>
                    Stanza {currentRoom.number}: {currentRoom.name}
                  </Text>
                </View>
              )}
              
              {destinationRoom && (
                <View style={[styles.destinationDisplay, { backgroundColor: 'rgba(138, 43, 226, 0.1)', borderColor: Colors.purple }]}>
                  <Text style={[styles.destinationLabel, { color: Colors.purple }]}>Destinazione:</Text>
                  <Text style={styles.destinationText}>
                    Stanza {destinationRoom.number}: {destinationRoom.name}
                  </Text>
                </View>
              )}
              
              {(currentRoom || destinationRoom || pathVisible) && (
                <Button 
                  title="Azzera" 
                  onPress={handleReset} 
                  variant="outline"
                  icon={<RotateCw size={16} color={Colors.gold} />}
                  style={styles.resetButton}
                />
              )}
            </View>
            
            {viewMode === 'sections' ? renderSectionsView() : renderRoomsView()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  scrollContentInner: {
    backgroundColor: '#231f20',
  },
  // Nuovo banner che scorre con la pagina
  bannerContainer: {
    height: 230,
    width: '100%',
    position: 'relative',
    marginBottom: 24,
    borderBottomWidth: 3,
    borderBottomColor: Colors.gold,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitleContainer: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.6)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'relative',
    marginHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 4,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textTransform: 'uppercase',
  },
  bannerUnderline: {
    height: 4,
    width: 120,
    backgroundColor: Colors.gold,
    marginBottom: 16,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderRadius: 2,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.3)', // Aumentato il contrasto per l'icona
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    gap: 8,
  },
  helpButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  helpContent: {
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 12,
    letterSpacing: 1,
  },
  helpText: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 22,
  },
  locationContainer: {
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  locationInputWrapper: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.gold,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  inputWithButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    paddingRight: 70, // Make room for the button
    color: '#ffffff',
  },
  setButton: {
    position: 'absolute',
    right: 4,
    top: 5,
    height: 40,
    paddingHorizontal: 12,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 15,
  },
  currentLocationDisplay: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    borderWidth: 1.5,
  },
  currentLocationLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  currentLocationText: {
    fontSize: 17,
    color: '#ffffff',
  },
  destinationDisplay: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    borderWidth: 1.5,
  },
  destinationLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  destinationText: {
    fontSize: 17,
    color: '#ffffff',
  },
  resetButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  mapContainer: {
    backgroundColor: 'rgba(35, 31, 32, 0.9)',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  mapHeader: {
    height: 200,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
    overflow: 'hidden',
  },
  mapHeaderImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  mapHeaderOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitleContainer: {
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mapTitleUnderline: {
    height: 3,
    width: 80,
    backgroundColor: Colors.gold,
    marginBottom: 12,
  },
  mapSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: Colors.gold, // Migliorata visibilità
    marginLeft: 4,
  },
  sectionsGrid: {
    width: 300,
    height: 300,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#f5f5f5',
  },
  sectionBox: {
    position: 'absolute',
    padding: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  specialRoom: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  specialRoomIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specialRoomNumber: {
    position: 'absolute',
    bottom: -12,
    fontSize: 10,
    color: Colors.text,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 2,
    borderRadius: 4,
  },
  roomCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    zIndex: 5,
  },
  roomNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
  roomIcon: {
    position: 'absolute',
    top: -14,
    right: -7,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pathContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: 300,
    zIndex: 1,
  },
  pathLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: Colors.nileBlue,
    borderRadius: 2,
    zIndex: 2,
  },
  directionArrow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    borderWidth: 1,
    borderColor: Colors.nileBlue,
  },
  pathMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  pathMarkerText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  floorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  floorSelectorLabel: {
    fontSize: 14,
    color: '#ffffff', // Migliorata visibilità
    marginRight: 8,
  },
  floorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  floorButtonActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  floorButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff', // Bianco per visibilità su sfondo scuro
  },
  floorButtonTextActive: {
    color: '#231f20', // Scuro quando il pulsante è attivo (sfondo dorato)
  },
  roomsGrid: {
    width: '100%',
    flexDirection: 'column',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    gap: 12,
  },
  noRoomsText: {
    width: '100%',
    textAlign: 'center',
    padding: 16,
    color: '#ffffff', // Migliorata visibilità
    fontStyle: 'italic',
  },
  roomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  roomButtonSelected: {
    backgroundColor: 'rgba(245, 197, 24, 0.2)',
    borderColor: Colors.gold,
  },
  roomButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  roomButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  roomButtonIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roomButtonNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  roomName: {
    fontSize: 14,
    color: '#ffffff', // Migliorata visibilità
    flex: 1,
  },
  crowdIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendContainer: {
    marginTop: 16,
    width: '100%',
    padding: 12, // Aumentato padding
    backgroundColor: 'rgba(35, 31, 32, 0.8)', // Sfondo più scuro per contrasto
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.gold, // Testo in oro per visibilità
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  legendCrowdContainer: {
    position: 'relative',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#ffffff', // Testo bianco per visibilità
  },
  mapIconImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
});