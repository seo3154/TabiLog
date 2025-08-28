package com.example.mbti.repository;

import com.example.mbti.model.Reg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegRepository extends JpaRepository<Reg, Long> {
    Optional<Reg> findByUserid(String userid);
    Optional<Reg> findByNickname(String nickname);
}
