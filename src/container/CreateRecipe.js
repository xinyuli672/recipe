/* eslint-disable linebreak-style */
import React, {Component} from 'react'

import { Link } from 'react-router-dom'
import { Container,SubTitle, Box, Hero, Title, Input, Button, Notification } from 'reactbulma'

import './onboard.css'

class CreateRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inName: '',
      ingredients: [{ inName: ''}] ,
      stepDesc: '',
      steps: [{ stepDesc: ''}],
      notify: false
    }

  }


  handleMakeRecipe = () => {

  }

    handleAddStep = () => {
      this.setState({
        steps: this.state.steps.concat([{stepDesc: ''}])
      })
    }

    handleAddIngredient = () => {
      this.setState({
        ingredients: this.state.ingredients.concat([{inName: ''}])
      })
    }

    handleRemoveIngredient = (idx) => () => {
      this.setState({
        ingredients: this.state.ingredients.filter((s, inIdx) => idx !== inIdx)
      })
    }


    handleRemoveStep = (idx) => () => {
      this.setState({
        steps: this.state.steps.filter((s, sIdx) => idx !== sIdx)
      })
    }
    render() {
      return (
        <Container fluid id="primary-container">
          <Title className="center"> Create New Recipe</Title>
          <Box>
            <div className="make-recipe-margin">
              <SubTitle>Recipe Name</SubTitle>
              <input className="input margin" type="text" placeholder="Insert the name of your recipe" id="recipeName"></input>
            </div>

            <div className="make-recipe-margin">
              <SubTitle >Description</SubTitle>
              <input className="input margin" type="text" placeholder="Insert the name of your recipe" id="Description"></input>
            </div>

            <div className="make-recipe-margin">
              <SubTitle className="make-recipe-margin">Ingredients</SubTitle>
              <table className="step-table">
                {this.state.ingredients.map((ingredient, idx) => (
                  <tr className="margin">
                    <td>
                      <input className="input margin ingredient-input" type="text" placeholder={`Ingredient #${idx + 1}`} id="Ingredient"></input>
                    </td>
                    <td className="has-text-center">
                      <Button className="ingredient-button" onClick={this.handleRemoveIngredient(idx)}>
                            Remove Ingredient
                      </Button>
                    </td>
                  </tr>
                ))}
              </table>
              <Button onClick={this.handleAddIngredient}>Add Ingredient</Button>
            </div>

            <div className="make-recipe-margin">
              <SubTitle>Nutrition Facts</SubTitle>
              <input className="input margin" type="text" placeholder="Insert the name of your recipe" id="Nutrition"></input>
            </div>

            <div className="make-recipe-margin">
              <SubTitle>Instructions</SubTitle>
              <table className="step-table">
                {this.state.steps.map((step, idx) => (
                  <tr className="margin">
                    <th className="step-numbering margin"> {idx + 1} </th>
                    <td className="step-input">
                      <input className="input" type="text" placeholder={`Step #${idx + 1}`} id="Step"></input>
                    </td>
                    <td className="has-text-center">
                      <Button className="margin" onClick={this.handleRemoveStep(idx)}>Remove Step</Button>
                    </td>
                  </tr>
                ))}
              </table>
              <Button onClick={this.handleAddStep}>Add Step</Button>
            </div>

            <div className="create-recipe-button-div">
              <Button className="is-large create-recipe-button "  onClick={this.handleMakeRecipe}> Make Recipe! </Button>
            </div>
          </Box>
        </Container>
      )
    }


}



export default CreateRecipe
