interface IconProps {
  size?: number;
  color?: string;
}

export function ChartIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M11.4524 2.57884L4.32926 1.32026C4.09133 1.27822 3.86436 1.43703 3.82232 1.67497L2.18961 10.9157C2.14757 11.1536 2.30637 11.3806 2.54431 11.4226L9.66749 12.6812C9.90543 12.7232 10.1324 12.5644 10.1744 12.3265L11.8072 3.08578C11.8492 2.84784 11.6904 2.62088 11.4524 2.57884Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.31641 3.27051L9.85437 4.07223"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.55023 5.79629L5.01172 4.99512"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.97992 7.11863L4.71094 6.71777"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}