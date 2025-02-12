import Ring from "../../assets/Ring.jpg"
import Rings from "../../assets/RingsOnWhiteHands.jpg"
import ChainInBlackHand from "../../assets/ChainInBlackHand.jpg"
import RingsOnBlackHands from "../../assets/RingsOnBlackHands.jpg"
import ChupaChups from "../../assets/ChupaChups.jpg"

const ProductCard = () => {
    return(
        <section className="productCard">
            <div className="productCard__image">
                <img src={Ring}/>
                <img src={Rings}/>
                <img src={ChainInBlackHand}/>
                <img src={RingsOnBlackHands}/>
                <img src={ChupaChups}/>
            </div>
            <div className="productCard__description"></div>
        </section>
    )
}

export default ProductCard;