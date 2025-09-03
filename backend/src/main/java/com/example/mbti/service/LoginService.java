package com.example.mbti.service;

import com.example.mbti.dto.LoginDto;
import com.example.mbti.model.Login;
import com.example.mbti.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 회원가입
    public Login register(LoginDto loginDto) {
        Login login = new Login();
        login.setUserid(loginDto.getLoginId());
        login.setPassword(passwordEncoder.encode(loginDto.getPassword()));
        login.setName(loginDto.getName());
        return loginRepository.save(login);
    }

    // 로그인
    public boolean login(String userid, String password) {
        Optional<Login> userOpt = loginRepository.findByUserid(userid);
        if (userOpt.isPresent()) {
            return passwordEncoder.matches(password, userOpt.get().getPassword());
        }
        return false;
    }
}
