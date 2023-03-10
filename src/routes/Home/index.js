import {
    connect
} from 'react-redux'
import HomeView from './components/HomeView'

import {
    spin,
    checkMatch,
    share,
    claim,
    voteMatch,
    getPlayers,
    choosePlayer
} from 'authentication/actions'

const mapDispatchToProps = {
    spin,
    checkMatch,
    share,
    claim,
    voteMatch,
    getPlayers,
    choosePlayer
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)