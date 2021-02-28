import React, { useState, useEffect } from 'react';
// import { persistStore } from 'redux-persist';
import axios from 'axios';
import '../Css/SubList.css';


function List(props) {
    const datas =  JSON.parse(localStorage.getItem('user_id'));
    const [sub_list, setSub_list] = useState(JSON.parse(localStorage.getItem('data_sub')));
    const [clickSubject, setClickSubject] = useState(null);
    const [sub_list_view, setSub_list_view] = useState(null); // 질문, 자료실, 수업 시작 등 클릭 시의 뷰 담당
    const [question, setQuestion] = useState(null); //질문 데이터 저장
    // console.log(data_listsSub);

    useEffect(()=> {
      upLoad()
      ListItem()
    },[props.add])

    const upLoad = () => {
            axios.post(`http://54.146.88.72:3000/list/subject/${datas}`)
            .then((res) => {
              console.log(res); 
              //세션 (문자열로만 저장이 되기 때문에 반드시 제이슨을 써야함)
              try {
                console.log(JSON.stringify(res.data.result));
                  localStorage.setItem('data_sub', JSON.stringify(res.data.result));
                  setSub_list(JSON.parse(localStorage.getItem('data_sub')));
                } catch (e) {
                  console.log('과목 리스트 에러' + e);
                }
              // console.log(res.data)
            });
    }
  
    const ListItem = () => {
      if(sub_list == null){
        return (
          <>
            
          </>
        )
      }  
      const qna_list = () => {
        console.log(sub_list_view);
        (sub_list_view == null) ? setSub_list_view(
          <div className='sub_list_view'>
            <div>
              <p>질문</p>
            </div>
            <div>
              <p>질문 리스트</p>
            </div>
          </div>
        ) : setSub_list_view(null);

      }
      const lists = sub_list.map( (item) => {
        let myColor = "rgba(204,204,204,0.8)";
        if(item.classOnline){
          myColor = "white";
        }
        // console.log(item);
        let ClickEvent = item.className == clickSubject ? (
          <div className="sub_bar" onClick={(e) => listClick(e, item.className)} >
            {item.className}
            <button className='btn_sytle'> 참가 </button>
            <button className='btn_sytle'> 자료실 </button>
            <button className='btn_sytle' onClick={qna_list}> 질문 </button>
          </div>
        ) : <div className="sub_bar" onClick={(e) => listClick(e, item.className)} > {item.className} </div>;
        
        return (
          <tr  className='table_style' style={{
            display : 'block',
            width : '250px',
            height: '30px',
            backgroundColor: myColor,
            border: 'black soild 1px',
            margin: '10px 0px', }}>
             {ClickEvent}
          </tr>
        )
      });

      const listClick = (e, value) => {
        setClickSubject( clickSubject == value ? null : value);
      }
      console.log(lists);
      return (
        <table> {lists} </table>
        );
    }

    return(
        <div className='List_Sub'>
          <div className="SubList_Subject_Frame">
            <ListItem />
          </div>
            {sub_list_view}
        </ div>
    );
}


export default List;