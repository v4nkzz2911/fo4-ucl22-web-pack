import React, {
    useState,
    useEffect
} from 'react'
import Scrollbar from "react-scrollbars-custom";
import lib from "lib/commons";
import config from "config/common";

const Players = ({
        data: {
            user: {
                id: userId = null,
                spin_times: spinNum = 0,
                total_spin_times = 0,
                token = 0,
                selections = {},
                choose_player_allowed: choosePlayerAllowed = false
            } = {},
            eventStarted = 0,
            players,
            isGettingPlayers,
            isChoosingPlayer,
            choosePlayerTime
        },
        getPlayers,
        choosePlayer,
    }) => {
        const arrayRange = (start, stop, step) => Array.from({
                length: (stop - start) / step + 1
            },
            (value, index) => start + index * step
        );

        let listOvr = arrayRange(78, 108, 1) || []

        const listPosition = ["FW", "MF", "DF", "GK"]

        const maxSelect = 5

        const [isShowFilter, setIsShowFilter] = useState(false)
        const [listPlayers, setListPlayers] = useState([])
        const [listNationality, setListNationality] = useState([])
        const [filterNationality, setFilterNationality] = useState()
        const [filterPosition, setFilterPosition] = useState()
        const [filterOvr, setFilterOvr] = useState()
        const [filterName, setFilterName] = useState()
        const [currentText, setCurrentText] = useState()
        const [playerSelect, setPlayerSelect] = useState([])

        const groupBy = (array, key) => {
            return array.reduce((result, item) => {
                if (!result.includes(item[key])) {
                    result.push(item[key]);
                }
                return result;
            }, []);
        };

        useEffect(() => {
            setListPlayers(players)
            let nationality = groupBy(players, 'nationality') || []
            setListNationality(nationality)
        }, [players])

        useEffect(() => {
            let playersFilter = []
            let filter = {}

            if (filterNationality) {
                if (filterNationality != 'all') {
                    filter['nationality'] = filterNationality
                } else {
                    delete filter['nationality']
                }
            }

            if (filterPosition) {
                if (filterPosition != 'all') {
                    filter['position'] = filterPosition
                } else {
                    delete filter['position']
                }
            }

            if (filterOvr) {
                if (filterOvr != 'all') {
                    filter['overall'] = filterOvr
                } else {
                    delete filter['overall']
                }
            }

            playersFilter = players.filter(function(item) {
                for (var key in filter) {
                    if (item[key] === undefined || item[key] != filter[key])
                        return false;
                }
                return true;
            });

            if (filterName && !filterOvr && !filterPosition && !filterNationality) {
                playersFilter = players.filter(item => item ? .name.toLowerCase().includes(filterName.toLowerCase()))
            }

            if (filterName && (filterOvr || filterPosition || filterNationality)) {
                playersFilter = playersFilter.filter(item => item ? .name.toLowerCase().includes(filterName.toLowerCase()))
            }

            setListPlayers(playersFilter)
        }, [filterName, filterOvr, filterPosition, filterNationality])


        const hanldeShowFilter = (e) => {
            e.preventDefault()

            if (!eventStarted) {
                lib.showMessage(config.demoMsg);
                return false
            }

            if (!userId) {
                lib.login();
                return false
            }

            if (!choosePlayerTime) {
                lib.showMessage("???? h???t th???i gian ch???n c???u th???.")
                return
            }

            if (isGettingPlayers) {
                return
            }

            getPlayers()
            setTimeout(() => {
                setIsShowFilter(true)
            }, 300);
        }

        const handleChoosePlayer = (e) => {
            e.preventDefault()
            const listIdPlayer = playerSelect.join("_");

            if (!eventStarted) {
                lib.showMessage(config.demoMsg);
                return false
            }

            if (!userId) {
                lib.login();
                return false
            }

            if (!choosePlayerTime) {
                lib.showMessage("???? h???t th???i gian l???a ch???n c???u th???")
                return
            }

            if (!choosePlayerAllowed) {
                lib.showMessage("B???n c???n ???? ??t nh???t 1 tr???n")
                return
            }

            if (selections ? .status != -1) {
                lib.showMessage("B???n ???? l???a ch???n c???u th??? r???i.")
                return
            }

            if (playerSelect.length < 5) {
                lib.showMessage('B???n c???n ph???i ch???n ????? 5 c???u th???.')
                return
            }

            if (isChoosingPlayer) {
                return
            }

            choosePlayer(listIdPlayer, setIsShowFilter)
        }

        const handleSelectPlayer = (e, player) => {
            e.preventDefault()
            if (playerSelect.includes(player ? .id)) {
                const filteredItems = playerSelect.filter(item => item !== player ? .id)
                setPlayerSelect(filteredItems)
            } else {
                if (playerSelect.length < 5) {
                    setPlayerSelect([...playerSelect, player ? .id])
                }
            }
        }

        const handleRefreshSelect = (e) => {
            e.preventDefault()

            setPlayerSelect([])
        }

        return ( <
            div className = "wrap-players" >
            <
            div className = "container" >
            <
            div className = "row" >
            <
            div className = "col-12" >
            <
            h2 className = "title" > D??? ??o??n c???u th??? < /h2> <
            p className = "sub-title sub-title--2" >
            D??? ??o??n c???u th??? S??? T??NG ch??? s??? sau v??ng 1: 8 ????? nh???n qu?? l?? sao UCL. < br / >
            L??u ??: Vui l??ng ho??n th??nh m???t l?????t ch??i ????? d??? ??o??n <
            /p> <
            div className = "filter-actions" >
            <
            a href = "#"
            className = "filter-actions__img-filter"
            onClick = {
                e => hanldeShowFilter(e)
            } >
            <
            img src = "/images/btn-filter.png"
            alt = "" / >
            <
            /a> <
            a href = "#"
            className = "filter-actions__btn"
            onClick = {
                e => {
                    e.preventDefault()
                }
            } >
            L?????t d??? ??o??n: {
                selections ? .status == -1 ? 1 : 0
            } <
            /a> <
            /div> <
            /div> <
            /div> <
            div className = "row" >
            <
            div className = "col-12" >
            <
            div className = "players" > {
                Array(5).fill().map((_, index) => {

                    let img = ''
                    if (selections ? .status === -1) {
                        img = "/images/card.png"
                    } else {
                        img = selections ? .players && selections ? .players[index] ? selections ? .players[index] ? .image : "/images/card.png"
                    }

                    return ( <
                        div className = "players__item"
                        key = {
                            index
                        } > {
                            selections ? .status === -1 ? ( <
                                img src = {
                                    img
                                }
                                alt = "" / >
                            ) : ( <
                                >
                                <
                                img src = "https://cdn.vn.garenanow.com/web/fo4vn//Khoa/2023/T3/22UCL/ucl_the.png"
                                alt = "" / >
                                <
                                div className = "players__item__info" >
                                <
                                img src = {
                                    img
                                }
                                alt = ""
                                className = "players__item__info--avatar" / >
                                <
                                span className = "players__item__info--name" > {
                                    selections ? .players && selections ? .players[index] ? selections ? .players[index] ? .name : ''
                                } <
                                /span> <
                                span className = "players__item__info--overall" > {
                                    selections ? .players && selections ? .players[index] ? selections ? .players[index] ? .overall : ''
                                } <
                                /span> <
                                span className = "players__item__info--salary" > {
                                    selections ? .players && selections ? .players[index] ? selections ? .players[index] ? .salary : ''
                                } <
                                /span> <
                                span className = "players__item__info--pos" > {
                                    selections ? .players && selections ? .players[index] ? selections ? .players[index] ? .position : ''
                                } <
                                /span> <
                                /div> <
                                />
                            )
                        }

                        <
                        a href = "#"
                        className = {
                            `btn btn--white${selections?.players && selections?.players[index] && selections?.players[index]?.new_overall > selections?.players[index]?.overall ? ' btn--correct' : ' btn--fail'}`
                        }
                        onClick = {
                            e => {
                                e.preventDefault()
                            }
                        } >
                        d??? ??o??n {
                            selections ? .status == 1 && ( <
                                span className = "correct" > {
                                    selections ? .players && selections ? .players[index] && selections ? .players[index] ? .new_overall > selections ? .players[index] ? .overall ? ': ????ng' : ': Sai'
                                } < /span>
                            )
                        } <
                        /a> <
                        /div>
                    )
                })
            } <
            /div> <
            /div> <
            /div> <
            /div> {
                isShowFilter && ( <
                        div className = "filter-player" >
                        <
                        div className = "filter-player__wrap" >
                        <
                        a href = "#"
                        className = "filter-player__close"
                        onClick = {
                            e => {
                                e.preventDefault()
                                setIsShowFilter(false)
                            }
                        } > X < /a> <
                        div className = "filter-player__top" >
                        <
                        div className = "filter-player__options" >
                        <
                        div className = "filter-player__options__box filter-player__options__box--name" >
                        <
                        form action = ""
                        onSubmit = {
                            e => {
                                e.preventDefault()
                                setFilterName(currentText)
                            }
                        } >
                        <
                        input type = "text"
                        value = {
                            currentText
                        }
                        onChange = {
                            e => setCurrentText(e.target.value)
                        }
                        /> <
                        button type = "submit" >
                        <
                        span >
                        <
                        img src = "/images/icon-search.png"
                        alt = "" / >
                        <
                        /span> <
                        /button> <
                        /form> <
                        /div> <
                        div className = "filter-player__options__box" > {
                            filterNationality ? filterNationality : 'qu???c gia'
                        } <
                        span >
                        <
                        img src = "/images/arrow-down.png"
                        alt = "" / >
                        <
                        /span> <
                        div className = "filter-player__options__list" >
                        <
                        Scrollbar style = {
                            {
                                height: "25vw"
                            }
                        }
                        noScrollX = {
                            true
                        } >
                        <
                        div >
                        <
                        a href = "#"
                        onClick = {
                            e => {
                                e.preventDefault();
                                setFilterNationality("all")
                            }
                        } > T???t c??? < /a> {
                            listNationality.length > 0 && listNationality.map((item, index) => {
                                return ( <
                                    a href = "#"
                                    key = {
                                        index
                                    }
                                    onClick = {
                                        e => {
                                            e.preventDefault();
                                            setFilterNationality(item)
                                        }
                                    } > {
                                        item
                                    } < /a>
                                )
                            })
                        } <
                        /div> <
                        /Scrollbar> <
                        /div> <
                        /div> <
                        div className = "filter-player__options__box" > {
                            filterPosition ? filterPosition : 'V??? tr??'
                        } <
                        span >
                        <
                        img src = "/images/arrow-down.png"
                        alt = "" / >
                        <
                        /span> <
                        div className = "filter-player__options__list" >
                        <
                        div >
                        <
                        a href = "#"
                        onClick = {
                            e => {
                                e.preventDefault();
                                setFilterPosition("all")
                            }
                        } > T???t c??? < /a> {
                            listPosition.map((position, index) => {
                                return ( <
                                    a href = "#"
                                    key = {
                                        index
                                    }
                                    onClick = {
                                        e => {
                                            e.preventDefault();
                                            setFilterPosition(position)
                                        }
                                    } > {
                                        position
                                    } < /a>
                                )
                            })
                        } <
                        /div> <
                        /div> <
                        /div> <
                        div className = "filter-player__options__box" > {
                            filterOvr ? filterOvr : "OVR"
                        } <
                        span >
                        <
                        img src = "/images/arrow-down.png"
                        alt = "" / >
                        <
                        /span> <
                        div className = "filter-player__options__list" >
                        <
                        Scrollbar style = {
                            {
                                height: "25vw"
                            }
                        }
                        noScrollX = {
                            true
                        } >
                        <
                        div >
                        <
                        a href = "#"
                        onClick = {
                            e => {
                                e.preventDefault();
                                setFilterOvr("all")
                            }
                        } > T???t c??? < /a> {
                            listOvr.map((item, index) => {
                                return ( <
                                    a href = "#"
                                    key = {
                                        index
                                    }
                                    onClick = {
                                        e => {
                                            e.preventDefault();
                                            setFilterOvr(item)
                                        }
                                    } > {
                                        item
                                    } < /a>
                                )
                            })
                        } <
                        /div> <
                        /Scrollbar> <
                        /div> <
                        /div> <
                        /div> <
                        div className = "filter-player__actions" >
                        <
                        a href = "#"
                        onClick = {
                            e => handleChoosePlayer(e)
                        } >
                        <
                        span > X??c nh???n < /span> <
                        img src = "/images/icon-checl.png"
                        alt = "" / >
                        <
                        /a> <
                        a href = "#"
                        onClick = {
                            e => handleRefreshSelect(e)
                        } >
                        <
                        span > Ch???n l???i < /span> <
                        img src = "/images/refresh.png"
                        alt = "" / >
                        <
                        /a> <
                        /div> <
                        /div> <
                        div className = "filter-player__list" >
                        <
                        table className = "table-player" >
                        <
                        thead >
                        <
                        tr >
                        <
                        th width = "15%" > V??? tr?? < /th> <
                        th width = "35%" > T??n c???u th??? < /th> <
                        th width = "15%" > L????ng < /th> <
                        th width = "20%" > OVR < /th> <
                        th width = "15%" > Ch???n({
                                playerSelect.length
                            }
                            /{maxSelect})</th >
                            <
                            /tr> <
                            /thead> <
                            /table> <
                            Scrollbar style = {
                                {
                                    height: "25vw"
                                }
                            }
                            noScrollX = {
                                true
                            } >
                            <
                            table className = "table-player" >
                            <
                            tbody > {
                                listPlayers.map((player, index) => {
                                    return ( <
                                        tr key = {
                                            index
                                        } >
                                        <
                                        td width = "15%" > {
                                            player ? .position
                                        } <
                                        /td> <
                                        td width = "35%" > {
                                            player ? .name
                                        } < /td> <
                                        td width = "15%" > {
                                            player ? .salary
                                        } < /td> <
                                        td width = "20%" > {
                                            player ? .overall
                                        } < /td> <
                                        td width = "15%" >
                                        <
                                        a href = "#"
                                        className = {
                                            `table-player__checkbox${playerSelect.includes(player?.id) ? ' active' : ''}`
                                        }
                                        onClick = {
                                            e => handleSelectPlayer(e, player)
                                        } >
                                        <
                                        span >
                                        <
                                        img src = "/images/icon-check-pink.png"
                                        alt = "" / >
                                        <
                                        /span> <
                                        /a> <
                                        /td> <
                                        /tr>
                                    )
                                })
                            } <
                            /tbody> <
                            /table> <
                            /Scrollbar> <
                            /div> <
                            /div> <
                            /div>
                        )
                    } <
                    /div>
            )
        }

        export default Players