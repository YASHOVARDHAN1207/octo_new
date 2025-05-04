import React, { useState } from 'react';
import Chatbot from '../components/Chatbot';

export default function Layout() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div>
      <aside>
        <button onClick={() => setShowChatbot(!showChatbot)}>
          Toggle Chatbot
        </button>
      </aside>
      <main>
        <Chatbot showChatbot={showChatbot} />
      </main>
    </div>
  );
}
