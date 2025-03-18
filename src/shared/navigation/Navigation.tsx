import "./Navigation.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
    const navigate = useNavigate();
    const isWideScreen = useMediaQuery({ minWidth: 600 });
    const [isShowMenu, setIsShowMenu] = useState<boolean>(isWideScreen);

    return(
            <nav className="navigation">
                <button
                    onClick={()=> setIsShowMenu(!isShowMenu)}
                    className="navigation__burger-menu"></button>
                <div className = {isShowMenu ? "navigation__button-wrapper" : "navigation__button-wrapper--hidden"}>
                    <button
                        className = "navigation__button navigation__button--catalog"
                        onClick={()=> {
                            navigate("/")
                            if (!isWideScreen) setIsShowMenu(false);
                        }
                    }
                    >
                        Каталог
                    </button>
                    <button
                        className = "navigation__button navigation__button--about"
                        onClick={()=> {
                            if (!isWideScreen) setIsShowMenu(false);
                            navigate("/о-нас")}}
                    >
                        О нас
                    </button>
                    <button
                        onClick={()=> {
                            if (!isWideScreen) setIsShowMenu(false);
                            navigate("/новости")}}
                        className = "navigation__button navigation__button--news">
                        Новости
                    </button>
                    <button
                        onClick={()=> {
                            if (!isWideScreen) setIsShowMenu(false);
                            navigate("/доставка-и-оплата")}}
                        className = "navigation__button navigation__button--delivery">
                        Доставка и оплата
                    </button>
                </div>
                <div className="navigation__buttons-wrapper--user">
                    <button
                        onClick={()=> {
                            if (!isWideScreen) setIsShowMenu(false);
                            navigate("/account")}}
                        className="navigation__button navigation__button--user">
                        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.375 13.4868C25.375 12.2915 24.707 11.2017 23.6875 10.5688C22.6328 9.97119 21.332 9.97119 20.3125 10.5688C19.2578 11.2017 18.625 12.2915 18.625 13.4868C18.625 14.7173 19.2578 15.8071 20.3125 16.4399C21.332 17.0376 22.6328 17.0376 23.6875 16.4399C24.707 15.8071 25.375 14.7173 25.375 13.4868ZM17.5 13.4868C17.5 11.9048 18.3438 10.4282 19.75 9.61963C21.1211 8.81104 22.8438 8.81104 24.25 9.61963C25.6211 10.4282 26.5 11.9048 26.5 13.4868C26.5 15.104 25.6211 16.5806 24.25 17.3892C22.8438 18.1978 21.1211 18.1978 19.75 17.3892C18.3438 16.5806 17.5 15.104 17.5 13.4868ZM15.6367 25.8618H28.3281L26.9975 21.5071C26.869 21.0866 26.4809 20.7993 26.0412 20.7993H17.9237C17.484 20.7993 17.0958 21.0866 16.9673 21.5071L15.6367 25.8618ZM16.1557 20.376C16.2862 19.9586 16.6728 19.6743 17.1102 19.6743H26.8858C27.3251 19.6743 27.713 19.961 27.8418 20.381L29.5234 25.8618C29.6978 26.4198 29.2809 26.9868 28.6963 26.9868H28.6797H15.2852C14.7028 26.9868 14.2837 26.4225 14.4414 25.8618L16.1557 20.376Z"
                                fill="#1E1E1E"/>
                        </svg>
                    </button>
                    <button
                        className="navigation__button navigation__button--cart"
                        onClick={()=> {
                            if (!isWideScreen) setIsShowMenu(false);
                            navigate("/cart")}}
                    >
                        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.4375 8.99121H14.6875C14.9344 8.99121 15.1487 9.16166 15.2042
                                9.40228L15.2148 9.44824L15.3906 10.1162H30.9297H30.9463C31.5309 10.1162 31.9478
                                10.6832 31.7734 11.2412L29.5318 18.4145C29.4013 18.832 29.0147 19.1162 28.5773
                                19.1162H17.4297L17.9219 21.3662H29.3125C29.6232 21.3662 29.875 21.6181 29.875
                                21.9287C29.875 22.2394 29.6232 22.4912 29.3125 22.4912H17.5H17.4778C17.2223
                                22.4912 16.9995 22.3173 16.9375 22.0693L14.2305 10.1162H12.4375C12.1268 10.1162
                                11.875 9.86437 11.875 9.55371C11.875 9.24305 12.1268 8.99121 12.4375
                                .99121ZM15.6367 11.2412L17.1836 17.9912H28.4688L30.5781 11.2412H15.6367ZM18.3438
                                24.1787C17.8516 24.1787 17.5 24.5654 17.5 25.0225C17.5 25.5146 17.8516 25.8662
                                18.3438 25.8662C18.8008 25.8662 19.1875 25.5146 19.1875 25.0225C19.1875 24.5654
                                18.8008 24.1787 18.3438 24.1787ZM18.3438 26.9912C17.6055 26.9912 16.9727 26.6396
                                16.6211 26.0068C16.2695 25.4092 16.2695 24.6709 16.6211 24.0381C16.9727 23.4404
                                17.6055 23.0537 18.3438 23.0537C19.0469 23.0537 19.6797 23.4404 20.0312
                                24.0381C20.3828 24.6709 20.3828 25.4092 20.0312 26.0068C19.6797 26.6396
                                19.0469 26.9912 18.3438 26.9912ZM27.0625 25.0225C27.0625 25.5146 27.4141
                                25.8662 27.9062 25.8662C28.3633 25.8662 28.75 25.5146 28.75 25.0225C28.75
                                24.5654 28.3633 24.1787 27.9062 24.1787C27.4141 24.1787 27.0625 24.5654 27.0625
                                25.0225ZM29.875 25.0225C29.875 25.7607 29.4883 26.3936 28.8906 26.7451C28.2578
                                27.0967 27.5195 27.0967 26.9219 26.7451C26.2891 26.3936 25.9375 25.7607 25.9375
                                25.0225C25.9375 24.3193 26.2891 23.6865 26.9219 23.335C27.5195 22.9834 28.2578
                                22.9834 28.8906 23.335C29.4883 23.6865 29.875 24.3193 29.875 25.0225Z"
                                fill="#1E1E1E"/>
                        </svg>
                    </button>
                </div>
            </nav>
)
}

export default Navigation