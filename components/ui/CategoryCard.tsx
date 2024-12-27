import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Define props for the category card
type CategoryCardProps = {
  id: number;
  name: string;
  imageSource: any;
  statusTag?: string; // New field for status tags
  onPress: () => void;
};

// Calculate Dynamic Width Inside Component
const screenWidth = Dimensions.get('window').width; // Screen width
const cardWidth = (screenWidth - 32) / 2; // 2 Columns with padding

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  imageSource,
  statusTag,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Category Image */}
      <Image source={imageSource} style={styles.image} />

{/* Status Tag */}
{statusTag && (
  <Text
    style={[
      styles.tag,
      statusTag === 'Completed' && styles.completedTag, // Apply a different style for 'Completed'
    ]}
  >
    {statusTag}
  </Text>
)}

      {/* Title */}
      <Text style={styles.title}>{name}</Text>


    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    width: cardWidth, // Use the passed cardWidth prop
    height: 180, // Fixed height
    margin: 8, // Uniform gaps
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },


  image: {
    width: '100%', // Fill the card width
    height: 100, // Fixed height
    resizeMode: 'cover', // Cover without stretching
  },
   

  tag: {
    backgroundColor: '#b17bff',
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 20,
    alignSelf: 'center', // Centers the tag
    marginTop: 8,
  },
  completedTag: {
    backgroundColor: '#00d759', // Green background for completed tag
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center', // Ensures alignment
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default CategoryCard;
