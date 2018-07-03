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
    event.preventDefault();
    const name = this.state.name
    const description = this.state.description
    console.log(name + ': ' + description)
    if (name == '' || description == '') {
      alert('Neither name nor description can be blank');
    } else {
      // must use this here, since createItem is defined on the component, not within handleSubmit
      this.createItem({
        item:
        {
          name: name,
          description: description
        }
      });
    }
  }

  createItem(opts) {
    fetch('api/v1/items', {
      method: 'post',
      // must include headers, or it won't work
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    })
      .then((res) => res.json())
      .then((res_json) => console.log('It worked!', res_json));
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
