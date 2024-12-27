import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Define props for the category card
type CategoryCardProps = {
  id: number;
  name: string;
  description: string; // New field for description
  imageSource: any;
  statusTag?: string; // New field for status tags
  onPress: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description,
  imageSource,
  statusTag,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Category Image */}
      <Image source={imageSource} style={styles.image} />

      {/* Status Tag */}
      {statusTag && <Text style={styles.tag}>{statusTag}</Text>}

      {/* Title */}
      <Text style={styles.title}>{name}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 40, // Makes the image circular
  },
  tag: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default CategoryCard;
