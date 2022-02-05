import { Component } from 'react';
import { userService } from '../services/userService';

export class UserDetails extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await userService.getById(this.props.match.params.id);
    this.setState({ user });
  }

  onGoBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { user } = this.state;
    if (!user) return <div>Loading..</div>;
    return (
      <div className='user-details'>
        <h1>
          {user.name.title} {user.name.first} {user.name.last}
        </h1>
        <h3>Email: {user.email}</h3>
        <img src={user.userImage} alt='' />
        <h3>
          Location: {user.location.country}, {user.location.city},{' '}
          {user.location.street.number} {user.location.street.name}.
        </h3>
        <h4>Id: {user._id}</h4>
        <button className='back-btn' onClick={this.onGoBack}>
          Back
        </button>
      </div>
    );
  }
}
