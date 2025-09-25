const OrdemLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Símbolo da Cruz */}
      <div className="relative mb-4">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-ouro-500"
        >
          {/* Cruz principal */}
          <path
            d="M30 5 L30 55 M5 30 L55 30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Decorações nos cantos */}
          <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="30" cy="12" r="3" fill="currentColor" />
          <circle cx="30" cy="48" r="3" fill="currentColor" />
          <circle cx="12" cy="30" r="3" fill="currentColor" />
          <circle cx="48" cy="30" r="3" fill="currentColor" />
          {/* Diamantes nos cantos externos */}
          <path d="M30 2 L32 5 L30 8 L28 5 Z" fill="currentColor" />
          <path d="M30 52 L32 55 L30 58 L28 55 Z" fill="currentColor" />
          <path d="M2 30 L5 28 L8 30 L5 32 Z" fill="currentColor" />
          <path d="M52 30 L55 28 L58 30 L55 32 Z" fill="currentColor" />
        </svg>
      </div>
      
      {/* Texto do Logo */}
      <div className="brand-ouro-500">
        <div className="body-s mb-1">A</div>
        <div className="title-m">ORDEM</div>
        <div className="label-s text-muted mb-1">DOS</div>
        <div className="title-m">QUATRO</div>
      </div>
    </div>
  );
};

export default OrdemLogo;