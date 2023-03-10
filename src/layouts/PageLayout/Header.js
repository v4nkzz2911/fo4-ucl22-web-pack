import React, {
    useState,
    useEffect
} from "react";
import {
    NavLink,
    useHistory,
    useParams,
    useLocation
} from "react-router-dom";
import queryString from "query-string";

import config from "config/common";
import lib from "lib/commons";

import Sidebar from "./Sidebar";
import ModalHistory from "components/ModalHistory";

const Header = ({
    lng,
    user: {
        user: {
            nickname = "",
            id: userId = null,
            uid = null,
            total_spin_times: totalSpinNum = 0,
            vote_history: voteHistory = [],
        } = {},
        matches = [],
        userHistory = [],
        eventStarted,
        isGettingHistory,
    } = {},

    getHistory,
}) => {
    let history = useHistory();
    const [modalStatus, setModalStatus] = useState(false);
    const closeModal = () => setModalStatus(false);

    return ( <
        >
        <
        div id = "header" >
        <
        div className = "top-bar" >
        <
        div className = "container" >
        <
        div className = "row align-items-center justify-content-center" >
        <
        div className = "col-2" >
        <
        a href = "https://fo4.garena.vn"
        className = "logo" >
        <
        img src = "/images/logo.png"
        alt = "" / >
        <
        /a> <
        /div> <
        div className = "col-7" >
        <
        a href = "#"
        className = "menu-link"
        onClick = {
            (e) => {
                e.preventDefault();
                lib.showImage(config.guideImg);
            }
        } >
        Hướng dẫn <
        /a> <
        a href = "#"
        className = "menu-link"
        onClick = {
            (e) => {
                e.preventDefault();
                setModalStatus(true);
            }
        } >
        Lịch sử <
        /a> <
        a href = "#"
        className = "menu-link"
        onClick = {
            (e) => {
                e.preventDefault();
                lib.showImage(config.prizeListGlobal);
            }
        } >
        Quà nhận được <
        /a> <
        /div> <
        div className = "col-2 text-right" > {!userId ? ( <
                a href = "/user/login"
                className = "btn-login"
                onClick = {
                    (e) => {
                        if (!eventStarted) {
                            e.preventDefault();
                            lib.showMessage(config.demoMsg);
                            return false;
                        }
                    }
                } >
                Đăng nhập <
                /a>
            ) : ( <
                >
                <
                span >
                HI < strong className = "nickname" > {
                    nickname
                } < /strong>{" "} { /* <span className="text-red">{totalSpinNum}</span> */ } <
                /span> <
                />
            )
        } <
        /div> <
        /div> <
        /div> {
            userId && ( <
                a href = "/user/logout"
                className = "btn-logout" >
                Đăng xuất <
                /a>
            )
        } <
        /div> <
        /div> {
            modalStatus && ( <
                ModalHistory userHistory = {
                    userHistory
                }
                isGettingHistory = {
                    isGettingHistory
                }
                getHistory = {
                    getHistory
                }
                voteHistory = {
                    voteHistory
                }
                matches = {
                    matches
                }
                modalStatus = {
                    modalStatus
                }
                closeModal = {
                    closeModal
                }
                />
            )
        } <
        />
    );
};

export default Header;