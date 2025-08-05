package com.example.mbti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mbti.model.Mbti;

public interface MbtiRepository extends JpaRepository<Mbti, Integer> {
}
