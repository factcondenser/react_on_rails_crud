class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    console.log('NewItem component about to mount.');
  }

  render() {
    return(
      <div>
        <h2>NewItem component goes here.</h2>
      </div>
    );
  }
}
