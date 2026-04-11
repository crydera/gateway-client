import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { isInvoiceFailed, isInvoicePaid, isInvoicePending, type InvoiceStatus } from '../types';

interface Props {
  status: InvoiceStatus;
}

export function CrabRunner({ status }: Props) {

  const [netSeed, setNetSeed] = useState(0);
  useEffect(() => {
    if (isInvoiceFailed(status)) setNetSeed((s) => s + 1);
  }, [status]);

  const net = useMemo(() => {

    const sides: Array<-1 | 0 | 1> = [-1, 0, 1];
    const side = sides[Math.floor(Math.random() * sides.length)];

    const offsetX = side * (45 + Math.random() * 25);

    const rotate = side * (15 + Math.random() * 30);
    return { offsetX, rotate };

  }, [netSeed]);

  const modClass =
    isInvoicePending(status) ? 'runner--pending' :
    isInvoicePaid(status) ? 'runner--success' :
    'runner--fail';

  return (
    <div className={`runner ${modClass}`} aria-hidden="true">
      <div className="runner__track" />

      <div className="runner__scene">
        {}
        <div className="runner__word runner__word--success">SUCCESS</div>
        <div className="runner__word runner__word--fail">FAILED</div>

        {}
        <div className="runner__crab">
          <CrabSvg />
        </div>

        {}
        <div
          className="runner__net"
          style={
            {
              '--net-offset-x': `${net.offsetX}vw`,
              '--net-rotate': `${net.rotate}deg`,
            } as CSSProperties
          }
        >
          <NetSvg />
        </div>
      </div>
    </div>
  );
}

function CrabSvg() {
  return (
    <svg
      viewBox="0 0 200 130"
      width="200"
      height="130"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="crab-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BD9A3" />
          <stop offset="55%" stopColor="#2CB989" />
          <stop offset="100%" stopColor="#176B50" />
        </linearGradient>
        <radialGradient id="crab-shell-shine" cx="0.5" cy="0.25" r="0.7">
          <stop offset="0%" stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="crab-claw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ED39C" />
          <stop offset="100%" stopColor="#176B50" />
        </linearGradient>
        <radialGradient id="crab-claw-shine" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="crab-leg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3CC495" />
          <stop offset="100%" stopColor="#155A43" />
        </linearGradient>
        <linearGradient id="crab-scroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFD9A6" />
          <stop offset="55%" stopColor="#D4B574" />
          <stop offset="100%" stopColor="#A88A52" />
        </linearGradient>
      </defs>

      {

}

      {}
      <g className="crab__legs crab__legs--back">
        {}
        <g className="crab__leg-grp crab__leg-grp--l3">
          <path
            className="crab__leg-seg"
            d="M62 64 Q44 70 34 84 Q24 100 22 116"
            stroke="url(#crab-leg)"
          />
          <circle cx="34" cy="84" r="2.4" className="crab__leg-joint" />
          <circle cx="22" cy="116" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--l4">
          <path
            className="crab__leg-seg"
            d="M68 70 Q56 86 50 102 Q46 116 52 124"
            stroke="url(#crab-leg)"
          />
          <circle cx="50" cy="102" r="2.2" className="crab__leg-joint" />
          <circle cx="52" cy="124" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--r3">
          <path
            className="crab__leg-seg"
            d="M138 64 Q156 70 166 84 Q176 100 178 116"
            stroke="url(#crab-leg)"
          />
          <circle cx="166" cy="84" r="2.4" className="crab__leg-joint" />
          <circle cx="178" cy="116" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--r4">
          <path
            className="crab__leg-seg"
            d="M132 70 Q144 86 150 102 Q154 116 148 124"
            stroke="url(#crab-leg)"
          />
          <circle cx="150" cy="102" r="2.2" className="crab__leg-joint" />
          <circle cx="148" cy="124" r="1.6" className="crab__leg-tip" />
        </g>
      </g>

      {}
      <g className="crab__body">
        {}
        <path
          d="M62 50
             C 56 36, 78 28, 100 28
             C 122 28, 144 36, 138 50
             C 148 60, 146 74, 132 80
             C 116 88, 84 88, 68 80
             C 54 74, 52 60, 62 50 Z"
          fill="url(#crab-shell)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        {}
        <ellipse cx="100" cy="42" rx="34" ry="9" fill="url(#crab-shell-shine)" />
        {}
        <g className="crab__spots" opacity="0.4">
          <circle cx="78" cy="50" r="2.2" fill="#0E2A1F" />
          <circle cx="122" cy="50" r="2.2" fill="#0E2A1F" />
          <circle cx="100" cy="58" r="2.6" fill="#0E2A1F" />
          <circle cx="74" cy="68" r="1.8" fill="#0E2A1F" />
          <circle cx="126" cy="68" r="1.8" fill="#0E2A1F" />
          <circle cx="92" cy="76" r="1.4" fill="#0E2A1F" />
          <circle cx="108" cy="76" r="1.4" fill="#0E2A1F" />
        </g>
        {}
        <g className="crab__logo" transform="translate(100 64)">
          <path
            d="M-9 -8 L0 -11 L9 -8 V3 Q9 9 0 12 Q-9 9 -9 3 Z"
            fill="rgba(11, 20, 16, 0.45)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.7"
          />
          <path
            d="M5 -4 H-2 Q-5 -4 -5 -1 V5 Q-5 8 -2 8 H1 Q5 8 5 5 V2 H0"
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {}
      <g className="crab__eyes">
        {}
        <path
          d="M86 36 Q84 26 82 16"
          stroke="#1F8766"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M114 36 Q116 26 118 16"
          stroke="#1F8766"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        {}
        <g className="crab__eye crab__eye--left">
          <circle cx="82" cy="14" r="4.2" fill="#E9E2CF" stroke="#0E1A14" strokeWidth="0.8" />
          <circle cx="82" cy="14" r="1.9" fill="#0B1410" />
          <circle cx="82.7" cy="13.2" r="0.8" fill="#E9E2CF" />
        </g>
        <g className="crab__eye crab__eye--right">
          <circle cx="118" cy="14" r="4.2" fill="#E9E2CF" stroke="#0E1A14" strokeWidth="0.8" />
          <circle cx="118" cy="14" r="1.9" fill="#0B1410" />
          <circle cx="118.7" cy="13.2" r="0.8" fill="#E9E2CF" />
        </g>
        {}
        <path
          d="M93 62 Q100 66 107 62"
          stroke="#0E1A14"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {}
      <g className="crab__legs crab__legs--front">
        {}
        <g className="crab__leg-grp crab__leg-grp--l1">
          <path
            className="crab__leg-seg"
            d="M64 56 Q44 56 30 64 Q14 74 10 90"
            stroke="url(#crab-leg)"
          />
          <circle cx="30" cy="64" r="2.4" className="crab__leg-joint" />
          <circle cx="10" cy="90" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--l2">
          <path
            className="crab__leg-seg"
            d="M62 60 Q42 64 28 74 Q14 86 14 104"
            stroke="url(#crab-leg)"
          />
          <circle cx="28" cy="74" r="2.2" className="crab__leg-joint" />
          <circle cx="14" cy="104" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--r1">
          <path
            className="crab__leg-seg"
            d="M136 56 Q156 56 170 64 Q186 74 190 90"
            stroke="url(#crab-leg)"
          />
          <circle cx="170" cy="64" r="2.4" className="crab__leg-joint" />
          <circle cx="190" cy="90" r="1.6" className="crab__leg-tip" />
        </g>
        {}
        <g className="crab__leg-grp crab__leg-grp--r2">
          <path
            className="crab__leg-seg"
            d="M138 60 Q158 64 172 74 Q186 86 186 104"
            stroke="url(#crab-leg)"
          />
          <circle cx="172" cy="74" r="2.2" className="crab__leg-joint" />
          <circle cx="186" cy="104" r="1.6" className="crab__leg-tip" />
        </g>
      </g>

      {}
      <g className="crab__claw crab__claw--left">
        {}
        <path
          d="M68 46 Q56 36, 44 26"
          stroke="url(#crab-claw)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        {}
        <path
          d="M44 26 Q36 18, 32 12"
          stroke="url(#crab-claw)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {}
        <circle cx="44" cy="26" r="3.4" fill="#176B50" stroke="#0E1A14" strokeWidth="0.6" strokeOpacity="0.4" />
        {}
        <path
          d="M28 4
             C 10 2, 0 14, 4 28
             C 8 40, 24 42, 34 32
             C 44 22, 42 10, 36 6
             C 33 4, 30 3, 28 4 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        {}
        <ellipse cx="14" cy="14" rx="8" ry="4" fill="url(#crab-claw-shine)" />
        {}
        <path
          d="M30 6
             Q 44 4, 50 12
             Q 54 18, 48 20
             Q 42 16, 36 14 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        {}
        <path
          d="M34 32
             Q 46 30, 50 22
             Q 52 18, 48 20
             Q 42 24, 36 28 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        {}
        <path
          d="M40 14 Q46 18 40 22"
          stroke="#0B1410"
          strokeWidth="1.5"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
        {}
        <path
          d="M42 14 L44 16 L42 18 L44 20"
          stroke="#0B1410"
          strokeWidth="0.6"
          fill="none"
          opacity="0.4"
        />
      </g>

      {}
      <g className="crab__claw crab__claw--right">
        <path
          d="M132 46 Q144 36, 156 26"
          stroke="url(#crab-claw)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M156 26 Q164 18, 168 12"
          stroke="url(#crab-claw)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="156" cy="26" r="3.4" fill="#176B50" stroke="#0E1A14" strokeWidth="0.6" strokeOpacity="0.4" />
        <path
          d="M172 4
             C 190 2, 200 14, 196 28
             C 192 40, 176 42, 166 32
             C 156 22, 158 10, 164 6
             C 167 4, 170 3, 172 4 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        <ellipse cx="186" cy="14" rx="8" ry="4" fill="url(#crab-claw-shine)" />
        <path
          d="M170 6
             Q 156 4, 150 12
             Q 146 18, 152 20
             Q 158 16, 164 14 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        <path
          d="M166 32
             Q 154 30, 150 22
             Q 148 18, 152 20
             Q 158 24, 164 28 Z"
          fill="url(#crab-claw)"
          stroke="rgba(11,20,16,0.45)"
          strokeWidth="0.8"
        />
        <path
          d="M160 14 Q154 18 160 22"
          stroke="#0B1410"
          strokeWidth="1.5"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M158 14 L156 16 L158 18 L156 20"
          stroke="#0B1410"
          strokeWidth="0.6"
          fill="none"
          opacity="0.4"
        />

        {

}
        <g className="crab__scroll">
          {}
          <rect
            x="124"
            y="11"
            width="32"
            height="14"
            rx="7"
            fill="url(#crab-scroll)"
            stroke="#7A5C2E"
            strokeWidth="0.7"
          />
          {}
          <path d="M127 14 H153" stroke="#A88A52" strokeWidth="0.5" opacity="0.55" />
          <path d="M127 18 H153" stroke="#A88A52" strokeWidth="0.5" opacity="0.55" />
          <path d="M127 22 H153" stroke="#A88A52" strokeWidth="0.5" opacity="0.55" />
          {}
          <ellipse
            cx="124"
            cy="18"
            rx="2.4"
            ry="7"
            fill="#A88A52"
            stroke="#7A5C2E"
            strokeWidth="0.5"
          />
          <ellipse
            cx="156"
            cy="18"
            rx="2.4"
            ry="7"
            fill="#A88A52"
            stroke="#7A5C2E"
            strokeWidth="0.5"
          />
          {}
          <ellipse cx="124" cy="18" rx="0.9" ry="4" fill="#5C401E" />
          <ellipse cx="156" cy="18" rx="0.9" ry="4" fill="#5C401E" />
          {}
          <path
            d="M124 22 Q121 27 122 31"
            stroke="#5C401E"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
          {}
          <circle cx="122" cy="32" r="3.6" fill="#A8443A" stroke="#5C1F15" strokeWidth="0.6" />
          <circle cx="122" cy="32" r="2.3" fill="#7A2D24" />
          <path
            d="M120.6 30.8 L123.4 33.2 M120.6 33.2 L123.4 30.8"
            stroke="#3D1108"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          {}
          <circle cx="121" cy="31" r="0.5" fill="#E89489" />
        </g>
      </g>
    </svg>
  );
}

function NetSvg() {
  return (
    <svg
      viewBox="0 0 200 140"
      width="200"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="net-mesh"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="14" stroke="#F2EDD9" strokeWidth="1.4" opacity="0.85" />
          <line x1="0" y1="0" x2="14" y2="0" stroke="#F2EDD9" strokeWidth="1.4" opacity="0.85" />
        </pattern>
      </defs>

      {}
      <path
        d="M14 14
           Q60 4 100 6
           Q140 4 186 14
           Q190 70 186 126
           Q140 136 100 134
           Q60 136 14 126
           Q10 70 14 14 Z"
        fill="url(#net-mesh)"
        stroke="#F2EDD9"
        strokeWidth="1.6"
        opacity="0.92"
      />

      {}
      <circle cx="14" cy="14" r="3" fill="#B8A36A" />
      <circle cx="186" cy="14" r="3" fill="#B8A36A" />
      <circle cx="14" cy="126" r="3" fill="#B8A36A" />
      <circle cx="186" cy="126" r="3" fill="#B8A36A" />

      {}
      <circle cx="60" cy="134" r="2" fill="#8B8675" />
      <circle cx="100" cy="135" r="2" fill="#8B8675" />
      <circle cx="140" cy="134" r="2" fill="#8B8675" />
    </svg>
  );
}
