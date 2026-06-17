import { useState, useRef, useEffect } from 'react';
import chatConfig from '../chatConfig.js';

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let keyCounter = 0;

  function applyInline(str) {
    const parts = [];
    const regex = /(\*\*(.+?)\*\*|\*(?!\*)(.+?)(?<!\*)\*)/g;
    let last = 0;
    let match;
    let k = 0;
    while ((match = regex.exec(str)) !== null) {
      if (match.index > last) {
        parts.push(str.slice(last, match.index));
      }
      if (match[0].startsWith('**')) {
        parts.push(<strong key={k++}>{match[2]}</strong>);
      } else {
        parts.push(<em key={k++}>{match[3]}</em>);
      }
      last = match.index + match[0].length;
    }
    if (last < str.length) {
      parts.push(str.slice(last));
    }
    return parts;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(
          <li key={i}>{applyInline(lines[i].slice(2))}</li>
        );
        i++;
      }
      elements.push(<ul key={keyCounter++}>{items}</ul>);
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    elements.push(<p key={keyCounter++}>{applyInline(line)}</p>);
    i++;
  }

  return elements;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const greeted = useRef(false);
  const messagesBottomRef = useRef(null);

  useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;

    const timer = setTimeout(() => {
      setOpen(true);
      setDisplayMessages([{ role: 'assistant', content: chatConfig.greeting }]);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages, loading]);

  async function handleSend() {
    if (loading || !input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setDisplayMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.type === 'lead_captured') {
        setDisplayMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setLeadCaptured(true);
      } else if (data.type === 'message') {
        const assistantMsg = { role: 'assistant', content: data.reply };
        setMessages(prev => [...prev, assistantMsg]);
        setDisplayMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err) {
      setError('Something went wrong. Please call us at (801) 598-9197.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : chatConfig.buttonLabel}
      >
        {open ? '✕' : chatConfig.buttonIcon}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label={`Chat with ${chatConfig.businessName}`}>
          <div className="chat-header">
            <span className="chat-header-name">{chatConfig.businessName}</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className="chat-messages">
            {displayMessages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${msg.role}`}>
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble-assistant chat-typing">
                <span /><span /><span />
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
            <div ref={messagesBottomRef} />
          </div>

          <div className="chat-input-wrap">
            <textarea
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
