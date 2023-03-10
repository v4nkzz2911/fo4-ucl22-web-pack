import React, {
    useState
} from 'react'
import Modal from 'react-modal'
import Scrollbar from 'react-scrollbars-custom'
import dayjs from 'dayjs'

import config from 'config/common'
import lib from 'lib/commons'
import Spinner from 'components/Spinner'


Modal.setAppElement('#root');

const ModalPredict = ({
    currentMatch,
    voteInfo,
    isVoting,
    voteMatch,
    voteHistory,
    delta,
    token,
    modalStatus,
    closeModal
}) => {
    const [currentResult, setCurrentResult] = useState(null)
    const [currentToken, setCurrentToken] = useState()
    const [useStar, setUseStar] = useState(false)
    const [msgResult, setMsgResult] = useState('')
    const [msgToken, setMsgToken] = useState('')
    const matchInfo = voteInfo[currentMatch.id]


    const afterOpenModal = () => {}

    const selfClose = (event) => {
        event.preventDefault()
        closeModal()
    }

    const handleSelectResult = (result, e) => {
        e.preventDefault()
        if (matchInfo) {
            return false
        }
        setCurrentResult(result)
        setMsgResult('')
    }

    const handleToken = (e) => {
        e.preventDefault();
        setCurrentToken(e.target.value)
        if (e.target.value % 10 == 0 && e.target.value) {
            setMsgToken('')
        }
        if (e.target.value) {
            setMsgToken('')
        }
    }

    const handleConfirm = (e) => {
        e.preventDefault()

        if (dayjs().add(delta, 'ms') >= dayjs(currentMatch.start_time) || currentMatch.result) {
            lib.showMessage('Đã quá thời gian dự đoán')
            return false
        }

        if (matchInfo) {
            return false
        }

        if (currentResult === null) {
            setMsgResult('Vui lòng lựa chọn kết quả!')
            return false
        }

        if (!currentToken) {
            setMsgToken('Vui lòng nhập số sao dự đoán!')
            return false
        }

        if (token < currentToken) {
            lib.showMessage('Bạn không đủ sao để dự đoán.')
            return false
        }

        if (currentToken < 100) {
            lib.showMessage('Số sao dự đoán tối thiểu là 100 sao.')
            return false
        }

        if (currentToken % 10 != 0) {
            setMsgToken('Số sao dự đoán phải chia hết cho 10')
            return false
        }

        if (isVoting) {
            return false
        }

        let roundMatchs = voteHistory.filter(i => i.round == currentMatch.round)
        let starUsed = false

        if (roundMatchs.length) {
            for (let index = 0; index < roundMatchs.length; index++) {
                const match = roundMatchs[index];

                if (match.star) {
                    starUsed = true
                    break
                }
            }
        }

        if (starUsed && useStar) {
            lib.showMessage('Bạn đã sử dụng ngôi sao hi vọng cho vòng này rồi!')
            return false
        }

        lib.showMessage('<strong>Bạn chắc chắn với dự đoán này?</strong>', 'Hủy').then(res => {
            if (res.value) {
                voteMatch(currentMatch.id, currentResult, useStar ? 1 : 0, currentToken)
            }
        })
    }

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
        className = "animated fadeInDown faster modal-predict" >
        <
        div className = "modal-description" >
        <
        h2 > Dự đoán trận đấu < /h2> <
        div className = "predict-area" >
        <
        div className = "predict-area__team" >
        <
        div className = "predict-area__ratio" >
        <
        a href = "#"
        className = {
            currentResult === 0 || (matchInfo && matchInfo.result === 0) ? ' active' : ''
        }
        onClick = {
            e => handleSelectResult(0, e)
        } > {
            currentMatch.team_1
        }
        Thắng x {
            currentMatch.win_odd
        } < /a> <
        /div> <
        div className = "predict-area__ratio" >
        <
        a href = "#"
        className = {
            currentResult == 1 || (matchInfo && matchInfo.result == 1) ? ' active' : ''
        }
        onClick = {
            e => handleSelectResult(1, e)
        } > Hoà x {
            currentMatch.draw_odd
        } < /a> <
        /div> <
        div className = "predict-area__ratio" >
        <
        a href = "#"
        className = {
            currentResult == 2 || (matchInfo && matchInfo.result == 2) ? ' active' : ''
        }
        onClick = {
            e => handleSelectResult(2, e)
        } > {
            currentMatch.team_2
        }
        Thắng x {
            currentMatch.lose_odd
        } < /a> <
        /div> <
        /div>

        <
        div className = "predict-area__bottom" >
        <
        div className = "predict-area__action" >
        <
        input type = "number"
        name = "token"
        placeholder = "NHẬP SAO"
        value = {
            matchInfo && matchInfo.token ? matchInfo.token : currentToken || ''
        }
        onChange = {
            e => handleToken(e)
        }
        /> <
        /div> <
        div className = {
            `checkbox-custom${useStar || (matchInfo && matchInfo.star == 1) ? ' active' : ''}`
        }
        onClick = {
            e => {
                e.preventDefault();
                if (matchInfo) {
                    return
                }
                setUseStar(!useStar)
            }
        } >
        <
        span href = "#" >
        sử dụng ngôi sao hy vọng để nhân đôi sao <
        /span> <
        /div> <
        /div> <
        div className = "predict-area__btn" >
        <
        a href = "#"
        className = "btn btn--predict-modal"
        onClick = {
            e => handleConfirm(e)
        } > {
            matchInfo ? 'Đã dự đoán' : 'Dự đoán'
        } < /a> <
        /div> <
        /div>

        <
        div className = "text-center" > {
            msgResult && ( <
                p className = "text-danger" > {
                    msgResult
                } < /p>
            )
        } {
            msgToken && ( <
                p className = "text-danger" > {
                    msgToken
                } < /p>
            )
        } <
        /div> <
        /div> <
        a onClick = {
            event => selfClose(event)
        }
        className = "close"
        data - dismiss = "modal"
        aria - label = "Close" > ×
        <
        /a> <
        /Modal>
    )
}
export default ModalPredict