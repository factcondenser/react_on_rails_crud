class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const fieldName = target.name;

    this.setState({
      [fieldName]: value.toUpperCase()
    });
  }

  handleSubmit(event) {
    console.log(this.state.name + ': ' + this.state.description)
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name='name'
            type='text'
            placeholder='Enter the name of the item.'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            name='description'
            type='text'
            placeholder='Enter the name of the description'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
