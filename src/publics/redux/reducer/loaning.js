const initialState = {
    loaningList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const loaning = (state = initialState, action) => {
    switch (action.type) {

        case 'POST_LOANING_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_LOANING_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_LOANING_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                loaningList: action.payload.data.result,
            }
        case 'GET_LOANING_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'GET_LOANING_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_LOANING_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                loaningList: action.payload.data.result,
            }
        case 'UPDATE_LOANING_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'UPDATE_LOANING_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'UPDATE_LOANING_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                loaningList: action.payload.data.result,
            }
        case 'GET_LOAN_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'GET_LOAN_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_LOAN_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                loaningList: action.payload.data.result,
            }
        default:
            return state
    }
};

export default loaning