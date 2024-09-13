package com.giftcard.backend.giftcard_backend.Repository;

import com.giftcard.backend.giftcard_backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // To find user by email
}
