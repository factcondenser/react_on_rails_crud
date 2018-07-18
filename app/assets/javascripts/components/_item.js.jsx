class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      name: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const fieldName = target.name;
    const value = target.value;

    this.setState({
      [fieldName]: value.toUpperCase()
    });
  }

  handleEdit(event) {
    event.preventDefault();
    if (this.state.editable) {
      const id = this.props.item.id;
      const name = this.state.name;
      const description = this.state.description;
      const item = {
        id: id,
        name: name,
        description: description
      }
      this.handleUpdate(item);
    }
    this.setState(
      (prevState, props) => ({
        editable: !prevState.editable,
        name: this.props.item.name,
        description: this.props.item.description
      })
    )
  }

  handleUpdate(item) {
    this.props.handleUpdate(item);
  }

  render() {
    const editMode = this.state.editable
    return (
      editMode ?
        <ItemForm
          name={this.state.name}
          description={this.state.description}
          item={this.props.item}
          handleChange={this.handleChange}
          handleSubmit={this.handleEdit}
        /> :
        <div>
          <h3>{this.props.item.name}</h3>
          <p>{this.props.item.description}</p>
          <button onClick={this.handleEdit}>Edit</button>
          <button onClick={this.props.handleDestroy}>Delete</button>
        </div>
    );
  }
}
