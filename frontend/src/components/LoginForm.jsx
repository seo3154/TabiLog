import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [userid, setUserid] = useState('');
  const [available, setAvailable] = useState(null);

  const checkDuplicate = async () => {
    try {
      const res = await axios.post('http://localhost:3001/check-id', { userid });
      setAvailable(res.data.available); // true/false
    } catch (err) {
      alert('서버 오류');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userid}
        onChange={e => setUserid(e.target.value)}
        placeholder="아이디"
      />
      <button type="button" onClick={checkDuplicate}>중복확인</button>
      {available === true && <span style={{color:'green'}}>사용 가능</span>}
      {available === false && <span style={{color:'red'}}>이미 사용 중</span>}
    </div>
  );
}

export default SignupForm;
