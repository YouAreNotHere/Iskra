import "./ShowAdditionalButton.scss"

const ShowAdditionalButton = ({value}: {value: string}) => {
    return (
        <div className="product-card__additional-info">
            <p>{value}</p>
            <button className="product-card__button--show-additional-info">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0V18" stroke="#1E1E1E"/>
                    <path d="M18 9L6.25849e-07 9" stroke="#1E1E1E"/>
                </svg>
            </button>
        </div>
    )
}

export default ShowAdditionalButton;