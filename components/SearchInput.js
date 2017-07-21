import React, { Component } from 'react'

class SearchInput extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      inputText: ''
    }
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addTodo(this.state.inputText)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Search photos..."
            value={this.state.inputText}
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" value="Search"/>
        </form>
      </div>
    )
  }

}

export default SearchInput
