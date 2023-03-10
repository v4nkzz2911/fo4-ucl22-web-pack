import React, {
    useEffect,
    useState
} from "react";
import Modal from "react-modal";
import Scrollbar from "react-scrollbars-custom";

import config from "config/common";
import lib from "lib/commons";
import Spinner from "components/Spinner";

Modal.setAppElement("#root");

const ModalHistory = ({
    matches,
    userHistory,
    voteHistory,
    isGettingHistory,
    getHistory,
    modalStatus,
    closeModal,
}) => {
    const [currentTab, setCurrentTab] = useState("gifts");
    const matchesInfo = lib.toObj(matches, "id");

    useEffect(() => {
        if (!isGettingHistory) {
            getHistory();
        }
    }, []);

    const afterOpenModal = () => {};

    const selfClose = (event) => {
        event.preventDefault();
        closeModal();
    };

    return ( <
        Modal isOpen = {
            modalStatus
        }
        onAfterOpen = {
            afterOpenModal
        }
        onRequestClose = {
            selfClose
        }
        contentLabel = "Example Modal"
        portalClassName = "ReactModalPortal"
        overlayClassName = ""
        className = "animated fadeInDown faster modal-history" >
        <
        div className = "modal-description" >
        <
        h2 > Lịch sử < /h2> <
        div className = "wrap-btn-his" >
        <
        a href = "#"
        className = {
            `btn-his${
              currentTab == "gifts" ? " btn-his--active" : ""
            }`
        }
        onClick = {
            (e) => {
                e.preventDefault();
                if (currentTab == "gifts") {
                    return false;
                }
                setCurrentTab("gifts");
            }
        } >
        <
        img src = {
            `/images/icon-${currentTab == "gifts" ? "ball" : "ball-blue"}.png`
        }
        alt = "" / > Lịch sử nhận quà <
        /a> <
        a href = "#"
        className = {
            `btn-his${
              currentTab == "vote" ? " btn-his--active" : ""
            }`
        }
        onClick = {
            (e) => {
                e.preventDefault();
                if (currentTab == "vote") {
                    return false;
                }
                setCurrentTab("vote");
            }
        } >
        <
        img src = {
            `/images/icon-${currentTab == "vote" ? "ball" : "ball-blue"}.png`
        }
        alt = "" / > Lịch sử dự đoán <
        /a> <
        /div>

        {
            currentTab == "gifts" && ( <
                > {
                    isGettingHistory ? ( <
                        Spinner / >
                    ) : ( <
                        >
                        <
                        table className = "table-history" >
                        <
                        thead >
                        <
                        tr >
                        <
                        th width = "10%" > STT < /th> <
                        th width = "30%" > Tên VP < /th> <
                        th width = "15%" > Trạng thái < /th> <
                        th width = "25%" > Thời gian < /th> <
                        th width = "20%" > Sự kiện < /th> <
                        /tr> <
                        /thead> <
                        /table>

                        <
                        Scrollbar style = {
                            {
                                height: "25vw"
                            }
                        }
                        noScrollX = {
                            true
                        } > {
                            userHistory.length > 0 ? ( <
                                table className = "table-history" >
                                <
                                tbody > {
                                    userHistory.map((his, index) => {
                                        let textEvent = '';
                                        if (his.usage == 'spin') {
                                            textEvent = 'Mở quà'
                                        }
                                        if (his.usage == 'exchange') {
                                            textEvent = 'Shop đổi sao'
                                        }
                                        if (his.usage == 'piece') {
                                            textEvent = 'Quà tích luỹ'
                                        }
                                        return ( <
                                            tr key = {
                                                index
                                            } >
                                            <
                                            td width = "10%" >
                                            <
                                            strong > {
                                                index + 1
                                            } < /strong> <
                                            /td> <
                                            td width = "30%" > {
                                                his.reward_name
                                            } < /td> <
                                            td width = "15%" > {
                                                his.status
                                            } < /td> <
                                            td width = "25%" > {
                                                his.create_time
                                            } < /td> <
                                            td width = "20%" > {
                                                textEvent
                                            } <
                                            /td> <
                                            /tr>
                                        )
                                    })
                                } <
                                /tbody> <
                                /table>
                            ) : ( <
                                p > Chưa có lịch sử < /p>
                            )
                        } <
                        /Scrollbar> <
                        />
                    )
                } <
                />
            )
        }

        {
            currentTab == "vote" && ( <
                >
                <
                table className = "table-history" >
                <
                thead >
                <
                tr >
                <
                th width = "15%" > Trận < /th> <
                th width = "20%" > Dự đoán < /th> <
                th width = "10%" > NSHV < /th> <
                th width = "10%" > Kết quả < /th> <
                th width = "20%" > Sao nhận được < /th> <
                th width = "25%" > Thời gian < /th> { /* <th width="10%">Vòng</th> */ } <
                /tr> <
                /thead> <
                /table>

                <
                Scrollbar style = {
                    {
                        height: "25vw"
                    }
                }
                noScrollX = {
                    true
                } > {
                    voteHistory.length > 0 ? ( <
                        table className = "table-history" >
                        <
                        tbody > {
                            voteHistory.map((his, index) => {
                                let titleGuess = '';
                                if (matchesInfo[his.match_id] && his.result === 0) {
                                    titleGuess = matchesInfo[his.match_id].team_1 + ' thắng'
                                }
                                if (matchesInfo[his.match_id] && his.result === 1) {
                                    titleGuess = 'Hoà'
                                }
                                if (matchesInfo[his.match_id] && his.result === 2) {
                                    titleGuess = matchesInfo[his.match_id].team_2 + ' thắng '
                                }
                                return ( <
                                    tr key = {
                                        index
                                    } >
                                    <
                                    td width = "15%" > {
                                        matchesInfo[his.match_id] ?
                                        `${matchesInfo[his.match_id].team_1} vs ${
                                  matchesInfo[his.match_id].team_2
                                }` :
                                            ""
                                    } <
                                    /td> <
                                    td width = "20%" > {
                                        titleGuess
                                    } <
                                    /td> <
                                    td width = "10%" > {
                                        his.star ? "Có" : "Không"
                                    } < /td> <
                                    td width = "10%" > {
                                        his.status ?
                                        his.bet_status == 1 ?
                                        "Đúng" :
                                        "Sai" :
                                            "Chưa"
                                    } <
                                    /td> <
                                    td width = "20%" > {
                                        his.status ? (his.bet_status == 1 ? his.token_win : '0') : 'Chưa'
                                    } <
                                    /td> <
                                    td width = "25%" > {
                                        his.create_time
                                    } < /td> {
                                        /* <td width="10%">
                                                                    {matchesInfo[his.match_id] &&
                                                                      matchesInfo[his.match_id].text_match}
                                                                  </td> */
                                    } <
                                    /tr>
                                )
                            })
                        } <
                        /tbody> <
                        /table>
                    ) : ( <
                        p > Chưa có lịch sử < /p>
                    )
                } <
                /Scrollbar> <
                />
            )
        } <
        /div> <
        a onClick = {
            (event) => selfClose(event)
        }
        className = "close"
        data - dismiss = "modal"
        aria - label = "Close" >
        ×
        <
        /a> <
        /Modal>
    );
};
export default ModalHistory;