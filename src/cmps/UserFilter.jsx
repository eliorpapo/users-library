import { Component } from 'react';

export class UserFilter extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    country: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const { value } = target;
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    const { firstName, lastName, email, id, country } = this.state;
    return (
      <form className='user-filter'>
        <section className='input-container'>
          <input
            placeholder='First name'
            onChange={this.handleChange}
            value={firstName}
            type='text'
            name='firstName'
            id='firstName'
          />
        </section>
        <section className='input-container'>
          <input
            placeholder='Last name'
            onChange={this.handleChange}
            value={lastName}
            type='text'
            name='lastName'
            id='lastName'
          />
        </section>
        <section className='input-container'>
          <input
            placeholder='Email'
            onChange={this.handleChange}
            value={email}
            type='text'
            name='email'
            id='email'
          />
        </section>
        <section className='input-container'>
          <input
            placeholder='Id'
            onChange={this.handleChange}
            value={id}
            type='text'
            name='id'
            id='id'
          />
        </section>
        <section className='input-container'>
          <input
            placeholder='Location'
            onChange={this.handleChange}
            value={country}
            type='text'
            name='country'
            id='country'
          />
        </section>
      </form>
    );
  }
}
