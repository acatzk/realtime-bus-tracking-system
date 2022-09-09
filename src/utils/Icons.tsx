export interface IconName {
  className?: string
}

export const Spinner: React.FC<IconName> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor">
      <g transform="translate(3 3)" strokeWidth="4" fill="none" fillRule="evenodd">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.7s"
            repeatCount="indefinite"></animateTransform>
        </path>
      </g>
    </svg>
  )
}
