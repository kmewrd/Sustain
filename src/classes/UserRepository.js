class UserRepository {
  constructor(data) {
    this.users = data;
  }
  createAllUsers() {
		const userInstances = this.users.map(user => new User(user));
    this.users = userInstances;
	}
}

export default UserRepository;
