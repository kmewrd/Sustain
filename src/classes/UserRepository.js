class UserRepository {
  constructor(data) {
    this.users = data;
  }
  createAllUsers() {
		this.users = this.users.map(user => new User(user));
	}
}

export default UserRepository;
