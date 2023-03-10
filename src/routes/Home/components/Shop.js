import React from 'react'
import lib from "lib/commons";
import config from "config/common";

const Shop = ({
    data: {
        user: {
            id: userId = null,
            spin_times: spinNum = 0,
            total_spin_times = 0,
            token = 0,
            exchange_prize_history: exchangeHistory = [],
        } = {},
        eventStarted = 0,
        exchangePrizes,
        isClaiming,
    },
    claim
}) => {
    const exchangeInfo = lib.toObj(exchangeHistory, 'exchange_item_id')

    const handleClaim = (item, e) => {
        e.preventDefault()

        if (!eventStarted) {
            lib.showMessage(config.demoMsg);
            return false
        }

        if (!userId) {
            lib.login();
            return false
        }

        if (!item ? .token) {
            lib.showMessage(`Thời gian đổi hộp quà này chưa bắt đầu. Vui lòng quay lại sau.`)
            return
        }

        if (exchangeInfo[item.exchange_item_id] ? .count >= item.limit) {
            lib.showMessage('Bạn đã đạt giới hạn quy đổi vật phẩm')
            return false
        }


        if (token < item.token) {
            lib.showMessage('Bạn không có đủ điểm để đổi vật phẩm!')
            return false
        }

        if (isClaiming) {
            return false
        }

        lib.showMessage('Bạn có chắc chắn muốn đổi ?', 'Hủy').then(res => {
            if (res.value) {
                claim(item)
            }
        })
    };

    return ( <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col-12" >
        <
        h2 className = "title" > Shop đổi điểm < /h2> <
        p className = "sub-title sub-title--3" >
        Sử dụng số sao UCL bạn nhận được để đổi những phần quà vô cùng giá trị, vào ngày 10.3 sẽ cập nhật thêm 2 gói quà mới < br / >
        Lưu ý: Bạn sẽ nhận ngẫu nhiên một món quà trong gói <
        /p> <
        p className = "total-star" > Số sao hiện có: {
            token || 0
        } < img src = "/images/icon-star.png"
        alt = "" / > < /p> <
        /div> <
        /div> <
        div className = "shop" >
        <
        div className = "shop__row" > {
            exchangePrizes.length > 0 && exchangePrizes.map((item, index) => {
                if (index + 1 <= 2) {
                    return ( <
                        div className = "shop__item"
                        key = {
                            index
                        } >
                        <
                        img src = {
                            item ? .image
                        }
                        alt = ""
                        data - class = "tooltip-shop"
                        data - place = "right"
                        data - tip = {
                            `<img src=${item?.desc} />`
                        }
                        /> <
                        a href = "#"
                        className = "shop__btn"
                        onClick = {
                            e => handleClaim(item, e)
                        } >
                        <
                        span > {
                            item ? .token
                        } < /span> <
                        img src = "/images/icon-star.png"
                        alt = "" / >
                        <
                        /a> <
                        div className = "shop__limit" > {
                            exchangeInfo[item.exchange_item_id] ? .count || 0
                        }
                        /{item?.limit}</div >
                        <
                        /div>
                    )
                }
            })
        } <
        /div> <
        div className = "shop__row" > {
            exchangePrizes.length > 0 && exchangePrizes.map((item, index) => {
                if (index + 1 > 2) {
                    return ( <
                        div className = "shop__item"
                        key = {
                            index
                        }
                        data - class = "tooltip-shop"
                        data - place = "right"
                        data - tip = {
                            item ? .token ? `<img src=${item?.desc}  />` : ''
                        } >
                        <
                        img src = {
                            item ? .image
                        }
                        alt = "" / >
                        <
                        a href = "#"
                        className = "shop__btn"
                        onClick = {
                            e => handleClaim(item, e)
                        } >
                        <
                        span > {
                            item ? .token ? item ? .token : 'Đổi ngay'
                        } < /span> <
                        img src = "/images/icon-star.png"
                        alt = "" / >
                        <
                        /a> <
                        div className = "shop__limit" > {
                            exchangeInfo[item.exchange_item_id] ? .count || 0
                        }
                        /{item?.limit}</div >
                        <
                        /div>
                    )
                }
            })
        } <
        /div> <
        /div> <
        /div>
    )
}

export default Shop