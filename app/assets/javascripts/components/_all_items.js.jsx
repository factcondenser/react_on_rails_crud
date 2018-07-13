class AllItems extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDestroy(id) {
    this.props.handleDestroy(id);
  }

  render() {
    const items = this.props.items.map((item) => {
      return (
        <div key={item.id}>
          <Item item={item}
            handleUpdate={this.props.handleUpdate}
            handleDestroy={this.handleDestroy.bind(this, item.id)}
          />
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
