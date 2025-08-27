package com.example.mbti.service;

import com.example.mbti.dto.RegDto;
import com.example.mbti.model.Reg;
import com.example.mbti.repository.RegRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegService {

    @Autowired
    private RegRepository regRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 회원가입
    public Reg register(RegDto dto) {
        Reg reg = new Reg();
        reg.setUserid(dto.getUserid());
        reg.setPassword(passwordEncoder.encode(dto.getPassword()));
        reg.setNickname(dto.getNickname());
        reg.setBirth(dto.getBirth());
        reg.setPhone(dto.getPhone());
        reg.setEmail(dto.getEmail());
        reg.setGender(dto.getGender());
        return regRepository.save(reg);
    }

    // ID 중복 체크
    public boolean isUseridAvailable(String userid) {
        return !regRepository.findByUserid(userid).isPresent();
    }

    // 닉네임 중복 체크
    public boolean isNicknameAvailable(String nickname) {
        return !regRepository.findByNickname(nickname).isPresent();
    }
}
