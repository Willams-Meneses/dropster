interface IconProps {
  size?: number;
  color?: string;
}

export function ShopIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M2.625 7.63379V11.8125H11.375V7.63379"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.95312 2.1875H11.0469C11.1419 2.18752 11.2344 2.21848 11.3102 2.27571C11.3861 2.33294 11.4413 2.41331 11.4674 2.50469L12.25 5.25H1.75L2.53422 2.50469C2.56028 2.41358 2.61521 2.3334 2.69075 2.2762C2.7663 2.219 2.85837 2.18787 2.95312 2.1875Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 5.25V6.125C5.25 6.58913 5.06563 7.03425 4.73744 7.36244C4.40925 7.69062 3.96413 7.875 3.5 7.875C3.03587 7.875 2.59075 7.69062 2.26256 7.36244C1.93437 7.03425 1.75 6.58913 1.75 6.125V5.25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 5.25V6.125C8.75 6.58913 8.56562 7.03425 8.23744 7.36244C7.90925 7.69062 7.46413 7.875 7 7.875C6.53587 7.875 6.09075 7.69062 5.76256 7.36244C5.43437 7.03425 5.25 6.58913 5.25 6.125V5.25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 5.25V6.125C12.25 6.58913 12.0656 7.03425 11.7374 7.36244C11.4092 7.69062 10.5 7.875 10.5 7.875C10.0359 7.875 9.59075 7.69062 9.26256 7.36244C8.93437 7.03425 8.75 6.58913 8.75 6.125V5.25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}