import React, {
    useState,
    useEffect
} from "react";
import Scrollbar from "react-scrollbars-custom";
import lib from "lib/commons";
import config from "config/common";
import dayjs from "dayjs";
import ModalPredict from './ModalPredict';

const Predict = ({
    data: {
        user: {
            id: userId = null,
            nickname = null,
            token_count = 0,
            player_correct = 0,
            match_correct = 0,
            spin_times: spinNum = 0,
            total_spin_times = 0,
            token = 0,
            vote_history: voteHistory = []
        } = {},
        eventStarted = 0,
        eventTime = false,
        closedMessage = null,
        knockoutImage = null,
        matches = [],
        group = [],
        userTopTable = [],
        isVoting,
        player
    },
    delta,
    voteMatch
}) => {
    const [currentMatch, setCurrentMatch] = useState(null);
    const [modalStatus, setModalStatus] = useState(false);
    const closeModal = () => setModalStatus(false);
    const voteInfo = lib.toObj(voteHistory, 'match_id');

    const handleOpenModal = (match, e) => {
        e.preventDefault();

        if (!eventStarted) {
            lib.showMessage(config.demoMsg);
            return false;
        }

        if (!userId) {
            lib.login();
            return false;
        }
        setCurrentMatch(match);
        setModalStatus(true);
    };
    return ( <
        div className = "matchs" >
        <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col-12" >
        <
        h2 className = "title" > Dự đoán các trận đấu Champion League < /h2> <
        p className = "sub-title" >
        Dự đoán kết quả các trận đấu vòng 1: 8 để nhận thêm sao UCL. < br / > Cùng với đó, sử dụng ngôi sao hy vọng nhằm tăng gấp đôi số sao nhận được. < br / > Lưu ý: Có 4 ngôi sao hy vọng trong cả sự kiện <
        /p> <
        div className = "predict-star" >
        Số sao dự đoán hiện có: {
            token || 0
        } <
        /div> <
        /div> <
        /div> <
        div className = "row" >
        <
        div className = "col-12" >
        <
        div className = "wrap-match" >
        <
        Scrollbar style = {
            {
                height: "33vw"
            }
        }
        noScrollX = {
            true
        } > {
            matches.length > 0 && matches.map((match, index) => ( <
                div className = "match"
                key = {
                    index
                } >
                <
                div className = "row align-items-center" >
                <
                div className = "col-4" > {
                    match.text_match
                } < /div> <
                div className = "col-4 text-center" >
                <
                h3 > {
                    match.result ? 'Kết quả' : 'Tỷ lệ dự đoán'
                } < /h3> <
                /div> <
                div className = "col-4 text-right" > {
                    dayjs(match.start_time).format('HH:mm DD.MM.YYYY')
                } <
                /div> <
                div className = "w-100" > < /div> <
                /div> <
                div className = "row align-items-center" > {
                    voteInfo[match.id] && voteInfo[match.id].star > 0 && ( <
                        img src = "/images/star.png"
                        alt = ""
                        className = "star-of-hope" /
                        >
                    )
                } <
                div className = "col-4 text-right" >
                <
                span className = "match__team-name" > {
                    match.team_1
                } <
                /span> &
                nbsp; & nbsp; <
                img src = {
                    match.logo_team_1
                }
                alt = ""
                className = "match__team-logo" /
                >
                <
                /div> <
                div className = "col-4 text-center" > {
                    match.result ? ( <
                        span className = "match__team-name text-huge" > {
                            match.result
                        } <
                        /span>
                    ) : ( <
                        div className = "link-group row" >
                        <
                        span className = "col-4 link-group--rate" > T {
                            match.win_rate
                        } < /span> <
                        span className = "col-4 link-group--rate" > H {
                            match.draw_rate
                        } < /span> <
                        span className = "col-4 link-group--rate" > T {
                            match.lose_rate
                        } < /span> <
                        /div>
                    )
                } <
                /div> <
                div className = "col-4" >
                <
                img src = {
                    match.logo_team_2
                }
                alt = ""
                className = "match__team-logo" /
                >
                &
                nbsp; & nbsp; <
                span className = "match__team-name" > {
                    match.team_2
                } <
                /span> {
                    voteInfo[match.id] ? ( <
                        a href = "#"
                        className = "btn btn--match btn--predicted"
                        onClick = {
                            (e) => handleOpenModal(match, e)
                        } >
                        Đã dự đoán <
                        /a>
                    ) : ( <
                        > {
                            dayjs().add(delta, 'ms') >= dayjs(match.start_time) || match.result ? ( <
                                a href = "#"
                                className = "btn btn--match btn--ended"
                                onClick = {
                                    (e) => e.preventDefault()
                                } >
                                Dừng dự đoán <
                                /a>
                            ) : ( <
                                a href = "#"
                                className = "btn btn--match btn--predict"
                                onClick = {
                                    (e) => handleOpenModal(match, e)
                                } >
                                Dự đoán ngay <
                                /a>
                            )
                        } <
                        />
                    )
                } <
                /div> <
                /div> <
                /div>
            ))
        } <
        /Scrollbar> <
        /div> <
        /div> <
        /div> <
        /div> {
            modalStatus && currentMatch && ( <
                ModalPredict modalStatus = {
                    modalStatus
                }
                closeModal = {
                    closeModal
                }
                currentMatch = {
                    currentMatch
                }
                voteInfo = {
                    voteInfo
                }
                isVoting = {
                    isVoting
                }
                voteMatch = {
                    voteMatch
                }
                delta = {
                    delta
                }
                voteHistory = {
                    voteHistory
                }
                token = {
                    token
                }
                />
            )
        } <
        /div>
    )
}

export default Predict