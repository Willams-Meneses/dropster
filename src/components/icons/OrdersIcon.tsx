interface IconProps {
  size?: number;
  color?: string;
}

export function OrdersIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M7 6.5625V9.625"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0625 4.8125L7 1.3125L3.9375 4.8125"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88828 6.5625L9.58203 9.625"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.11328 6.5625L4.41953 9.625"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.3125 4.8125H12.6875L11.8634 10.9955C11.8493 11.1005 11.7976 11.1969 11.7178 11.2667C11.6381 11.3365 11.5357 11.375 11.4297 11.375H2.57031C2.46432 11.375 2.36192 11.3365 2.28216 11.2667C2.20239 11.1969 2.15069 11.1005 2.13664 10.9955L1.3125 4.8125Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
