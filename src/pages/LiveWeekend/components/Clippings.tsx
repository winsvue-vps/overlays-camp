export const TimerBG = () => {
  return (
    <clipPath id="timer-bg" clipPathUnits={"objectBoundingBox"}>
      
    </clipPath>
  );
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