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
      name: 'Hall of Kings', 
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
      name: 'Papyrus Gallery', 
      floor: 1, 
      x: 2.5, 
      y: 2.7, // Moved even further down
      sectionId: 's2',
      icon: <Scroll size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-3', 
      number: '3', 
      name: 'Mummy Chamber', 
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
      name: 'Royal Jewelry', 
      floor: 1, 
      x: 3.3, // Moved slightly more to the left
      y: 1.6, // Moved slightly up
      sectionId: 's2',
      icon: <Gem size={14} color={Colors.egyptianRed} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-5', 
      number: '5', 
      name: 'Funerary Artifacts', 
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
      name: 'Sphinx Gallery', 
      floor: 1, 
      x: 3.2, // Moved even more to the right
      y: 3.2, 
      sectionId: 's3',
      icon: <Sparkles size={14} color={Colors.gold} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-7', 
      number: '7', 
      name: 'Daily Life', 
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
      name: 'Entrance', 
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
      name: 'Exit', 
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
      name: 'Stairs', 
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
      name: 'Weapons Gallery', 
      floor: 2, 
      x: 0.8, 
      y: 1.8, // Moved slightly up
      sectionId: 's5',
      icon: <Crown size={14} color={Colors.nileBlue} />,
      crowdLevel: 'medium'
    },
    { 
      id: 'room-9', 
      number: '9', 
      name: 'Royal Furniture', 
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
      name: 'Cosmetics', 
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
      name: 'Amulets', 
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
      name: 'Pottery', 
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
      name: 'Temple Reliefs', 
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
      name: 'Stairs', 
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
      name: 'Astronomy', 
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
      name: 'Medicine', 
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
      name: 'Music', 
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
      name: 'Children Toys', 
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
      name: 'Stairs', 
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
    name: 'North Wing', 
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
    name: 'East Wing', 
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
    name: 'South Wing', 
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
    name: 'West Wing', 
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
    name: 'North Wing', 
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
    name: 'East Wing', 
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
    name: 'South Wing', 
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
    name: 'West Wing', 
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
    name: 'North Wing', 
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
    name: 'East Wing', 
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
        <View style={styles.mapHeader}>
          <Text style={styles.mapTitle}>Museum Sections - Floor {selectedFloor}</Text>
          <Text style={styles.mapSubtitle}>Tap on a section or room number</Text>
        </View>
        
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
          <Text style={styles.floorSelectorLabel}>Floor:</Text>
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
          <Text style={styles.legendTitle}>Legend:</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.nileBlue }]} />
              <Text style={styles.legendText}>Your location</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.purple }]} />
              <Text style={styles.legendText}>Destination</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.nileBlue }]} />
              <Text style={styles.legendText}>Path</Text>
            </View>
          </View>
          
          {/* Crowd level legend */}
          <Text style={[styles.legendTitle, { marginTop: 8 }]}>Crowd Levels:</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.success }]} />
                <Users size={12} color={Colors.success} />
              </View>
              <Text style={styles.legendText}>Low</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.warning }]} />
                <Users size={12} color={Colors.warning} />
              </View>
              <Text style={styles.legendText}>Medium</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendCrowdContainer}>
                <View style={[styles.legendCircle, { borderColor: Colors.error }]} />
                <Users size={12} color={Colors.error} />
              </View>
              <Text style={styles.legendText}>High</Text>
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
            <Text style={styles.backButtonText}>Back to Sections</Text>
          </Pressable>
          <Text style={[styles.mapTitle, { color: section.color }]}>
            {section.name} - Floor {selectedFloor}
          </Text>
        </View>
        
        <View style={[styles.roomsGrid, { borderColor: section.color }]}>
          {sectionRooms.length === 0 ? (
            <Text style={styles.noRoomsText}>
              No rooms on this floor in {section.name}
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
          <Text style={styles.floorSelectorLabel}>Floor:</Text>
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
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <MapPin size={24} color={Colors.gold} />
            </View>
            <Text style={styles.headerTitle}>Museum Map</Text>
          </View>
          
          {/* Decorative Map Image */}
          <View style={styles.decorativeMapContainer}>
            <Image 
              source={{ uri: 'https://i.imgur.com/xAOPS3m.png' }}
              style={styles.decorativeMapImage}
              resizeMode="cover"
            />
            <View style={styles.decorativeMapOverlay} />
          </View>
          
          {/* Help button */}
          <Pressable 
            style={styles.helpButton}
            onPress={toggleHelp}
          >
            <HelpCircle size={16} color={Colors.gold} />
            <Text style={styles.helpButtonText}>
              {helpVisible ? "Hide Help" : "Need Help?"}
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
              <Text style={styles.helpTitle}>How to use the map:</Text>
              <Text style={styles.helpText}>
                1. Enter your current room number above, then tap "Set"
              </Text>
              <Text style={styles.helpText}>
                2. Tap on any section or directly on a room number on the map
              </Text>
              <Text style={styles.helpText}>
                3. Follow the path shown on the map - from blue marker (your location) to purple marker (destination)
              </Text>
              <Text style={styles.helpText}>
                4. The blue arrows show you which direction to walk
              </Text>
              <Text style={styles.helpText}>
                5. Use the floor selector to navigate between different levels of the museum
              </Text>
              <Text style={styles.helpText}>
                6. Special locations like stairs, entrances, and the café are marked with special icons
              </Text>
              <Text style={styles.helpText}>
                7. Room borders indicate crowd levels: green (low), yellow (medium), red (high)
              </Text>
            </View>
          )}
          
          <View style={styles.locationContainer}>
            <View style={styles.locationInputWrapper}>
              <Text style={styles.inputLabel}>Your Current Room:</Text>
              <View style={styles.inputWithButtonContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter room number"
                  value={currentRoomInput}
                  onChangeText={setCurrentRoomInput}
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={handleRoomInputSubmit}
                />
                <Button 
                  title="Set" 
                  onPress={handleRoomInputSubmit} 
                  size="small"
                  style={styles.setButton}
                />
              </View>
            </View>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            {currentRoom && (
              <View style={[styles.currentLocationDisplay, { backgroundColor: 'rgba(26, 75, 132, 0.1)', borderColor: Colors.nileBlue }]}>
                <Text style={[styles.currentLocationLabel, { color: Colors.nileBlue }]}>Current Location:</Text>
                <Text style={styles.currentLocationText}>
                  Room {currentRoom.number}: {currentRoom.name}
                </Text>
              </View>
            )}
            
            {destinationRoom && (
              <View style={[styles.destinationDisplay, { backgroundColor: 'rgba(138, 43, 226, 0.1)', borderColor: Colors.purple }]}>
                <Text style={[styles.destinationLabel, { color: Colors.purple }]}>Destination:</Text>
                <Text style={styles.destinationText}>
                  Room {destinationRoom.number}: {destinationRoom.name}
                </Text>
              </View>
            )}
            
            {(currentRoom || destinationRoom || pathVisible) && (
              <Button 
                title="Reset" 
                onPress={handleReset} 
                variant="outline"
                icon={<RotateCw size={16} color={Colors.gold} />}
                style={styles.resetButton}
              />
            )}
          </View>
          
          {viewMode === 'sections' ? renderSectionsView() : renderRoomsView()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.papyrus,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  // New decorative map image container
  decorativeMapContainer: {
    width: '92%',
    height: 180,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  decorativeMapImage: {
    width: '100%',
    height: '100%',
  },
  decorativeMapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 197, 24, 0.1)',
    marginHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
    gap: 8,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gold,
  },
  helpContent: {
    backgroundColor: Colors.card,
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 6,
    lineHeight: 20,
  },
  locationContainer: {
    backgroundColor: Colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  locationInputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputWithButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: Colors.card,
    width: '100%',
    paddingRight: 70, // Make room for the button
  },
  setButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    height: 40,
    paddingHorizontal: 12,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
  currentLocationDisplay: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  currentLocationLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentLocationText: {
    fontSize: 16,
    color: Colors.text,
  },
  destinationDisplay: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  destinationLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  destinationText: {
    fontSize: 16,
    color: Colors.text,
  },
  resetButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
  mapContainer: {
    backgroundColor: Colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
  },
  mapHeader: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  mapSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: Colors.text,
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
    color: Colors.text,
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
    color: Colors.text,
  },
  floorButtonTextActive: {
    color: Colors.card,
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
    color: Colors.lightText,
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
    color: Colors.text,
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
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
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
    color: Colors.text,
  },
});