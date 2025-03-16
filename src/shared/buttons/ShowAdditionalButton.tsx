import "./ShowAdditionalButton.scss"

interface Props{
    id: number,
    value: string,
    text: string | React.ReactNode,
    openedAdditionalInfo: number[],
    setOpenedAdditionalInfo: React.Dispatch<React.SetStateAction<number[]>>,
}

const ShowAdditionalButton = ({id, value, text, openedAdditionalInfo, setOpenedAdditionalInfo}: Props) => {
    const isItemOpened = !!openedAdditionalInfo.length && openedAdditionalInfo.includes(id);

    const onClickHandler = () => {
        if (isItemOpened) {
            setOpenedAdditionalInfo(openedAdditionalInfo.filter((item: number) => item !== id))
        }else{
            setOpenedAdditionalInfo([...openedAdditionalInfo, id])
        }
    }
    return (
        <div className="additional-info">
            <div className="additional-info__wrapper">
                <p className="additional-info__title">{value}</p>
                <button
                    onClick={onClickHandler}
                    className="additional-info__button">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 0V18" stroke="#1E1E1E"/>
                        <path d="M18 9L6.25849e-07 9" stroke="#1E1E1E"/>
                    </svg>
                </button>
            </div>
            <p className={isItemOpened ? "additional-info__text" : "additional-info__text--hidden"}>{text}</p>
        </div>
    )
}

export default ShowAdditionalButton;