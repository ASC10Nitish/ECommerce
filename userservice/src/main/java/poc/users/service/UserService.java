package poc.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import poc.users.model.Users;
import poc.users.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;


     public List<Users> getAllUsers()
     {
         return userRepo.findAll();
     }

     public Optional<Users> getUserById(int userId)
     {
       return userRepo.findById(userId);
     }

     public Users createUser(Users user)
     {
         return userRepo.save(user);
     }

     public Users updateUser(int userId,Users updatedUser)
     {
         Optional<Users> existingUser = userRepo.findById(userId);

         if (existingUser.isPresent()) {
             Users user = existingUser.get();
             user.setName(updatedUser.getName());
             user.setEmail(updatedUser.getEmail());
             return userRepo.save(user);
         } else {
             throw new RuntimeException("User not found with ID: " + userId);
         }
     }

    public void deleteUserById(int userId) {
        if (!userRepo.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepo.deleteById(userId);
    }

}
