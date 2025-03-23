import "./Spinner.css"

const Spinner = ({isLoading}: {isLoading: boolean}) =>{
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={isLoading ? "spinner" : "spinner-hidden"}
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="grey"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        className="spin"
        style={{ animation: 'spin 1s linear infinite' }}
      />
    </svg>
  )
}

export default Spinner;

