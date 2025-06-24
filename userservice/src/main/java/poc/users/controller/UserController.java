package poc.users.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poc.users.model.Users;
import poc.users.service.UserService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Users> getAllUsers()
    {
       return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public Optional<Users> getUserById(@PathVariable int userId)
    {
     return userService.getUserById(userId);
    }

//    @PostMapping
//    public Users createUser(@Valid @RequestBody Users user)
//    {
//        return userService.createUser(user);
//    }

    @PostMapping
    public ResponseEntity<Users> createUser(@Valid @RequestBody Users user) {
        Users savedUser = userService.createUser(user);
        URI location = URI.create("/users/" + savedUser.getUserId()); // Assuming getUserId() exists
        return ResponseEntity.created(location).body(savedUser);
    }

    @PutMapping("/{userId}")
    public Users updateUser(@Valid @PathVariable int userId,@RequestBody Users updatedUser)
    {
        return userService.updateUser(userId,updatedUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable int userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.noContent().build(); // Returns 204
    }

}
