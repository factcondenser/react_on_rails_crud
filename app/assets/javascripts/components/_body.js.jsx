class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
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

  handleCreate(event) {
    event.preventDefault();
    const name = this.state.name
    const description = this.state.description
    if (name == '' || description == '') {
      alert('Neither name nor description can be blank');
    } else {
      // must use 'this' here b/c createItem is defined on the component,
      // not within handleCreate
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
        console.log('Item successfully created!');
        // WRONG - passing an object
        // const newState = this.state.items.concat(item);
        // this.setState({
        //   items: newState,
        //   name: '',
        //   description: ''
        // });
        // CORRECT - passing a function with prevState
        this.setState(
          (prevState, props) => ({
            items: prevState.items.concat(item),
            name: '',
            description: ''
          })
        );
      });
  }

  handleUpdate(item) {
    console.log(`Update item ${item.id}`);
    if (item.name == '' || item.description == '') {
      alert('Neither name nor description can be blank');
    } else {
      // must use this here, since createItem is defined on the component, not within handleCreate
      this.updateItem({ item: item });
    }
  }

  updateItem(opts) {
    const id = opts.item.id
    fetch(`api/v1/items/${id}`, {
      method: 'put',
      // must include headers, or it won't work
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    })
      .then((res) => res.json())
      .then((item) => {
        console.log(`Item ${id} successfully updated!`);
        this.setState(function(prevState, props) {
          let newItems = prevState.items.slice();
          const index = newItems.findIndex((i) => (i.id == item.id));
          newItems[index] = item;
          return { items: newItems }
        });
      });
  }

  handleDestroy(id) {
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
          this.setState(
            (prevState, props) => ({
              items: prevState.items.filter((item) => {
                return item.id != id
              })
            })
          );
        } else {
          console.log(`Network error occurred.`);
        }
      });
  }

  render() {
    return (
      <div>
        <AllItems
          items={this.state.items}
          handleUpdate={this.handleUpdate}
          handleDestroy={this.handleDestroy}
        />
        <NewItem
          name={this.state.name}
          description={this.state.description}
          handleChange={this.handleChange}
          handleSubmit={this.handleCreate}
        />
      </div>
    );
  }
}
