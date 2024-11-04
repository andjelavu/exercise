export const Sidebar = ({ users, onUserSelect }) => {

  return (
    <aside className="w-1/4 bg-[rgb(28,36,75)] rounded-xl my-4 ml-4 h-screen p-4">
      <h4 className="text-xl text-[rgb(234,96,32)] font-semibold tracking-tight w-full">
        User List
      </h4>
      {users.length > 0 ? (
        <ul className="space-y-2 mb-4 custom-height overflow-y-auto py-4">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => onUserSelect(user)}
              className="h6 cursor-pointer text-white rounded p-2 hover:bg-gray-700"
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users available</p>
      )}
    </aside>
  );
};
