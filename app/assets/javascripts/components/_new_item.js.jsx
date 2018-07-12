class NewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name:
          <input
            name='name'
            type='text'
            placeholder='Enter the name of the item.'
            value={this.props.name}
            onChange={this.props.handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            name='description'
            type='text'
            placeholder='Enter the name of the description'
            value={this.props.description}
            onChange={this.props.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
