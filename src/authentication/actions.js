import request from "lib/request"
import config from "config/app"
import lib from 'lib/commons'
import lang from "lng/index"
const lng = lang[config.lng]

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST'
export const CURRENT_USER_REQUEST_ERROR = 'CURRENT_USER_REQUEST_ERROR'
export const CURRENT_USER_REQUEST_SUCCESS = 'CURRENT_USER_REQUEST_SUCCESS'
export const CURRENT_USER_FETCHING = 'CURRENT_USER_FETCHING'

export const SPIN = 'SPIN'
export const SPIN_ERROR = 'SPIN_ERROR'
export const SPIN_SUCCESS = 'SPIN_SUCCESS'
export const IS_SPINNING = 'IS_SPINNING'

export const SHARE = 'SHARE'
export const SHARE_ERROR = 'SHARE_ERROR'
export const SHARE_SUCCESS = 'SHARE_SUCCESS'
export const IS_SHARING = 'IS_SHARING'

export const CHECK_MATCH = 'CHECK_MATCH'
export const CHECK_MATCH_ERROR = 'CHECK_MATCH_ERROR'
export const CHECK_MATCH_SUCCESS = 'CHECK_MATCH_SUCCESS'
export const IS_CHECKING_MATCH = 'IS_CHECKING_MATCH'

export const VOTE_MATCH = 'VOTE_MATCH'
export const VOTE_MATCH_ERROR = 'VOTE_MATCH_ERROR'
export const VOTE_MATCH_SUCCESS = 'VOTE_MATCH_SUCCESS'
export const IS_VOTING_MATCH = 'IS_VOTING_MATCH'

export const GET_HISTORY = 'GET_HISTORY'
export const GET_HISTORY_ERROR = 'GET_HISTORY_ERROR'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const IS_GETTING_HISTORY = 'IS_GETTING_HISTORY'

export const CLAIM = 'CLAIM'
export const CLAIM_ERROR = 'CLAIM_ERROR'
export const CLAIM_SUCCESS = 'CLAIM_SUCCESS'
export const IS_CLAIMING = 'IS_CLAIMING'

export const GET_PLAYERS_ERROR = 'GET_PLAYERS_ERROR'
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS'
export const IS_GETTING_PLAYERS = 'IS_GETTING_PLAYERS'

export const CHOOSE_PLAYERS_ERROR = 'CHOOSE_PLAYERS_ERROR'
export const CHOOSE_PLAYERS_SUCCESS = 'CHOOSE_PLAYERS_SUCCESS'
export const IS_CHOOSING_PLAYERS = 'IS_CHOOSING_PLAYERS'

let tm

export const isCurrentUserFetching = () => {
    return {
        type: CURRENT_USER_FETCHING
    }
}

export const getCurrentUser = () => {
    return (dispatch, getState) => {
        dispatch(isCurrentUserFetching());
        request('api/user/get').then(function(response) {
            if (response.status == 'successful') {
                dispatch(getCurrentUserSuccess(response));
            } else {
                if (response.error_code == 'no_account') {
                    lib.showDownlad()
                }
                dispatch(getCurrentUserError(response))
            }
        })
    }
}

export const getCurrentUserSuccess = (response) => {
    return {
        type: CURRENT_USER_REQUEST_SUCCESS,
        payload: response.payload
    }
}

export const getCurrentUserError = (response) => {
    return {
        type: CURRENT_USER_REQUEST_ERROR,
        payload: response.payload
    }
}

//Spin
export const isSpinning = (response) => {
    return {
        type: IS_SPINNING,
    }
}
export const spin = (setWinningItem) => {
    return (dispatch, getState) => {
        dispatch(isSpinning());
        request('api/user/spin', 'POST', {
            body: JSON.stringify({})
        }).then(function(response) {
            if (response.status == 'successful') {

                let items = getState().currentUser.spinPrize
                let itemArray = []
                for (let index = 0; index < items.length; index++) {
                    const item = items[index]

                    itemArray.push(item.id)
                }

                let winItem = response.payload.reward

                let shuffledArray = lib.shuffleArray([...itemArray])
                let currentIndex = 0
                let turns = 0
                let maxTurn = itemArray.length == 1 ? 1 : 6

                tm = setInterval(() => {
                    if (currentIndex == shuffledArray.length) {
                        currentIndex = 0
                    }
                    if (turns >= maxTurn && shuffledArray[currentIndex] == winItem.id) {
                        clearInterval(tm)
                        $(`.item-cover--${winItem.id}`).css('animation', 'won 1.5s')
                        setTimeout(() => {
                            $(`.item-cover--${winItem.id}`).css('animation', 'none')
                            lib.showMessage(`Bạn đã nhận được:<br><div class="item-cover"><img src="${winItem.image}" alt="" class="item-cover__img" /></div><p>${winItem.product_name}</p>`, null, 'Chúc mừng!').then(res => {
                                dispatch(spinSuccess(response))
                            })
                        }, 1500)
                    }

                    setWinningItem(shuffledArray[currentIndex])
                    currentIndex++
                    turns++
                }, 400)

            } else {
                lib.showError(response.error_code)
                dispatch(spinError(response))
            }
        })
    }
}
export const spinSuccess = (response) => {
    return {
        type: SPIN_SUCCESS,
        payload: response.payload
    }
}
export const spinError = (response) => {
    return {
        type: SPIN_ERROR,
        payload: response.payload
    }
}
//Share
export const isSharing = (response) => {
    return {
        type: IS_SHARING,
    }
}
export const share = (shareCustom = null) => {
    return (dispatch, getState) => {
        dispatch(isSharing());
        request('api/user/share', 'POST', {
            body: JSON.stringify({})
        }).then(function(response) {
            if (response.status == 'successful') {
                if (shareCustom) {
                    shareCustom()
                } else {
                    lib.showMessage('<p class="text-center">Chia sẻ thành công!</p>')
                }
                dispatch(shareSuccess(response))
            } else {
                lib.showError(response.error_code)
                dispatch(shareError(response))
            }
        })
    }
}
export const shareSuccess = (response) => {
    return {
        type: SHARE_SUCCESS,
        payload: response.payload
    }
}
export const shareError = (response) => {
    return {
        type: SHARE_ERROR,
        payload: response.payload
    }
}
// Check match
export const isCheckingMatch = (response) => {
    return {
        type: IS_CHECKING_MATCH,
    }
}
export const checkMatch = () => {
    return (dispatch, getState) => {
        dispatch(isCheckingMatch());
        request('api/user/update-daily', 'POST', {
            body: JSON.stringify({})
        }).then(function(response) {
            if (response.status == 'successful') {
                lib.showMessage(`
          <div class="row match-progress">
            <div class="col-12">
              <p>Hoàn thành trận</p>
            </div>
            <div class="col-12">
              <img src="/images/play${response.payload.play_normal}.png" alt="" class="play-progress" />
            </div>
            <div class="w-100"></div>
            <div class="col-12">
              <p>Chia sẻ Facebook</p>
            </div>
            <div class="col-12">
              <img src="/images/share${response.payload.shared ? 1 : 0}.png" alt="" class="play-progress-share" />
            </div>
          </div>
        `, null, 'Tiến độ nhiệm vụ', null).then(res => {
                    dispatch(checkMatchSuccess(response))
                })
            } else {
                lib.showError(response.error_code)
                dispatch(checkMatchError(response))
            }
        })
    }
}
export const checkMatchSuccess = (response) => {
    return {
        type: CHECK_MATCH_SUCCESS,
        payload: response.payload
    }
}
export const checkMatchError = (response) => {
    return {
        type: CHECK_MATCH_ERROR,
        payload: response
    }
}
//Vote
export const isVotingMatch = (response) => {
    return {
        type: IS_VOTING_MATCH,
    }
}
export const voteMatch = (matchId, result, star, token) => {
    return (dispatch, getState) => {
        dispatch(isVotingMatch());
        request('api/user/vote', 'POST', {
            body: JSON.stringify({
                match_id: parseInt(matchId),
                result: parseInt(result),
                star: parseInt(star),
                token: parseInt(token)
            })
        }).then(function(response) {
            if (response.status == 'successful') {
                lib.showMessage('Bạn đã bình chọn trận đấu thành công')
                dispatch(voteMatchSuccess(response))
            } else {
                lib.showError(response.error_code)
                dispatch(voteMatchError(response))
            }
        })
    }
}
export const voteMatchSuccess = (response) => {
    return {
        type: VOTE_MATCH_SUCCESS,
        payload: response.payload
    }
}
export const voteMatchError = (response) => {
    return {
        type: VOTE_MATCH_ERROR,
        payload: response
    }
}
//get history
export const isGettingHistory = () => {
    return {
        type: IS_GETTING_HISTORY
    }
}

export const getHistory = () => {
    return (dispatch, getState) => {
        dispatch(isGettingHistory());
        request('api/user/history').then(function(response) {
            if (response.status == 'successful') {
                dispatch(getHistorySuccess(response))
            } else {
                dispatch(getHistoryError(response))
            }
        })
    }
}

export const getHistorySuccess = (response) => {
    return {
        type: GET_HISTORY_SUCCESS,
        payload: response.payload
    }
}

export const getHistoryError = (response) => {
    return {
        type: GET_HISTORY_ERROR,
        payload: response.payload
    }
}
//Claim
export const isClaiming = (response) => {
    return {
        type: IS_CLAIMING,
    }
}
export const claim = (prize) => {
    return (dispatch, getState) => {
        dispatch(isClaiming());
        request('api/user/exchange', 'POST', {
            body: JSON.stringify({
                exchange_item_id: parseInt(prize.exchange_item_id)
            })
        }).then(function(response) {
            if (response.status == 'successful') {
                lib.showMessage(`Bạn đã nhận được:<br><div class="item-cover"><img src="${response.payload.reward.image}" alt="" class="item-cover__img" /></div><p>${response.payload.reward.product_name}</p>`, null, 'Chúc mừng!').then(res => {
                    dispatch(claimSuccess(response))
                })

            } else {
                lib.showError(response.error_code)
                dispatch(claimError(response))
            }
        })
    }
}
export const claimSuccess = (response) => {
    return {
        type: CLAIM_SUCCESS,
        payload: response.payload
    }
}
export const claimError = (response) => {
    return {
        type: CLAIM_ERROR,
        payload: response.payload
    }
}
//get player
export const isGettingPlayer = () => {
    return {
        type: IS_GETTING_PLAYERS
    }
}

export const getPlayers = () => {
    return (dispatch, getState) => {
        dispatch(isGettingPlayer());
        request('api/user/get-players').then(function(response) {
            if (response.status == 'successful') {
                dispatch(getPlayersSuccess(response))
            } else {
                dispatch(getPlayersError(response))
            }
        })
    }
}

export const getPlayersSuccess = (response) => {
    return {
        type: GET_PLAYERS_SUCCESS,
        payload: response.payload
    }
}

export const getPlayersError = (response) => {
    return {
        type: GET_PLAYERS_ERROR,
        payload: response.payload
    }
}
//Choose Player
export const isChoosingPlayer = (response) => {
    return {
        type: IS_CHOOSING_PLAYERS,
    }
}
export const choosePlayer = (selections, setIsShowFilter) => {
    return (dispatch, getState) => {
        dispatch(isChoosingPlayer());
        request('api/user/choose-players', 'POST', {
            body: JSON.stringify({
                selections: selections
            })
        }).then(function(response) {
            if (response.status == 'successful') {
                lib.showMessage(`Bạn đã chọn cầu thủ thành công.`, null, 'Chúc mừng!').then(res => {
                    dispatch(choosePlayerSuccess(response))
                    setIsShowFilter(false)
                })

            } else {
                lib.showError(response.error_code)
                dispatch(choosePlayerError(response))
            }
        })
    }
}
export const choosePlayerSuccess = (response) => {
    return {
        type: CHOOSE_PLAYERS_SUCCESS,
        payload: response.payload
    }
}
export const choosePlayerError = (response) => {
    return {
        type: CHOOSE_PLAYERS_ERROR,
        payload: response.payload
    }
}