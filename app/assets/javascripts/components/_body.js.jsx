class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      description: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      .then((items) => this.setState({
        items: items,
      }));
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
      .then((item) => {
        console.log('It worked!', item);
        const newState = this.state.items.concat(item);
        this.setState({ items: newState })
      });
  }

  render() {
    return (
      <div>
        <AllItems items={this.state.items} />
        <NewItem
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
