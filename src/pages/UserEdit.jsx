import { Component, createRef } from 'react';
import { userService } from '../services/userService';

export class UserEdit extends Component {
  state = {
    userToEdit: null,
    userCopy: null,
  };

  inputRef = createRef();

  async componentDidMount() {
    const userToEdit = JSON.parse(JSON.stringify(this.props.user));
    const userCopy = JSON.parse(JSON.stringify(this.props.user));
    this.setState({ userCopy });
    this.setState({ userToEdit }, () => this.inputRef.current.focus());
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    var userToEdit = { ...this.state.userToEdit };
    if (field === 'first' || field === 'last') {
      userToEdit.name[field] = value;
    }
    if (field === 'country' || field === 'city') {
      userToEdit.location[field] = value;
    }
    if (field === 'name' || field === 'number') {
      userToEdit.location.street[field] = value;
    }
    if (field === 'email' || field === 'userImage') {
      userToEdit = { ...userToEdit, [field]: value };
    }
    this.setState({ userToEdit });
  };

  onSaveUser = async (ev) => {
    ev.preventDefault();
    var isValid = this.validateForm();
    if (!isValid) return;
    await userService.save({ ...this.state.userToEdit });
    this.props.closeEditUserModal();
  };

  onCancelEdit = async () => {
    if (this.state.userToEdit._id !== '') {
      await userService.save({ ...this.state.userCopy });
    }
    this.props.closeEditUserModal();
  };

  validateForm = () => {
    const form = document.forms['myForm'];

    if (
      form['first'].value.length === 0 ||
      form['last'].value.length === 0 ||
      form['email'].value.length === 0 ||
      form['country'].value.length === 0 ||
      form['city'].value.length === 0 ||
      form['number'].value === 0
    ) {
      alert('All Fields cannot be empty');
      return false;
    }

    if (form['first'].value.length < 3) {
      alert('Name must atleast 3 letters');
      return false;
    }

    const mail_format =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!form['email'].value.match(mail_format)) {
      alert('Sorry! an invalid email!');
      return false;
    }

    const userId = this.state.userToEdit._id;
    if (!userService.isMailExist(form['email'].value, userId)) {
      alert('Sorry! this email adress is been used!');
      return false;
    }

    return true;
  };

  render() {
    const { userToEdit } = this.state;
    if (!userToEdit) return <div>Loading...</div>;
    return (
      <div className='user-edit modal'>
        {userToEdit._id !== '' && <h1 className='edit-title'>Edit User</h1>}
        {userToEdit._id === '' && <h1 className='edit-title'>Add User</h1>}
        <form name='myForm' onSubmit={this.onSaveUser}>
          <section className='input-container'>
            <label htmlFor='firstName'>First name:</label>
            <input
              ref={this.inputRef}
              onChange={this.handleChange}
              value={userToEdit.name.first}
              type='text'
              name='first'
              id='firstName'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='lastName'>Last name:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.name.last}
              type='text'
              name='last'
              id='lastName'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='email'>Email:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.email}
              type='text'
              name='email'
              id='email'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='country'>Country:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.location.country}
              type='text'
              name='country'
              id='country'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='city'>City:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.location.city}
              type='text'
              name='city'
              id='city'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='number'>Number:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.location.street.number}
              type='number'
              name='number'
              id='number'
            />
          </section>
          <section className='input-container'>
            <label htmlFor='name'>Street name:</label>
            <input
              onChange={this.handleChange}
              value={userToEdit.location.street.name}
              type='text'
              name='name'
              id='name'
            />
          </section>
          {userToEdit._id === '' && (
            <section className='input-container'>
              <label htmlFor='userImage'>Image url:</label>
              <input
                onChange={this.handleChange}
                value={userToEdit.userImage}
                type='text'
                name='userImage'
                id='imgUrl'
              />
            </section>
          )}
          <button className='save'>Save</button>
        </form>
        <button className='close' onClick={this.onCancelEdit}></button>
      </div>
    );
  }
}
