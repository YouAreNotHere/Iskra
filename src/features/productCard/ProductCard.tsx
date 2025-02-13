import Ring from "../../assets/Ring.jpg";
import Rings from "../../assets/RingsOnWhiteHands.jpg";
import ChainInBlackHand from "../../assets/ChainInBlackHand.jpg";
import RingsOnBlackHands from "../../assets/RingsOnBlackHands.jpg";
import ChupaChups from "../../assets/ChupaChups.jpg";
import "./ProductCard.scss"

const ProductCard = () => {
    return(
        <section className="productCard">
            <div className="productCard-images-wrapper">
                <div className="new-product">
                    <img src={Ring} alt="photo of ring" className="productCard__image" />
                </div>
                <img src={Rings} className="productCard__image" alt="photo of rings"/>
                <img src={ChainInBlackHand} className="productCard__image" alt="photo of chain"/>
                <img src={RingsOnBlackHands} className="productCard__image" alt="photo of rings in black hands"/>
                <img src={ChupaChups} className="productCard__image" alt="photo of rings and chupa chups"/>
            </div>
            <div className="productCard__description"></div>
        </section>
    )
}

export default ProductCard;