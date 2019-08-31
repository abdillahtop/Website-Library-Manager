const initialState = {
    bookList: [],
    searchList: [],
    categoryList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const book = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            }
        case 'GET_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data.result,
            }
            case 'GET_MORE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            }
        case 'GET_MORE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_MORE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data.result,
            }
        case 'POST_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_BOOK_FULFILLED':
            // const apalah = state.postBook.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        case 'DETAIL_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'DETAIL_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DETAIL_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data.result,
            }
        case 'DELETE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'DELETE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DELETE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data.result,
            }
        case 'UPDATE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'UPDATE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'UPDATE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data.result,
            }
        case 'SEARCH_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'SEARCH_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'SEARCH_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                searchList: action.payload.data.result,
            }
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: action.payload.data.result,
            }
        default:
            return state

    }
};

export default book