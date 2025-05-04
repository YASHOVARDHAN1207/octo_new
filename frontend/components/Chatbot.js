// components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from "../styles/aicomponent.module.css";

const Chatbot = ({ showChatbot }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const allowedKeywords = [
    'depression', 'stress', 'anxiety', 'mental health', 'well-being',
    'depressed', 'stressed', 'low', 'health', 'mind', 'suicide',
    'exercise', 'yoga', 'diet', 'nutrition', 'food', 'wellness', 'sleep'
  ];

  const generateAnswer = async () => {
    const isValidQuestion = allowedKeywords.some(keyword =>
      question.toLowerCase().includes(keyword)
    );

    if (!isValidQuestion) {
      setError("Please ask questions related to health, diet, yoga, or mental well-being.");
      setAnswer('');
      return;
    }

    setError('');
    setAnswer('loading...');
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyALZBwgtDCTEroLm53oa2lyG4h2j0fDBes",
        {
          contents: [{ parts: [{ text: question }] }]
        }
      );

      const textResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(textResponse || "No answer found.");
    } catch (err) {
      setAnswer("Error fetching the answer. Please try again later.");
      console.error("Error fetching response:", err);
    }
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    setError('');
  };

  if (!showChatbot) return null;

  return (
    <div className={styles.aicomponentContainer}>
      <h2>Ask Your Wellness Question</h2>
      <div className={styles.inputContainer}>
        <textarea
          value={question}
          onChange={handleInputChange}
          placeholder="Ask about yoga, diet, stress, or well-being..."
        />
        <button onClick={generateAnswer} disabled={!question}>
          {answer === 'loading...' ? 'Loading...' : 'Send'}
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.responseContainer}>
        {answer === 'loading...' ? (
          <div className={styles.loadingText}>Loading...</div>
        ) : (
          <div className={styles.responseText}>{answer}</div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
