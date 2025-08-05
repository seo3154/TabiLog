package com.example.mbti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mbti.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
