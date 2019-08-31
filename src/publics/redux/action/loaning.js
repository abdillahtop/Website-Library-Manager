import axios from 'axios';

export const postLoaning = (data) => {

    return {
        type: 'POST_LOANING',
        payload: axios.post(`https://api-library-abdi.herokuapp.com/loan`, data)
    }
}

export const getLoaning = (Token, UserId) => {
    return {
        type: 'GET_LOANING',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/loan`, {
            headers: {
                'x-access-token': 'bearer ' + Token,
                'x-control-user': UserId
            }
        })
    }
}

export const updateLoaning = (loaningid, data) => {
    return {
        type: 'UPDATE_LOANING',
        payload: axios.patch(`https://api-library-abdi.herokuapp.com/loan/${loaningid}`, data)
    }
}

export const getLoaningUser = (cardid, Token, UserId) => {
    console.log("ID card :", cardid)
    console.log("Token :", Token)
    console.log("User id:", UserId)

    return {
        type: 'GET_LOAN_USER',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/loan/${cardid}`, {
            headers: {
                'x-access-token': 'bearer ' + Token,
                'x-control-user': UserId
            }
        })

    }
}