class NewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ItemForm
        name={this.props.name}
        description={this.props.description}
        item={null}
        handleChange={this.props.handleChange}
        handleSubmit={this.props.handleSubmit}
      />
      // <form onSubmit={this.props.handleSubmit}>
      //   <label>
      //     Name:
      //     <input
      //       name='name'
      //       type='text'
      //       placeholder='Enter the name of the item.'
      //       value={this.props.name}
      //       onChange={this.props.handleChange}
      //     />
      //   </label>
      //   <br />
      //   <label>
      //     Description:
      //     <input
      //       name='description'
      //       type='text'
      //       placeholder='Enter the description of the item'
      //       value={this.props.description}
      //       onChange={this.props.handleChange}
      //     />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
    );
  }
}
