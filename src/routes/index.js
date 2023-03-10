import React, {
    useEffect,
    Suspense
} from 'react'
import {
    Router,
    Route
} from 'react-router-dom'
import {
    Provider
} from 'react-redux'
import {
    Switch
} from 'react-router'
import {
    createBrowserHistory as createHistory
} from 'history'

import {
    updateLocation
} from 'store/location'

import lang from 'lng'
import lib from 'lib/commons'
import config from 'config/common'

const lng = lang[config.lng]
const history = createHistory()

import MainLayout from 'layouts/PageLayout/PageLayout'
import Loading from 'components/Loading'
import RedirectRoute from 'routes/RedirectRoute'

const Home = React.lazy(() =>
    import ('routes/Home'))

const App = ({
    store
}) => {

    useEffect(() => {
        history.listen(updateLocation(store))
    }, [])

    return ( <
        Provider store = {
            store
        } >
        <
        Router history = {
            history
        }
        onUpdate = {
            () => {
                window.scrollTo(0, 0)
            }
        } >
        <
        Suspense fallback = { < Loading / >
        } >
        <
        MainLayout lng = {
            lng
        } >
        <
        Switch >
        <
        Route exact path = "/" >
        <
        Home lng = {
            lng
        }
        /> <
        /Route> <
        /Switch> <
        /MainLayout> <
        /Suspense> <
        /Router> <
        /Provider>
    )
}

export default App