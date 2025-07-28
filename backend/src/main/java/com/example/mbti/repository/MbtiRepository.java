package com.example.mbti.repository;

import com.example.mbti.entity.Mbti;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MbtiRepository extends JpaRepository<Mbti, Integer> {
}
