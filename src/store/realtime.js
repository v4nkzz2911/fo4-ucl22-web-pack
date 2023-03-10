import io from "socket.io-client";
import config from "../config/app.js";
import lib from 'lib/commons'

let timeOut = {}

import {
    // UPDATE_CCU,
    // SWAP_RAFFLE,
    // END_RAFFLE,
    // RAFFLE_DRAWED,
    // DRAW_FINISHED,
    // ADD_RUNNING_TEXT
} from 'authentication/actions'

const opts = {
    forceNew: true,
    reconnection: false,
    path: '/socket.io'
};

const startRealtimeConnection = (store) => {
    console.log(2)

    let socket = io(config.realtimeServerAddress, opts);

    socket.on("connect", () => {
        //console.log("Connected to realtime server");
        window.raffleSocket = socket;
    });

    /**
     * Sample code:
     */
    socket.on('system', (action) => {
        store.dispatch({
            type: UPDATE_CCU,
            payload: action.ccu
        });
    })
    socket.on("swap", (action) => {
        //console.log('Swap: ');

        store.dispatch({
            type: END_RAFFLE,
            payload: {
                position: action.content.position,
                raffleId: action.content.raffle_slot_id,
                winner: action.content.win_player_name,
                currentTime: action.now,
                newRaffle: action.content.new_raffling,
            }
        });
        clearTimeout(timeOut[action.content.raffle_slot_id])
        timeOut[action.content.raffle_slot_id] = setTimeout(() => {
            store.dispatch({
                type: SWAP_RAFFLE,
                payload: {
                    newRaffle: action.content.new_raffling,
                    position: action.content.position,
                    raffleId: action.content.raffle_slot_id,
                    nextId: action.content.new_queuing,
                    winner: action.content.win_player_name,
                    currentTime: action.now,
                }
            });
        }, 1000)
        if (action.content.win_player_name) {
            let raffleObj = store.getState().currentUser.currentRaffles
            let raffleInfo = lib.toObj(store.getState().currentUser.raffles, 'id')

            store.dispatch({
                type: ADD_RUNNING_TEXT,
                payload: action.content.win_player_name + ' vừa rút được ' + raffleInfo[raffleObj[action.content.position].raffle_item_id].name
            });
        }
    });

    socket.on("draw", (action) => {
        //console.log('draw: ');

        store.dispatch({
            type: RAFFLE_DRAWED,
            payload: {
                position: action.content.position,
                raffleId: action.content.raffle_slot_id,
                remain_ticket: action.content.remain_ticket
            }
        });

        setTimeout(() => {
            store.dispatch({
                type: DRAW_FINISHED,
                payload: {
                    position: action.content.position,
                    raffleId: action.content.raffle_slot_id
                }
            });
        }, 500)
    });

    socket.on("disconnect", () => {
        //console.log("Connection was closed");
        lib.showReload()
    });
}
export default startRealtimeConnection