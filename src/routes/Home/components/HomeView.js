import React, {
    useState,
    useEffect
} from "react";
import Scrollbar from "react-scrollbars-custom";
import lib from "lib/commons";
import config from "config/common";
import Predict from "./Predict";
import Spin from "./Spin";
import Shop from "./Shop";
import Players from "./Players";
import ReactTooltip from 'react-tooltip';

const HomeView = ({
    lng,
    currentUser: data = {},
    currentUser: {
        currentTime = null,
    } = {},
    spin,
    checkMatch,
    share,
    claim,
    voteMatch,
    getPlayers,
    choosePlayer
}) => {
    const [delta, setDelta] = useState(0);

    useEffect(() => {
        if (currentTime) {
            setDelta(new Date(currentTime).getTime() - new Date().getTime());
        }
    }, [currentTime]);

    useEffect(() => {
        ReactTooltip.rebuild();
    })

    useEffect(() => {
        AOS.init({
            easing: "ease-out-back",
            duration: 1200,
            offset: -80,
        });
    }, []);

    return ( <
        >
        <
        div className = "main-content main-home" >
        <
        div className = "section section--1" >
        <
        div className = "wrap-video" >
        <
        video autoPlay muted loop >
        <
        source src = "https://cdn.vn.garenanow.com/web/fo4vn//Khoa/2023/T3/22UCL/ucl_kv.webm"
        type = 'video/webm;codecs="vp8, vorbis"' /
        >
        <
        /video> <
        img src = "https://cdn.vn.garenanow.com/web/fo4vn//Khoa/2023/T3/22UCL/ucl_kv.png"
        alt = "" /
        >
        <
        /div> <
        /div>

        <
        div className = "section section--2" >
        <
        Spin data = {
            data
        }
        spin = {
            spin
        }
        checkMatch = {
            checkMatch
        }
        share = {
            share
        }
        />

        <
        Predict voteMatch = {
            voteMatch
        }
        data = {
            data
        }
        delta = {
            delta
        }
        /> <
        /div>

        <
        div className = "section section--3" >
        <
        Shop data = {
            data
        }
        claim = {
            claim
        }
        /> <
        /div>

        <
        div className = "section section--4" >
        <
        Players data = {
            data
        }
        getPlayers = {
            getPlayers
        }
        choosePlayer = {
            choosePlayer
        }
        /> <
        /div> <
        /div> <
        ReactTooltip html = {
            true
        }
        /> <
        />
    );
};

export default HomeView;