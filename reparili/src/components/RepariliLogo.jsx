const RepariliLogo = () => (
  <svg
    viewBox="0 0 300 100"
    width="100%"
    height="80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f9f9f9" />
        <stop offset="100%" stopColor="#e6e6e6" />
      </linearGradient>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a4b8c" />
        <stop offset="100%" stopColor="#2A5CAA" />
      </linearGradient>
      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#FF8C42" />
      </linearGradient>
    </defs>
    
    <rect width="300" height="100" fill="url(#bgGradient)" rx="8" />
    <g transform="translate(20, 15)">
      <path d="M30,50 L15,35 L15,15 L45,15 L45,35 Z" fill="url(#blueGradient)" stroke="#1a3a6a" strokeWidth="1" />
      <path d="M15,35 L30,20 L45,35 Z" fill="url(#blueGradient)" stroke="#1a3a6a" strokeWidth="1" />
      <rect x="22" y="25" width="8" height="8" fill="#FFD166" rx="1" />
      <path d="M55,30 L65,20 L70,25 L60,35 Z" fill="url(#orangeGradient)" stroke="#cc4b22" strokeWidth="1" />
      <circle cx="60" cy="50" r="5" fill="url(#orangeGradient)" stroke="#cc4b22" strokeWidth="1" />
      <rect x="58" y="45" width="4" height="15" fill="url(#orangeGradient)" stroke="#cc4b22" strokeWidth="1" />
    </g>
    <text x="90" y="45" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="32" fontWeight="700" fill="#1a4b8c">
      Reparili
    </text>
    <text x="90" y="65" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="18" fontWeight="500" fill="#555">
      Building Restoration
    </text>
    <text x="90" y="85" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="14" fontWeight="400" fill="#777" fontStyle="italic">
      Repair • Renovate • Rebuild
    </text>
  </svg>
);

export default RepariliLogo;