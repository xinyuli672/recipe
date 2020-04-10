import { filterConstants } from '../_constants'

export const filterActions = {
  filter  
}

function filter(filter) {
  return dispatch => {
    dispatch(request())
    if (filter === 'meal_id' || filter === 'aggregate_rating' || filter === 'total_time' || filter === 'yield') {
      dispatch(success(filter))
    } else {
      dispatch(failure('Not a valid filter'))
    }

    function request() { return { type: filterConstants.FILTER_REQUEST } }
    function success(filter) { return { type: filterConstants.FILTER_SUCCESS, filter} }
    function failure(error) { return { type: filterConstants.FILTER_REJECT, error} }
  }
}