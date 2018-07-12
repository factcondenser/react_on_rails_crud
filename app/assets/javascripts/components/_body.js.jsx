class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    const fieldName = target.name;
    const value = target.value;

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
        console.log('Item successfully created!', item);
        // TODO: use prevState here??
        const newState = this.state.items.concat(item);
        this.setState({ items: newState });
      });
  }

  handleDelete(id) {
    console.log(`Destroy item ${id}`);
    this.destroyItem(id);
  }

  destroyItem(id) {
    fetch(`api/v1/items/${id}`, {
      method: 'delete'
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Item ${id} successfully destroyed!`);
          // TODO: use prevState here??
          // const newState = this.state.items.splice(id, 1);
          const newState = this.state.items.filter((item) => {
            return item.id != id
          });
          this.setState({ items: newState });
        } else {
          console.log(`Network error occurred.`)
        }
      });
  }

  render() {
    return (
      <div>
        <AllItems
          items={this.state.items}
          handleDelete={this.handleDelete}
        />
        <NewItem
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
