import { Link } from 'react-router-dom';
import { eventBusService } from '../services/eventBusService';

export function UserPreview({ user, removeUser, openEditUserModal }) {
  function onRemoveUser(ev) {
    ev.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      removeUser(user._id);
      eventBusService.emit('delete', user._id);
    }
  }

  function OnEditUser(ev) {
    ev.stopPropagation();
    openEditUserModal(user._id);
  }

  return (
    <article
      className='user-preview'
      style={{ backgroundImage: `url(${user.userImage})` }}
    >
      <Link to={`/user/${user._id}`} className='info'>
        <h2>
          {user.name.first} {user.name.last}
        </h2>
        <h3>{user.location.country}</h3>
      </Link>
      <section className='actions'>
        <button onClick={OnEditUser}>Edit User</button>
        <button onClick={onRemoveUser}>X</button>
      </section>
    </article>
  );
}
