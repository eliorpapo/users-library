import { UserPreview } from './UserPreview';

export function UserList({ users, removeUser, openEditUserModal }) {
  return (
    <section className='user-list simple-cards-grid'>
      {users.map((user) => (
        <UserPreview
          removeUser={removeUser}
          openEditUserModal={openEditUserModal}
          user={user}
          key={user._id}
        />
      ))}
    </section>
  );
}
