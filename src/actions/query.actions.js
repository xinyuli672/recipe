import { queryConstants } from '../_constants'

export const queryActions = {
  query
}

function query(word) {
  return dispatch => {
    dispatch(request())
    dispatch(success(word))

    function request() { return { type: queryConstants.QUERY_REQUEST } }
    function success(word) { return { type: queryConstants.QUERY_SUCCESS, word} }
    function failure(error) { return { type: queryConstants.QUERY_FAILURE, error} }
  }
}