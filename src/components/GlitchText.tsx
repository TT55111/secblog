interface GlitchTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'span';
  className?: string;
}

export default function GlitchText({ text, tag: Tag = 'h1', className = '' }: GlitchTextProps) {
  return (
    <Tag className={`glitch-text ${className}`} data-text={text}>
      {text}
      <style>{`
        .glitch-text {
          position: relative;
          color: #00ff41;
          text-shadow: 0 0 10px #00ff41, 0 0 40px #00ff4133, 0 0 80px #00ff4133;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch-text::before {
          color: #00f0ff;
          animation: glitch-1 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        .glitch-text::after {
          color: #ff0040;
          animation: glitch-2 3s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        @keyframes glitch-1 {
          0%, 90%, 100% { opacity: 0; transform: translate(0); }
          92% { opacity: 0.8; transform: translate(-3px, -1px); }
          94% { opacity: 0; }
          96% { opacity: 0.6; transform: translate(2px, 1px); }
          98% { opacity: 0; }
        }
        @keyframes glitch-2 {
          0%, 88%, 100% { opacity: 0; transform: translate(0); }
          90% { opacity: 0.8; transform: translate(3px, 1px); }
          93% { opacity: 0; }
          95% { opacity: 0.6; transform: translate(-2px, -1px); }
          97% { opacity: 0; }
        }
      `}</style>
    </Tag>
  );
}
