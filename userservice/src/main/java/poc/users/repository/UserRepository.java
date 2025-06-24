package poc.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poc.users.model.Users;

public interface UserRepository extends JpaRepository<Users,Integer> {

}
