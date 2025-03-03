import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles'; // Correct path for styles import

// Main App Component
const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string, message: string, timestamp: string }[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString();

      // Add user message to chat history
      setChatHistory(prevHistory => [...prevHistory, { sender: 'You', message, timestamp }]);

      // Clear the input field and start loading
      setMessage('');
      setIsBotTyping(true);
      setIsLoading(true);

      try {
        // Send the message to the Rasa bot
        const response = await fetch('http://192.168.178.30:5005/webhooks/rest/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        setIsBotTyping(false);
        setIsLoading(false);

        // Add bot response to chat history
        if (data.length > 0 && data[0].text) {
          setChatHistory(prevHistory => [
            ...prevHistory, 
            { sender: 'Salu', message: data[0].text, timestamp: new Date().toLocaleTimeString() }
          ]);
        }
      } catch (error) {
        setChatHistory(prevHistory => [...prevHistory, { sender: 'Error', message: 'Could not reach server', timestamp }]);
        setIsBotTyping(false);
        setIsLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Salu Nutri Care</Text>

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View
              key={index}
              style={chat.sender === 'You' ? styles.userMessageContainer : styles.botMessageContainer}
            >
              <Ionicons
                name={chat.sender === 'You' ? 'person-circle-outline' : 'chatbubble-outline'} // Correct icon name
                size={24}
                color={chat.sender === 'You' ? '#007AFF' : '#34C759'}
              />
              <View style={styles.messageWrapper}>
                <Text style={chat.sender === 'You' ? styles.userMessage : styles.botMessage}>
                  {chat.message}
                </Text>
                <Text style={styles.timestamp}>{chat.timestamp}</Text>
              </View>
            </View>
          ))}
          {isBotTyping && <Text style={styles.typingIndicator}>Salu is typing...</Text>}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          editable={!isLoading}
        />
        <Button title="Send" onPress={handleSendMessage} disabled={isLoading} />
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearChat}>
        <Text style={styles.clearButtonText}>Clear Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
