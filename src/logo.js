import { useEffect } from "react";

const Logo = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Orbitron:wght@400..900&family=Solitreo&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <style>{`
        @keyframes beanThere_wave {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          30%       { transform: translateY(-7px) rotate(0.3deg); }
          60%       { transform: translateY(-3px) rotate(-0.2deg); }
        }
        @keyframes beanThere_shimmer {
          0%   { left: -80%; }
          60%  { left: 120%; }
          100% { left: 120%; }
        }
        @keyframes beanThere_steam {
          0%   { opacity: 0;   transform: translateY(0) scaleX(1); }
          25%  { opacity: 0.7; }
          100% { opacity: 0;   transform: translateY(-28px) scaleX(2); }
        }
        @keyframes beanThere_bpulse {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%      { transform: scale(1.2); opacity: 1;   }
        }
        @keyframes beanThere_tagfade {
          0%   { opacity: 0.5; transform: translateY(1px); }
          100% { opacity: 1;   transform: translateY(-1px); }
        }

        /*
          IMPORTANT: vw/vh don't work reliably inside Three.js <Html> portals.
          Use fixed px values here — Scene.jsx scales the whole group via
          useThree viewport.width so it stays proportional on all screens.
        */
        .beanthere-text {
          font-family: 'Lato', sans-serif;
          font-size: 52px;
          line-height: 1;
          white-space: nowrap;
          color: #F2C14E;
          text-shadow:
            1px  1px  0 #A07010,
            2px  2px  0 #A07010,
            3px  3px  0 #906008,
            4px  4px  0 #A47008,
            5px  5px  0 #421C00,
            6px  6px  0 #2C1000,
            7px  7px  0 #180600;
          animation: beanThere_wave 4s ease-in-out infinite;
          cursor: default;
          transition: text-shadow 0.4s, color 0.4s;
          user-select: none;
        }

        .beanthere-text:hover {
          color: #FFD966;
          text-shadow:
            1px  1px  0 #E0B040,
            2px  2px  0 #D0A030,
            3px  3px  0 #C09020,
            4px  4px  0 #B08015,
            5px  5px  0 #A07010,
            6px  6px  0 #906008,
            7px  7px  0 #764604,
            8px  8px  0 #5C3000,
            9px  9px  0 #421C00,
            10px 10px  0 #2C1000,
            11px 11px  0 #180600,
            14px 16px 24px rgba(0,0,0,0.9);
        }

        .beanthere-tagline {
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          color: #311f0c;
          letter-spacing: 2px;
          text-align: center;
          white-space: normal;
          word-break: break-word;
          max-width: 320px;
          width: 100%;
          display: block;
          animation: beanThere_tagfade 5s ease-in-out infinite alternate;
        }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 20px 14px",
        background: "transparent",
        borderRadius: "18px",
        width: "360px",
        boxSizing: "border-box",
      }}>

        {/* Steam wisps */}
        <div style={{ display: "flex", gap: "28px", height: "0px", alignItems: "flex-end", marginBottom: "2px" }}>
          {[
            { h: 16, delay: "0.0s" },
            { h: 22, delay: "0.5s" },
            { h: 14, delay: "1.0s" },
            { h: 20, delay: "0.3s" },
            { h: 18, delay: "0.8s" },
            { h: 13, delay: "1.3s" },
          ].map((s, i) => (
            <div key={i} style={{
              width: "2.5px",
              height: `${s.h}px`,
              borderRadius: "2px",
              background: "#C8863A",
              opacity: 0,
              animation: `beanThere_steam 2.4s ease-out infinite ${s.delay}`,
            }} />
          ))}
        </div>

        {/* Logo text with shimmer */}
        <div style={{ position: "relative", display: "inline-block", padding: "6px 16px 12px" }}>
          <div className="beanthere-text">Bean there</div>
          <div style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background: "linear-gradient(105deg, transparent 30%, rgba(255,240,160,0.18) 50%, transparent 70%)",
            animation: "beanThere_shimmer 4s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        </div>

        {/* Divider with beans */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "6px 0 6px", width: "100%", justifyContent: "center" }}>
          <div style={{ flex: 1, maxWidth: "70px", height: "1px", background: "linear-gradient(to right, transparent, #7B4A1A, transparent)" }} />
          {[0, 0.4, 0.8].map((delay, i) => (
            <div key={i} style={{
              width: "10px",
              height: "6px",
              background: "#7B4A1A",
              borderRadius: "50%",
              position: "relative",
              animation: `beanThere_bpulse 3s ease-in-out infinite ${delay}s`,
            }}>
              <div style={{
                position: "absolute",
                left: "50%",
                top: "15%",
                width: "1px",
                height: "70%",
                background: "#F2C14E",
                borderRadius: "1px",
                transform: "translateX(-50%) rotate(-8deg)",
                opacity: 0.7,
              }} />
            </div>
          ))}
          <div style={{ flex: 1, maxWidth: "70px", height: "1px", background: "linear-gradient(to right, transparent, #7B4A1A, transparent)" }} />
        </div>

        {/* Tagline */}
        <div className="beanthere-tagline">
          Estate grown traditional Coffee from Chikkamagaluru
        </div>
      </div>
    </>
  );
};

export default Logo;