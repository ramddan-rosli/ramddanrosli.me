"use client"

import React, { useState, useEffect } from 'react';

const MyPortfolio = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [displayLinks, setDisplayLinks] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingLinks, setIsTypingLinks] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const lines = [
    "Hello.",
    "I'm Ramddan Rosli.",
    "I specialize in building modern and scalable applications.",
    "Looking to collaborate on exciting projects?",
    "Feel free to contact me via",
    "Check out my work on",
  ];

  const linkTexts = {
    4: " WhatsApp, Facebook, or Email",
    5: " Portfolio",
  };

  const linkElements = {
    4: {
      "WhatsApp": "https://wa.me/60195000070?text=Hi Ramddan",
      "Facebook": "https://www.facebook.com/ramddan.rosli",
      "Email": "mailto:ramddan@icloud.com"
    },
    5: {
      "Portfolio": "/portfolio",
    }
  };

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
      if (linkTexts[currentLine]) {
        setIsTypingLinks(true);
        setIsTyping(false);
      } else {
        const nextLineTimeout = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setDisplayText('');
          setDisplayLinks('');
          setIsTyping(true);
        }, 1000);
        return () => clearTimeout(nextLineTimeout);
      }
    }

    if (isTyping) {
      const typeTimeout = setTimeout(() => {
        setDisplayText(prev => currentFullText.slice(0, prev.length + 1));
      }, Math.random() * 100 + 50);
      return () => clearTimeout(typeTimeout);
    }
  }, [currentLine, displayText, isTyping]);

  useEffect(() => {
    if (!isTypingLinks) return;

    const currentLinksText = linkTexts[currentLine];
    if (!currentLinksText) return;

    if (displayLinks === currentLinksText) {
      const nextLineTimeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayText('');
        setDisplayLinks('');
        setIsTyping(true);
        setIsTypingLinks(false);
      }, 1000);
      return () => clearTimeout(nextLineTimeout);
    }

    const typeTimeout = setTimeout(() => {
      setDisplayLinks(prev => currentLinksText.slice(0, prev.length + 1));
    }, Math.random() * 100 + 50);
    return () => clearTimeout(typeTimeout);
  }, [currentLine, displayLinks, isTypingLinks]);

  const renderLinks = (text, elements) => {
    if (!elements) return text;
    let words = text.split(' ');
    return words.map((word, i) => {
      const cleanWord = word.replace(/[,.]|(\bor\b)|(\band\b)/g, '').trim();
      if (elements[cleanWord]) {
        return (
          <React.Fragment key={i}>
            <a 
              href={elements[cleanWord]} 
              target="_blank"
              className="text-2xl md:text-4xl italic text-blue-300 hover:text-blue-700 transition-colors"
            >
              {cleanWord}
            </a>
            {word.includes(',') ? ', ' : '. '}
            {word.includes('and') ? 'and ' : ''}
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6 font-mono">
        {lines.slice(0, currentLine).map((line, index) => (
          <div key={index} className="text-2xl md:text-4xl">
            {line}
            {linkTexts[index] && renderLinks(linkTexts[index], linkElements[index])}
          </div>
        ))}
        <div className="text-2xl md:text-4xl">
          {displayText}
          {isTypingLinks && renderLinks(displayLinks, linkElements[currentLine])}
          <span className="ml-1">{showCursor ? '▋' : ' '}</span>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;