import React, {
    useState,
    useEffect
} from 'react'
import queryString from "query-string";
import lib from "lib/commons";
import config from "config/common";

const Spin = ({
    data: {
        user: {
            id: userId = null,
            spin_times: spinNum = 0,
            total_spin_times = 0,
            token = 0,
        } = {},
        phaseName = null,
        eventStarted = 0,
        eventTime = false,
        closedMessage = null,
        spinPrize = [],
        playerPieces = [],
        isSpinning,
        isCheckingMatch,
        isSharing
    },
    checkMatch,
    share,
    spin
}) => {
    const parsed = queryString.parse(location.search)
    const [winningItem, setWinningItem] = useState(null)

    useEffect(() => {
        let shared = parsed["spin-shared"];
        if (userId && shared == "true") {
            share();
        }
        if (phaseName) {
            const phaseInfo = phaseName.split(" ") || []

            setPhaseCur(phaseInfo[1] ? .slice(0, 1))
        }

    }, [userId]);

    const handleSpin = (e) => {
        e.preventDefault();

        if (!eventStarted) {
            lib.showMessage(config.demoMsg);
            return false;
        }

        if (!eventTime && closedMessage) {
            lib.showMessage(closedMessage);
            return false;
        }

        if (!userId) {
            lib.login();
            return false;
        }

        if (spinNum < 1) {
            lib.showMessage("Bạn không có lượt để quay");
            return false;
        }

        if (isSpinning) {
            return false;
        }

        spin(setWinningItem);
    };

    const handleCheckMatch = (e) => {
        e.preventDefault();

        if (!eventStarted) {
            lib.showMessage(config.demoMsg);
            return false;
        }

        if (!eventTime && closedMessage) {
            lib.showMessage(closedMessage);
            return false;
        }

        if (!userId) {
            lib.login();
            return false;
        }

        if (isCheckingMatch) {
            return false;
        }

        checkMatch();
    };

    const shareCustom = () => {
        let quote = config.shareQuote;
        let hashtag = config.shareHashtag;
        let shareLink =
            "https://www.facebook.com/dialog/share?app_id=323813682520465&display=touch&href=" +
            `https://${config.domain}%2F` +
            "&redirect_uri=https%3A%2F%2F" +
            config.domain +
            "%2F%3Fspin-shared=true" +
            "&hashtag=%23" +
            hashtag +
            "&quote=" +
            quote;

        window.location = shareLink;
    };

    const handleShare = (e) => {
        e.preventDefault();

        if (!eventStarted) {
            lib.showMessage(config.demoMsg);
            return false;
        }

        if (!eventTime && closedMessage) {
            lib.showMessage(closedMessage);
            return false;
        }

        if (!userId) {
            lib.login();
            return false;
        }

        if (isSharing) {
            return false;
        }

        if (lib.isFbBrowser()) {
            share(shareCustom);
        } else {
            if (lib.isMobile()) {
                shareCustom();
            } else {
                FB.ui({
                        method: "share",
                        href: config.baseUrl,
                        hashtag: "#" + config.shareHashtag,
                        quote: config.shareQuote,
                        display: "iframe",
                    },
                    (response) => {
                        if (response && !response.error_message) {
                            share();
                        } else {
                            lib.showMessage("Vui lòng chia sẻ để nhận lượt");
                        }
                    }
                );
            }
        }
    };

    return ( <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col-12" >
        <
        h2 className = "title" > Chọn Trận cầu đinh, nhận quà tuyệt đỉnh < /h2> <
        p className = "sub-title" >
        Hoàn thành các lượt chơi hằng ngày để nhận lượt mở quà và 100 sao UCL. < br / > Tích thật nhiều lượt chơi để nhận quà tại các mốc tích lũy. <
        /p> <
        /div> <
        /div> <
        div className = "row" >
        <
        div className = "col-12" >
        <
        div className = "spin-total" >
        Số lượt mở còn lại: {
            spinNum || 0
        } <
        /div> <
        /div> <
        /div> <
        div className = "row wrap-spin justify-content-center" >
        <
        div className = "col-8" >
        <
        div className = "row" > {
            spinPrize.length > 0 && spinPrize.map((item, index) => ( <
                div className = "col col--item-spin"
                key = {
                    index
                } >
                <
                div className = {
                    `item-cover${winningItem == item.id ? " item-cover--active" : ""} item-cover--${item.id}`
                } >
                <
                img src = {
                    item ? .image
                }
                alt = ""
                className = "item-cover__img"
                data - tip = {
                    item ? .item_name
                }
                /> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div> <
        div className = "col-4" >
        <
        div className = "spin-actions" >
        <
        a href = "#"
        className = "spin-actions__btn spin-actions__btn--play"
        onClick = {
            e => handleSpin(e)
        } >
        Mở quà <
        /a> <
        a href = "#"
        className = "spin-actions__btn spin-actions__btn--play"
        onClick = {
            e => handleCheckMatch(e)
        } >
        Cập nhật nhiệm vụ <
        /a> <
        a href = "#"
        className = "spin-actions__btn spin-actions__btn--share"
        onClick = {
            e => handleShare(e)
        } >
        Chia sẻ nhận lượt <
        /a> <
        div className = "spin-actions__btn spin-actions__btn--star" >
        Số sao hiện có: {
            token || 0
        } <
        /div> <
        /div> <
        /div> <
        /div> <
        div className = "row" >
        <
        div className = "col-12" >
        <
        div className = "spin-total" >
        Số lượt chơi tích luỹ: {
            total_spin_times || 0
        } <
        /div> <
        /div> <
        /div> <
        div className = "row wrap-accumulate" > {
            playerPieces.length > 0 && playerPieces.map((item, index) => {
                return ( <
                    div className = {
                        `col col--accumulate`
                    }
                    key = {
                        index
                    } >
                    <
                    div className = {
                        `accumulate accumulate--${index+1}`
                    } >
                    <
                    div className = "accumulate__image" >
                    <
                    img src = {
                        item ? .image
                    }
                    alt = ""
                    data - tip = {
                        item ? .desc
                    }
                    /> <
                    /div> <
                    div className = {
                        `accumulate__point${total_spin_times >= item.stage ? ' active' : ''}`
                    } > {
                        item.stage
                    } <
                    /div> <
                    /div> <
                    /div>
                )
            })
        } <
        /div> <
        /div>
    )
}

export default Spin