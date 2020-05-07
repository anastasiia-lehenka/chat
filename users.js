let users = [];

const addUser = (id, username) => {
  const isExistingUser = users.find(user => user.username === username);

  // if (isExistingUser) {
  //     return new Error ('Username is taken');
  // }
    
    if (isExistingUser) {
    return;
    }

  const user = {
      _id: id,
      username
  };

  users.push(user);
  return user;
}

const removeUser = id => {
    users = users.filter(user => user._id !== id);
    return users;
}

const getUser = id => users.find(user => user._id === id);

const geAllUsers = () => users;

module.exports = {addUser, removeUser, getUser, geAllUsers};