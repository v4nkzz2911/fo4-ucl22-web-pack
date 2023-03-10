import "core-js/stable"
import "regenerator-runtime/runtime"

// 1) Object.assign
// ------------------------------------
// We can't rely on Object.assign being a function since it may be buggy, so
// defer to `object-assign`. If our Object.assign implementation is correct
// (determined by `object-assign` internally) the polyfill will be discarded
// and the native implementation used.
Object.assign = require('object-assign')

// 2) Promise
// ------------------------------------
if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable()
    window.Promise = require('promise/lib/es6-extensions.js')
}

// 3) Fetch
// ------------------------------------
// Fetch polyfill depends on a Promise implementation, so it must come after
// the feature check / polyfill above.
if (typeof window.fetch === 'undefined') {
    require('whatwg-fetch')
}


import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
    const App = require('./routes').default

    ReactDOM.render( <
        App store = {
            store
        }
        />,
        MOUNT_NODE
    )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
    if (module.hot) {
        const renderApp = render
        const renderError = (error) => {
            const RedBox = require('redbox-react').default

            ReactDOM.render( < RedBox error = {
                    error
                }
                />, MOUNT_NODE)
            }

            render = () => {
                try {
                    renderApp()
                } catch (e) {
                    console.error(e)
                    renderError(e)
                }
            }

            // Setup hot module replacement
            module.hot.accept()
            // module.hot.accept([
            //   './routes/index',
            // ], () =>
            //   setImmediate(() => {
            //     ReactDOM.unmountComponentAtNode(MOUNT_NODE)
            //     render()
            //   })
            // )
        }
    }

    // Let's Go!
    // ------------------------------------
    if (!__TEST__) render()