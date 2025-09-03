// src/main/java/com/example/mbti/repository/MbtiRepository.java
package com.example.mbti.repository;

import com.example.mbti.model.Mbti;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MbtiRepository extends JpaRepository<Mbti, Long> {
    Optional<Mbti> findByName(String name);

    Optional<Mbti> findByNameIgnoreCase(String name); // ← 있으면 서비스에서 이거 쓰자

}
