import { recipeService } from '../service'
import { recipeConstants } from '../_constants'

export const recipeActions = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  getMoreRecipes
}

function dis(obj, request, success, failure) {
  let word, start, count, filter
  if (obj)  {
    word = obj.word
    start = obj.start || 0
    count = obj.count || 12
    filter = obj.filter
  }
  return dispatch => {
    dispatch(request())
    if (word) {
      recipeService.getRecipeByTitle(word, start, count, filter)
        .then(recipe => dispatch(success(recipe)))
        .catch(error => dispatch(failure(error)))
    } else if (filter) {
      recipeService.getRecipeByTitle('', start, count, filter)
        .then(recipe => dispatch(success(recipe)))
        .catch(error => dispatch(failure(error)))
    } else {
      recipeService.getRecipes(obj)
        .then(recipes => dispatch(success(recipes)))
        .catch((err) => dispatch(failure(err)))
    }
  }
}

function getRecipes(obj) {
  return dis(obj, request, success, failure)
  function request() { return { type: recipeConstants.GET_ALL_REQUEST } }
  function success(recipes) { return { type: recipeConstants.GET_ALL_SUCCESS, recipes } }
  function failure(error) { return { type: recipeConstants.GET_ALL_FAILURE, error } }
}

function getMoreRecipes(obj) {
  return dis(obj, request, success, failure)
  function request() { return { type: recipeConstants.GET_MORE_REQUEST } }
  function success(recipes) { return { type: recipeConstants.GET_MORE_SUCCESS, recipes } }
  function failure(error) { return { type: recipeConstants.GET_MORE_FAILURE, error } }
}

function getRecipe(recipeId) {
  return dispatch => {
    dispatch(request(recipeId))
    if (!recipeId) {
      dispatch(failure('Empty ID'))
    } else {
      recipeService.getRecipe(recipeId)
        .then((recipe) => dispatch(success(recipe)))
        .catch((err) => dispatch(failure(err)))
    }
  }
    
  function request(recipe) { return { type: recipeConstants.GET_REQUEST, recipe } }
  function success(recipe) { return { type: recipeConstants.GET_SUCCESS, recipe } }
  function failure(error) { return { type: recipeConstants.GET_FAILURE, error } }
}

function createRecipe(user, recipe) {
  return dispatch => {
    dispatch(request(user))
  }
    
  function request(user) { return { type: recipeConstants.CREATE_REQUEST, user } }
  function success(user) { return { type: recipeConstants.CREATE_SUCCESS, user } }
  function failure(error) { return { type: recipeConstants.CREATE_FAILURE, user } }
}

function deleteRecipe(user, recipeId) {
  return dispatch => {
    dispatch(request(user))
  }
    
  function request(user) { return { type: recipeConstants.DELETE_REQUEST, user } }
  function success(user) { return { type: recipeConstants.DELETE_SUCCESS, user } }
  function failure(error) { return { type: recipeConstants.DELETE_FAILURE, user } }
}