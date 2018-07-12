class AllItems extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  render() {
    const items = this.props.items.map((item) => {
      return (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button
            onClick={this.handleDelete.bind(this, item.id)}
          >
            Delete
          </button>
        </div>
      );
    });

    return(
      <div>
        <h2>{items}</h2>
      </div>
    );
  }
}
