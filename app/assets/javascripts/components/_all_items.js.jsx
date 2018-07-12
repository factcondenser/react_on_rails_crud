class AllItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map((item) => {
      return (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
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
