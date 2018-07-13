class ItemForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item
    const namePlaceholder = item ? this.props.name : 'Enter the name of the item';
    const descriptionPlaceholder = item ? this.props.description : 'Enter the description of the item';
    const buttonText = item ? 'Save Changes' : 'Submit';

    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name:
          <input
            name='name'
            type='text'
            placeholder={namePlaceholder}
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
            placeholder={descriptionPlaceholder}
            value={this.props.description}
            onChange={this.props.handleChange}
          />
        </label>
        <input type="submit" value={buttonText} />
      </form>
    );
  }
}
