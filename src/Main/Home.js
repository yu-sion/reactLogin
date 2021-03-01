import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { persistStore } from 'redux-persist';

import axios from 'axios';
import List from './SubList';
import '../Css/Home.css';

function Home({ userData, setUserData }) {
  // 학생, 교수 고유 id 값 들어갈 변수
  // 이름이 변경 되었을 때 바뀔 localStorage
  // 과목 추가시 띄울 변수
    const history = useHistory();
    
    const [ formNode, setFormNode ] = useState(null) ;
    const [ group_add, setGroup_add] = useState(null);
    const user_Id = JSON.parse(localStorage.getItem('user_id')); 
    const [add, setAdd] = useState(JSON.parse(localStorage.getItem('sub_add')));
    const [user_datas_list, setUser_datas_list] = useState(JSON.parse(localStorage.getItem('data_user')));// 이미 구글 로그인 정보가 있는 경우.
    console.log(user_datas_list)

    useEffect(()=>{

    },[user_datas_list])

    useEffect(()=>{
      console.log('useE')
    }, [add])
    useEffect(()=>{

    }, [group_add]);

    const Logout = () => {
      console.log('asdasdasdsad')
      localStorage.clear();
      return history.push('');
    }; 


    const changeInfo = (e)=>{
      e.preventDefault()
      const name = document.getElementById('Info_Name');
      const mail = document.getElementById('Info_Mail');
      const phone = document.getElementById('Info_Phone');
      console.log(name)
      console.log(mail)
      const data = {
          name  : name.value,
          mail    : mail.value,
          phone  : phone.value,
      }
      axios.post(`http://54.146.88.72:3000/main/modifyuser/${user_Id}` , {data} )
          .then((res) => {// Add this to reload the page.
              try {
                  console.log(res)
                  const datas = {
                    userName : name.value,
                    userMail : mail.value,
                    userPhone : phone.value
                  }
                  localStorage.setItem('data_user', JSON.stringify(datas));
                  setUser_datas_list(JSON.parse(localStorage.getItem('data_user')));
                  console.log()
                } catch (e) {
                  console.log('정보수정 에러' + e);
                }
      }).catch((err)=>{
        //정보 수정 에러시 유저가 입력한 데이터 값을 일단 저장시킴
        localStorage.setItem('data_user', JSON.stringify(data));
    });
      information_Del()
  }
    function information_Del() {
        setFormNode(null) ;
    }

    async function InfoData() {
      console.log('sadfdsfsdf');
        //엑시오스 호출 후 데이터 정보? 유저정보 불러오기
        await axios.post(`http://54.146.88.72:3000/main/userinfo/${user_Id}`)
        .then((res) => {
          console.log(res); 
          try {
              // console.log(userData)
            } catch (e) {
              console.log('정보수정 클릭시 나오는 정보 에러 : ' + e);
            }
          // console.log(userData.data)
        }).catch((err) => {
          console.log('정보수정 데이터 다른걸로 띄우시오')
          const data = {
            userName : user_datas_list.name,
            userMail : user_datas_list.mail,
            userPhone : user_datas_list.phone,
          }
          localStorage.setItem('user_datas_list', JSON.stringify(data));
          // localStorage.setItem('data_info', JSON.stringify('user_datas_list'));
        })
        setFormNode(
        <from className='input_info'>
              이름      <input type='text' id='Info_Name'  name='name' defaultValue={user_datas_list.userName} /> <br/>
              이메일    <input type='text' id='Info_Mail' name='email'defaultValue={user_datas_list.userMail} /><br/>
              전화번호      <input type='text' id='Info_Phone' name='usrId' defaultValue={user_datas_list.userPhone} /><br/>
            <button onClick={changeInfo}> 수정하기 </button>
            <button onClick={information_Del}> 취소 </button>
        </from>
        )
    }
    const subAdd = () => {
      const sbj_name = document.getElementById('subject');
      //과목 추가 // //createSub/check/:subName/:classRanNum/:userId
      const data = {
        subName : sbj_name.value,
      }
      axios.post(`http://54.146.88.72:3000/main/createsub/${user_Id}`, {data})
      .then((res) => {
        try {
          
          localStorage.setItem('sub_add', JSON.stringify(res.data));
          setAdd(JSON.parse(localStorage.getItem('sub_add')));
          // console.log(userData)
        } catch (e) {
          console.log('과목 추가 에러' + e);
        }
      })
      setGroup_add(null);
    }

    function group_Add(){
      setGroup_add(
        group_add == null ? (
        <div className='set_group'  accept-charset="utf-8" >
             <div> <h1>그룹명</h1> </div>
             <div> <input className="Home_addSubejct_input" 
                     name="subject" 
                     id="subject"
                     size="40"
                     placeholder="과목명 또는 그룹 이름을 적어주세요."/> </div>
              <div> <button onClick={subAdd}> 추가  </button> </div>
        </div>) : null
      )
    }

    /*

      if(student) {
        return (
          <student />
        )
      }else if(teacher){
        return (
          <teacher />
        )
      }
      {(type == student)? <> : <> }

    */
   console.log(JSON.parse(localStorage.getItem('user_id')))
  return (
    <div className="Home_body">
      <div className="Home_Header"> 
        <div className="Home_Logo"> 新塾 </div>
        <div className="Infromation_change_Main">
                {formNode}
        </div>
        <div className="Home_bar">
          <div className="Home_userName"> {user_datas_list.userName} 님 </div>
          <div className="Home_option"> 
            <div className="Home_Logout"> <button className="Home_Logout_Btn" onClick={Logout}> 로그아웃 </button> </div>
            <div className="Home_DataChange"> <button className="Home_change_Btn" onClick={InfoData}> 정보수정 </button> </div>
          </div>
        </div>
      </div>
      <div className="Home_Content"> 
        <div className="Home_Content_list_Subject"> 
           <div className="Home_Content_Option"> 
              <div className="Home_Content_Option_addSub"> 
                <button onClick={group_Add}> 그룹추가 </button> 
              </div>
            </div>
         </div>
         <div className="Home_Content_addSubject"> 
             {group_add}
             <List add = {add}/>
          </div>
       </div>
     </div>
   );
 }

export default Home;