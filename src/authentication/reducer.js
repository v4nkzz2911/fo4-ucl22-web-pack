import config from 'config/app'
import lib from 'lib/commons'

import {
    CURRENT_USER_REQUEST_ERROR,
    CURRENT_USER_REQUEST_SUCCESS,
    CURRENT_USER_FETCHING,

    SHARE_ERROR,
    SHARE_SUCCESS,
    IS_SHARING,

    SPIN_ERROR,
    SPIN_SUCCESS,
    IS_SPINNING,

    CHECK_MATCH_ERROR,
    CHECK_MATCH_SUCCESS,
    IS_CHECKING_MATCH,

    VOTE_MATCH_ERROR,
    VOTE_MATCH_SUCCESS,
    IS_VOTING_MATCH,

    GET_HISTORY_ERROR,
    GET_HISTORY_SUCCESS,
    IS_GETTING_HISTORY,

    CLAIM_ERROR,
    CLAIM_SUCCESS,
    IS_CLAIMING,

    GET_PLAYERS_ERROR,
    GET_PLAYERS_SUCCESS,
    IS_GETTING_PLAYERS,

    CHOOSE_PLAYERS_ERROR,
    CHOOSE_PLAYERS_SUCCESS,
    IS_CHOOSING_PLAYERS

} from './actions'

const initialState = {
    loading: false,
    login: false,
    user: {},
    eventStarted: 0,
    currentTime: null,
    playerPieces: [],
    spinPrize: [],
    exchangePrizes: [],
    matches: [],
    choosePlayerTime: false,
    userHistory: [],
    delta: 0,
    players: [],

    isSpinning: false,
    isCheckingMatch: false,
    isSharing: false,
    isVoting: false,
    isGettingHistory: false,
    isClaiming: false,
    isGettingPlayers: false,
    isChoosingPlayer: false,
}

export default function currentUserReducer(state = initialState, {
    type,
    payload
} = action) {
    switch (type) {
        case CURRENT_USER_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                login: true,
                user: payload.user,
                eventStarted: payload ? .event_started,
                currentTime: payload ? .current_datetime,
                playerPieces: payload ? .player_pieces,
                spinPrize: payload ? .spin_prize,
                exchangePrizes: payload ? .exchange_prizes,
                matches: payload ? .matches,
                choosePlayerTime: payload ? .choose_player_time,
                delta: new Date(lib.convertDateForIos(payload.current_datetime)).getTime() - new Date().getTime(),
                errorGlobal: ''
            }
            break;
        case CURRENT_USER_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                eventStarted: payload ? .event_started,
                currentTime: payload ? .current_datetime,
                playerPieces: payload ? .player_pieces,
                spinPrize: payload ? .spin_prize,
                exchangePrizes: payload ? .exchange_prizes,
                matches: payload ? .matches,
                choosePlayerTime: payload ? .choose_player_time,
                delta: new Date(lib.convertDateForIos(payload.current_datetime)).getTime() - new Date().getTime(),
                errorGlobal: 'Không có thông tin user',
            }
            break;
        case CURRENT_USER_FETCHING:
            return {
                ...state,
                loading: true
            }
            break;

            //SPIN
        case SPIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    spin_times: payload.user.spin_times,
                    token: payload.user.token
                },
                isSpinning: false
            }
            break;
        case SPIN_ERROR:
            return {
                ...state,
                isSpinning: false
            }
            break;
        case IS_SPINNING:
            return {
                ...state,
                isSpinning: true
            }
            break;

            //SHARE
        case SHARE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    spin_times: payload.user.spin_times,
                    total_spin_times: payload.user.total_spin_times,
                    user_vote: payload.user.user_vote,
                },
                isSharing: false
            }
            break;
        case SHARE_ERROR:
            return {
                ...state,
                isSharing: false
            }
            break;
        case IS_SHARING:
            return {
                ...state,
                isSharing: true
            }
            break;

            //CHECK MATCH
        case CHECK_MATCH_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    spin_times: payload.user.spin_times,
                    total_spin_times: payload.user.total_spin_times,
                    user_vote: payload.user.user_vote,
                    choose_player_allowed: payload.user.choose_player_allowed,
                },
                isCheckingMatch: false
            }
            break;
        case CHECK_MATCH_ERROR:
            return {
                ...state,
                isCheckingMatch: false
            }
            break;
        case IS_CHECKING_MATCH:
            return {
                ...state,
                isCheckingMatch: true
            }
            break;

            //VOTE MATCH
        case VOTE_MATCH_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    user_vote: payload.user.user_vote,
                    token: payload.user.token,
                    vote_history: payload.user.vote_history,
                },
                matches: state.matches.map(match => match.id == payload.match.id ? {
                    ...match,
                    ...payload.match
                } : match),
                isVoting: false
            }
            break;
        case VOTE_MATCH_ERROR:
            return {
                ...state,
                isVoting: false
            }
            break;
        case IS_VOTING_MATCH:
            return {
                ...state,
                isVoting: true
            }
            break;

            //GET HISTORY
        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                userHistory: payload,
                isGettingHistory: false
            }
            break;
        case GET_HISTORY_ERROR:
            return {
                ...state,
                isGettingHistory: false
            }
            break;
        case IS_GETTING_HISTORY:
            return {
                ...state,
                isGettingHistory: true
            }
            break;

            //CLAIM
        case CLAIM_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    exchange_prize_history: payload.user.exchange_prize_history,
                    token: payload.user.token,
                },
                isClaiming: false
            }
            break;
        case CLAIM_ERROR:
            return {
                ...state,
                isClaiming: false
            }
            break;
        case IS_CLAIMING:
            return {
                ...state,
                isClaiming: true
            }
            break;

            //GETTING PLAYERS
        case GET_PLAYERS_SUCCESS:
            return {
                ...state,
                players: payload.players,
                isGettingPlayers: false
            }
            break;
        case GET_PLAYERS_ERROR:
            return {
                ...state,
                isGettingPlayers: false
            }
            break;
        case IS_GETTING_PLAYERS:
            return {
                ...state,
                isGettingPlayers: true
            }
            break;

            //CHOOSE PLAYERS
        case CHOOSE_PLAYERS_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    selections: payload.user.selections,
                },
                isChoosingPlayer: false
            }
            break;
        case CHOOSE_PLAYERS_ERROR:
            return {
                ...state,
                isChoosingPlayer: false
            }
            break;
        case IS_CHOOSING_PLAYERS:
            return {
                ...state,
                isChoosingPlayer: true
            }
            break;

        default:
            return state
    }
}