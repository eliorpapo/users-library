import { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserFilter } from '../cmps/UserFilter';
import { UserList } from '../cmps/UserList';

import { eventBusService } from '../services/eventBusService';
import { userService } from '../services/userService';
import { UserEdit } from './UserEdit';

export class UserApp extends Component {
  state = {
    users: null,
    filterBy: null,
    userToEdit: null,
  };

  removeEventBus;

  async componentDidMount() {
    this.removeEventBus = eventBusService.on('delete', (userId) => {
      console.log('user ' + userId + ' deleted');
    });
    await this.loadUsers();
  }

  async loadUsers() {
    const { filterBy } = this.state;
    const users = await userService.query(filterBy);
    this.setState({ users });
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadUsers);
  };

  removeUser = async (userId) => {
    await userService.remove(userId);
    this.loadUsers();
  };

  componentWillUnmount() {
    this.removeEventBus();
  }

  addNewUser = () => {
    const userToEdit = userService.getEmptyUser();
    this.setState({ userToEdit });
  };

  openEditUserModal = async (userId) => {
    const userToEdit = await userService.getById(userId);
    this.setState({ userToEdit });
  };

  closeEditUserModal = async () => {
    const userToEdit = null;
    await this.loadUsers();
    this.setState({ userToEdit });
  };

  render() {
    const { users, userToEdit } = this.state;
    if (!users) return <div>Loading...</div>;
    return (
      <div className={`user-app`}>
        <div className={userToEdit ? 'foggy' : ''}>
          <h2 className='fiter-title'>Filter by:</h2>
          <UserFilter onChangeFilter={this.onChangeFilter} />
          <button className='add-user-btn' onClick={this.addNewUser}>
            Add User
          </button>
          <UserList
            history={this.props.history}
            removeUser={this.removeUser}
            openEditUserModal={this.openEditUserModal}
            users={users}
          />
        </div>
        {userToEdit && (
          <UserEdit
            user={userToEdit}
            closeEditUserModal={this.closeEditUserModal}
          />
        )}
      </div>
    );
  }
}
