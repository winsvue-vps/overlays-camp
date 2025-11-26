export const TimerBG = () => {
  return (
    <clipPath id="timer-bg" clipPathUnits={"objectBoundingBox"}>
      
    </clipPath>
  );
}


export const ActionsRect = ({ width = 506, height = 37, fill = "#041332", className }: { width?: number; height?: number; stroke?: string; fill?: string; className?: string }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 506 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <foreignObject x="-41.5197" y="-41.5197" width="588.984" height="119.984">
        <div
          style={{
            backdropFilter: "blur(20.76px)",
            WebkitBackdropFilter: "blur(20.76px)",
            clipPath: "url(#bgblur_clip)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      <path
        d="M505.459 29.4333L505.294 29.5788L501.447 32.9586L501.446 32.9577L497.778 36.3307L497.638 36.4586H9.76245L9.62769 36.3463L4.98901 32.484L4.98218 32.4782L4.97632 32.4733L0.64917 28.611L0.486084 28.4655V7.98404L0.663818 7.83853L5.95288 3.49283L5.96069 3.48697L9.63745 0.590485L9.77026 0.485992H497.636L497.775 0.611969L500.971 3.50845H500.97L505.296 7.36783L505.459 7.51334V29.4333Z"
        fill={fill}
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="0.972319"
      />

      <defs>
        <clipPath id="bgblur_clip" transform="translate(41.5197 41.5197)">
          <path d="M505.459 29.4333L505.294 29.5788L501.447 32.9586L501.446 32.9577L497.778 36.3307L497.638 36.4586H9.76245L9.62769 36.3463L4.98901 32.484L4.98218 32.4782L4.97632 32.4733L0.64917 28.611L0.486084 28.4655V7.98404L0.663818 7.83853L5.95288 3.49283L5.96069 3.48697L9.63745 0.590485L9.77026 0.485992H497.636L497.775 0.611969L500.971 3.50845H500.97L505.296 7.36783L505.459 7.51334V29.4333Z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Trapezoid = ({ fill = "#568EFF", className }: { fill?: string; className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 56" fill="none" className={className}>
      <g filter="url(#filter0_d_1_4506)">
        <path d="M29.5168 5.63927V43.0631L1.51685 48.7584V0.758408L29.5168 5.63927Z" fill={fill}/>
      </g>
      <defs>
        <filter id="filter0_d_1_4506" x="3.05176e-05" y="0" width="35.5841" height="55.5841" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="2.27522" dy="3.03363"/>
          <feGaussianBlur stdDeviation="1.89602"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4506"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4506" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}

export const ChamferedRect = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" fill="none" className={className}>
      <path d="M44.498 0.5L49.5293 7.14355H49.5303L55.5 15.7002V49.0029L49.126 56.168L49.1162 56.1797L42.9961 63.5H0.5V0.5H44.498Z" fill="#2E4371" stroke="url(#paint0_linear_1_4488)"/>
      <defs>
        <linearGradient id="paint0_linear_1_4488" x1="56.3143" y1="39.5582" x2="-25.2439" y2="43.8483" gradientUnits="userSpaceOnUse">
          <stop stop-color="#568EFF"/>
          <stop offset="0.536251" stop-color="#568EFF" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

type TrapeziumProps = {
  value?: string | number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  size?: number | string;
  textColor?: string;
  fontSize?: number | string;
};

export function IsoscelesTrapezium({
  value = "1",
  fill = "#568EFF",
  stroke = "#568EFF",
  strokeWidth = 2,
  size = "2.25rem",
  textColor = "white",
  fontSize = "0.875rem",
}: TrapeziumProps) {
  return (
    <svg
      viewBox="0 0 36 34"
      width={size}
      height={`calc(${size} * 0.94)`}
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M35.4541 0.5L32.542 33.5H0.545898L3.45801 0.5H35.4541Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
        fill={textColor}
        fontSize={fontSize}
      >
        {value}
      </text>
    </svg>
  );
}

export const TableRow = () => {
  return (
    <clipPath id="table-bg" clipPathUnits="objectBoundingBox">     
    <path d="M0 0H1V0.525L0.978652 0.725L0.950562 1H0V0Z" fill="#000"/>
    </clipPath>
  );
}

export const MenuBackground = () => {
  return (
    <clipPath id="menu-bg" clipPathUnits="objectBoundingBox">     
    <path d="M0.00853175 0.102857L0 0.205714V0.5V0.794286L0.00873016 0.897143L0.0174603 1H0.500992H0.984325L0.992262 0.908571L1 0.82V0.497143V0.177143L0.992262 0.0885714L0.984524 1.07102e-08H0.500794H0.0168651L0.00853175 0.102857Z" fill="black"/>
    </clipPath>
  );
}