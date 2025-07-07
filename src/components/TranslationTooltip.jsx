import React, { useState, useEffect, useRef } from 'react';

const TranslationTooltip = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tooltipRef = useRef(null);

  // Sample translations for common words/phrases (in a real app, this would come from an API)
  const translations = {
    'home': 'Zuhause',
    'about us': 'Über uns',
    'languages': 'Sprachen',
    'pricing': 'Preise',
    'reviews': 'Bewertungen',
    'contact': 'Kontakt',
    'login': 'Anmelden',
    'signup': 'Registrieren',
    'get started': 'Loslegen',
    'founder': 'Gründer',
    'ceo': 'Geschäftsführer',
    'team': 'Team',
    'mission': 'Mission',
    'vision': 'Vision',
    'values': 'Werte',
    'impact': 'Auswirkung',
    'students': 'Studenten',
    'tutors': 'Tutoren',
    'courses': 'Kurse',
    'learning': 'Lernen',
    'education': 'Bildung',
    'community': 'Gemeinschaft',
    'connect': 'Verbinden',
    'message': 'Nachricht',
    'personal': 'Persönlich',
    'journey': 'Reise',
    'passion': 'Leidenschaft',
    'transform': 'Verwandeln',
    'worldwide': 'Weltweit',
    'opportunities': 'Möglichkeiten',
    'friendships': 'Freundschaften',
    'empower': 'Ermächtigen',
    'grow': 'Wachsen',
    'expand': 'Erweitern',
    'global': 'Global',
    'family': 'Familie',
    'barriers': 'Barrieren',
    'dissolve': 'Auflösen',
    'meaningful': 'Bedeutungsvoll',
    'connections': 'Verbindungen',
    'flourish': 'Gedeihen',
    'thank you': 'Danke',
    'part': 'Teil',
    'lead developer': 'Lead-Entwickler',
    'ui/ux designer': 'UI/UX-Designer',
    'backend engineer': 'Backend-Ingenieur',
    'community manager': 'Community-Manager',
    'passionate': 'Leidenschaftlich',
    'building': 'Bauen',
    'scalable': 'Skalierbar',
    'web apps': 'Web-Apps',
    'leading': 'Führen',
    'dev team': 'Entwicklungsteam',
    'smile': 'Lächeln',
    'designs': 'Designs',
    'empathy': 'Empathie',
    'creativity': 'Kreativität',
    'user journey': 'Benutzerreise',
    'delightful': 'Entzückend',
    'apis': 'APIs',
    'databases': 'Datenbanken',
    'fast': 'Schnell',
    'reliably': 'Zuverlässig',
    'connecting': 'Verbinden',
    'learners': 'Lernende',
    'thrive': 'Gedeihen',
    'excellence': 'Exzellenz',
    'instruction': 'Unterricht',
    'methodologies': 'Methoden',
    'expert': 'Experte',
    'accessibility': 'Zugänglichkeit',
    'available': 'Verfügbar',
    'worldwide': 'Weltweit',
    'regardless': 'Unabhängig',
    'location': 'Standort',
    'background': 'Hintergrund',
    'cultural': 'Kulturell',
    'exchanges': 'Austausch',
    'technology': 'Technologie',
    'immersive': 'Immersiv',
    'personalized': 'Personalisierte',
    'experiences': 'Erfahrungen'
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) return;

      // Update position with offset to prevent flickering
      const offsetX = 15;
      const offsetY = 10;
      
      setPosition({
        x: e.clientX + offsetX,
        y: e.clientY + offsetY
      });
    };

    const handleMouseOver = (e) => {
      if (!isEnabled) return;
      
      const text = e.target.textContent?.trim().toLowerCase();
      
      if (text && text.length > 2 && text.length < 50) {
        // Check if we have a translation
        const foundTranslation = translations[text] || 
                                Object.keys(translations).find(key => 
                                  text.includes(key) || key.includes(text)
                                );
        
        if (foundTranslation) {
          setIsLoading(true);
          // Simulate API call delay
          setTimeout(() => {
            setTranslation(translations[foundTranslation] || foundTranslation);
            setIsLoading(false);
            setIsVisible(true);
          }, 100);
        }
      }
    };

    const handleMouseOut = () => {
      setIsVisible(false);
      setTranslation('');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible, translations]);

  // Prevent tooltip from going off-screen
  useEffect(() => {
    if (tooltipRef.current && isVisible) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX = position.x;
      let newY = position.y;

      // Adjust horizontal position if tooltip goes off-screen
      if (rect.right > windowWidth) {
        newX = position.x - rect.width - 30;
      }

      // Adjust vertical position if tooltip goes off-screen
      if (rect.bottom > windowHeight) {
        newY = position.y - rect.height - 20;
      }

      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [position, isVisible]);

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            isEnabled 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-400 hover:bg-gray-500 text-white'
          }`}
          title={isEnabled ? 'Disable German Translation' : 'Enable German Translation'}
        >
          <div className="flex items-center gap-2">
            <img 
              src="/german-flag.png" 
              alt="German Flag" 
              className="w-4 h-3 object-cover rounded-sm"
            />
            <span className="text-xs font-medium">
              {isEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
        </button>
      </div>

      {/* Translation Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(0, 0)'
          }}
        >
      <div className="bg-blue-900 text-white px-3 py-2 rounded-lg shadow-lg border border-blue-700 max-w-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="flex items-center gap-1">
            <img 
              src="/german-flag.png" 
              alt="German Flag" 
              className="w-3 h-2 object-cover rounded-sm"
            />
            <span className="text-xs font-medium text-blue-200">German</span>
          </div>
        </div>
        <div className="mt-1">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-300 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Translating...</span>
            </div>
          ) : (
            <span className="text-sm font-medium">{translation}</span>
          )}
        </div>
        <div className="absolute -top-1 left-3 w-2 h-2 bg-blue-900 transform rotate-45 border-l border-t border-blue-700"></div>
      </div>
        </div>
      )}
    </>
  );
};

export default TranslationTooltip; 