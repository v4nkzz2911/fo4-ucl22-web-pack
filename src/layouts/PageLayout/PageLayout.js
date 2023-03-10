import React, {
    useEffect
} from 'react'
import {
    connect
} from 'react-redux'
import {
    withRouter
} from 'react-router'
import config from 'config/common'
import queryString from 'query-string'
import request from 'lib/request'

import {
    getCurrentUser,
    getHistory
} from 'authentication/actions'

import Header from './Header'

const PageLayout = ({
    lng,
    currentUser,
    getCurrentUser,
    getHistory,
    location,
    children
}) => {

    useEffect(() => {
        getCurrentUser()
        $(window).resize(function() {
            let e = $(window).width();
            e >= 1920 ? $("html").css("font-size", "10px") : e >= 1200 ? $("html").css("font-size", 10 * e / 1920 + "px") : e >= 1100 ? $("html").css("font-size", "10px") : $("html").css("font-size", 10 * e / 1300 + "px")
        })

        let width = $(window).width()
        let height = $(window).height()
        if (height >= 740 && height <= 768 && width >= 1010 && width <= 1024 ||
            height >= 1010 && height <= 1024 && width >= 1300 && width <= 1366) {
            $('html').addClass('ipad-view')
        } else {
            $('html').removeClass('ipad-view')
        }

        $(window).trigger('resize')

        const parsed = queryString.parse(location.search)
        const utm_source = parsed.utm_source
        const garena_token = parsed.garena_token
        let clientLogged = localStorage.getItem('garena_token')

        if (garena_token && garena_token != clientLogged && garena_token.length > 80) {
            request(`login/callback?access_token=${garena_token}&source_type=ingame`).then(function(response) {
                if (response.status == 'successful') {
                    localStorage.setItem('garena_token', garena_token)
                    window.location.reload()
                } else {
                    lib.showError(response.error_code)
                }
            })
        }
    }, [])

    return ( <
        >
        <
        Header lng = {
            lng
        }
        user = {
            currentUser
        }
        getHistory = {
            getHistory
        }
        /> <
        section id = "main-body"
        className = {
            `page-${location.pathname != '/' ? location.pathname.replace('/', '') : ''}`
        } >
        <
        > {
            children
        } <
        /> <
        /section> <
        footer id = "footer" >
        <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col" >
        <
        img src = "/images/footer-logo.png"
        alt = ""
        className = "footer-logo" / >
        <
        /div> <
        div className = "col" >
        <
        p className = "copyright" > ©201​ 8​ Electronic Arts Inc.EA, EA SPORTS, and the EA SPORTS logo are trademarks of Electronic Arts Inc.Official FIFA licensed product.©FIFA name and FIFA 's Official Licensed Product Logo are copyrights and/or trademarks of FIFA. All rights reserved. Manufactured under license by Electronic Arts Inc. The use of real player names and likenesses is authorized by FIFPro Commercial Enterprises BV. The Premier League Logo © The Football Association Premier League Limited 2018. The Premier League Logo is a trademark of the Football Association Premier League Limited which is registered in the UK and other jurisdictions. The Premier League Club logos are copyright works and registered trademarks of the respective Clubs. All are used with the kind permission of their respective owners. Manufactured under license from the Football Association Premier League Limited. No association with nor endorsement of this product by any player is intended or implied by the license granted by the Football Association Premier League Limited to Electronic Arts. All other trademarks are the property of their respective owners.</p> <
        /div> <
        div className = "col" >
        <
        img src = "/images/age.png"
        alt = ""
        className = "age" / >
        <
        /div> <
        /div> <
        /div> <
        /footer> <
        />
    )
}

const mapDispatchToProps = {
    getCurrentUser,
    getHistory
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLayout))