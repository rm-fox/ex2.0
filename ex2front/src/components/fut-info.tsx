// InfoBox.tsx
import React from 'react';
import chartImage from './sofrlol.png'; // Update the path to your image

const InfoBox: React.FC = () => {
  return (
    <div style={styles.container}>
      <img src={chartImage} alt="Chart" style={styles.image} />
      <div style={styles.textContainer}>
        <h3 style={styles.title}>Chart Information</h3>
        <p style={styles.description}>
          Here you can provide some information about the chart. You can describe what the chart represents, 
          any important insights, and how to interpret the data. This text can be as long as necessary to convey 
          the necessary information.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background color
    borderRadius: '30px', // Curved corners
    padding: '20px', // Space inside the box
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional shadow effect
    width: '1400px', // Set a width for the box
    margin: '20px auto', // Center the box with margin
  },
  image: {
    width: '800px', // Set the image width
    height: '400px', // Maintain aspect ratio
    borderRadius: '8px', // Optional rounded corners for the image
    marginRight: '20px', // Space between the image and text
  },
  textContainer: {
    flex: 1, // Allow the text container to grow
  },
  title: {
    margin: 0, // Remove default margin
    fontSize: '18px', // Title font size
  },
  description: {
    marginTop: '5px', // Space between title and description
    fontSize: '14px', // Description font size
    color: '#333', // Text color
  },
};

export default InfoBox;
