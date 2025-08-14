package com.example.mbti.repository;

import com.example.mbti.model.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);

    @Query("select u from User u left join fetch u.mbti m where u.loginId = :loginId")
    Optional<User> findByLoginIdWithMbti(@Param("loginId") String loginId);

    @Query("select u from User u left join fetch u.mbti m")
    List<User> findAllWithMbti();
}
