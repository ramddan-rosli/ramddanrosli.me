"use client"

import React, { useState, useEffect } from 'react';

const MyPortfolio = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const lines = [
    "Hello.",
    "I'm Ramddan Rosli.",
    "I specialize in building modern and scalable applications.",
    "Looking to collaborate on exciting projects?",
    "Feel free to contact me.",
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const currentFullText = lines[currentLine];
    if (displayText === currentFullText) {
      const nextLineTimeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayText('');
        setIsTyping(true);
      }, 1000);
      return () => clearTimeout(nextLineTimeout);
    }

    if (isTyping) {
      const typeTimeout = setTimeout(() => {
        setDisplayText(prev => currentFullText.slice(0, prev.length + 1));
      }, Math.random() * 100 + 50);
      return () => clearTimeout(typeTimeout);
    }
  }, [currentLine, displayText, isTyping]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6 font-mono">
        {lines.slice(0, currentLine).map((line, index) => (
          <div key={index} className="text-2xl md:text-4xl">
            {line}
            {index === currentLine - 1 && line === lines[lines.length - 1] && (
              <span className="ml-1">{showCursor ? '▋' : ' '}</span>
            )}
          </div>
        ))}
        {currentLine < lines.length && (
          <div className="text-2xl md:text-4xl">
            {displayText}
            <span className="ml-1">{showCursor ? '▋' : ' '}</span>
          </div>
        )}

        {currentLine === lines.length && (
          <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center space-y-4 animate-fade-up opacity-0">
            <div className="flex space-x-8">
              <a href="https://github.com/ramddan-rosli" target="_blank" className="text-lg hover:text-gray-400 transition-colors">GITHUB</a>
              <a href="https://www.facebook.com/ramddan.rosli" target="_blank" className="text-lg hover:text-gray-400 transition-colors">FACEBOOK</a>
              <a href="https://wa.me/60195000070?text=Hi Ramddan" target="_blank" className="text-lg hover:text-gray-400 transition-colors">WHATSAPP</a>
            </div>
            {/* <div>
              <a href="https://github.com/ramddan-rosli" target="_blank" className="text-lg hover:text-gray-400 transition-colors">MY PORTFOLIO</a>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortfolio;