class AllItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // TODO: requires babel-polyfill or some config with babel and/or webpack
  // async componentDidMount() {
  //   let res = await fetch('api/v1/items.json');
  //   let res_json = await res.json();
  //   this.setState({
  //     items: res_json,
  //   });
  // }

  componentDidMount() {
    fetch('api/v1/items.json')
      .then((res) => res.json())
      .then((res_json) => this.setState({
        items: res_json,
      }));
  }

  render() {
    const items = this.state.items.map((item) => {
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
