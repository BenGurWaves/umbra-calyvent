import { useState, useEffect, useRef } from 'react'
import './App.css'

const generateShadowString = (layers, alpha, blur, offset) => {
  const shadowArray = [];
  
  for (let i = 1; i <= layers; i++) {
    const progress = i / layers;
    const layerOffset = (Math.pow(progress, 2.5) * offset).toFixed(1);
    const layerBlur = (Math.pow(progress, 2.0) * blur).toFixed(1);
    const layerAlpha = (alpha * (Math.pow(1 - progress, 1.5))).toFixed(3);
    
    shadowArray.push(`0px ${layerOffset}px ${layerBlur}px rgba(0, 0, 0, ${layerAlpha})`);
  }
  
  return shadowArray.join(', ');
};

function App() {
  const [layers, setLayers] = useState(5);
  const [alpha, setAlpha] = useState(0.15);
  const [blur, setBlur] = useState(80);
  const [offset, setOffset] = useState(40);
  const [shadowString, setShadowString] = useState('');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    setShadowString(generateShadowString(layers, alpha, blur, offset));
  }, [layers, alpha, blur, offset]);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
        cursor.classList.add('custom-cursor--hover');
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove('custom-cursor--hover');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'css') {
        setCopiedCss(true);
        setTimeout(() => setCopiedCss(false), 1500);
      } else if (type === 'tailwind') {
        setCopiedTailwind(true);
        setTimeout(() => setCopiedTailwind(false), 1500);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="app">
      <div className="grain-overlay"></div>
      <div ref={cursorRef} className="custom-cursor"></div>
      
      {/* Traffic Anchors */}
      <a href="https://velocity.calyvent.com" target="_blank" rel="noopener noreferrer" className="traffic-anchor traffic-anchor--left">
        <span className="traffic-anchor__text">VELOCITY</span>
      </a>
      <a href="https://calyvent.com" target="_blank" rel="noopener noreferrer" className="traffic-anchor traffic-anchor--right">
        <span className="traffic-anchor__text">CALYVENT</span>
      </a>

      {/* Logo */}
      <div className="logo">
        <span className="logo__text">UMBRA</span>
      </div>

      {/* Macro-Shadow Block */}
      <div className="shadow-block" style={{ boxShadow: shadowString }}></div>

      {/* Perimeter Control Deck */}
      <div className="control-deck">
        {/* Top Left - Layers */}
        <div className="control control--top-left">
          <label className="control__label">LAYERS</label>
          <input
            type="range"
            min="3"
            max="6"
            value={layers}
            onChange={(e) => setLayers(Number(e.target.value))}
            className="control__slider"
          />
          <span className="control__value">{layers}</span>
        </div>

        {/* Top Right - Alpha */}
        <div className="control control--top-right">
          <label className="control__label">OPACITY</label>
          <input
            type="range"
            min="0.01"
            max="1.0"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="control__slider"
          />
          <span className="control__value">{alpha.toFixed(2)}</span>
        </div>

        {/* Bottom Left - Blur */}
        <div className="control control--bottom-left">
          <label className="control__label">BLUR</label>
          <input
            type="range"
            min="0"
            max="200"
            value={blur}
            onChange={(e) => setBlur(Number(e.target.value))}
            className="control__slider"
          />
          <span className="control__value">{blur}</span>
        </div>

        {/* Bottom Right - Offset */}
        <div className="control control--bottom-right">
          <label className="control__label">OFFSET</label>
          <input
            type="range"
            min="0"
            max="200"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="control__slider"
          />
          <span className="control__value">{offset}</span>
        </div>
      </div>

      {/* Output Panel */}
      <div className="output-panel">
        <div className="output-section">
          <label className="output__label">CSS</label>
          <div className="output__code">
            <code>box-shadow: {shadowString};</code>
          </div>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(`box-shadow: ${shadowString};`, 'css')}
          >
            {copiedCss ? 'COPIED' : 'COPY'}
          </button>
        </div>
        <div className="output-section">
          <label className="output__label">TAILWIND</label>
          <div className="output__code">
            <code>shadow-[{shadowString}]</code>
          </div>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(`shadow-[${shadowString}]`, 'tailwind')}
          >
            {copiedTailwind ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </div>

      {/* Legal Links */}
      <div className="legal-links">
        <a href="/privacy.html" className="legal-link">Privacy</a>
        <a href="/terms.html" className="legal-link">Terms</a>
      </div>
    </div>
  );
}

export default App
