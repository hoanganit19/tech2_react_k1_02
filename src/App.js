import logo from './logo.svg';
import './App.css';
import Member from './Member';
import Comment from './Comment';
import User from './User';
import React from 'react';
import MemberInfo from './MemberInfo';
import Counter from './Counter';
import Users from './Users';
import Form from './Form';

const check = false;

const isLogin = null;

/*
Nếu check = true => <h1>Kết quả đúng</h1>

Nếu check = false => <h2>Kết quả sai</h2>
*/

// let heading = null;
// if (check){
//   heading = <h1>Kết quả đúng</h1>
// }else{
//   heading = <h2>Kết quả sai</h2>
// }

const heading = check ? <h1>Kết quả đúng</h1>:<h2>Kết quả sai</h2>

const renderHeading = () => {
    return check ? <h1>Kết quả đúng</h1>:<h2>Kết quả sai</h2>;
}

/*
function tenHam(){

}

const tenHam = function(){

}
*/

const product = {
    id: 1,
    name: 'Sản phẩm 1',
    price: 12000,
    stock: true //false => hết hàng, true => còn hàng
}

// let fullName = -1;
// if (fullName){
//   console.log('true');
// }else{
//   console.log('false');
// }

// let productInfo;
// if (product.stock){
//   productInfo = <>
//     <p>ID: {product.id}</p>
//     <p>Name: {product.name}</p>
//     <p>Price: {product.price}</p>
//     <p>Stock: {product.stock ? 'In Stock':'Out Stock'}</p>
//   </>
// }

const renderProduct = () => {
  
  let productInfo = null;
  if (product.stock){
      productInfo = 
      <>
        <p>ID: {product.id}</p>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Stock: {product.stock ? 'In Stock':'Out Stock'}</p>
      </> 
  }

  return productInfo;

  // return (
  //     product.stock ? 
  //     <>
  //       <p>ID: {product.id}</p>
  //       <p>Name: {product.name}</p>
  //       <p>Price: {product.price}</p>
  //       <p>Stock: {product.stock ? 'In Stock':'Out Stock'}</p>
  //     </> 
  //     : false
  // );
  
}

const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com'
    },

    {
      id: 2,
      name: 'Nguyễn Văn B',
      email: 'nguyenvanb@gmail.com'
    },

    {
      id: 3,
      name: 'Nguyễn Văn C',
      email: 'nguyenvanc@gmail.com'
    },

    {
      id: 4,
      name: 'Nguyễn Văn D',
      email: 'nguyenvand@gmail.com'
    }
]

// const renderUsers = users.map((user)=>{
//   return (
//     <div key={user.id}>
//       <p>ID: {user.id}</p>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   )
// })

const renderUsers = users.map((user)=>{
  return (
    <div key={user.id}>
      <User user={user}/>
    </div>
  )
})

const member = {
  name: 'Hoàng An',
  age: 30,
  email: 'hoangan.web@gmail.com',
  comments: {
    title: 'Tiêu đề 1',
    content: 'Nội dung 1'
  },
  avatar: {
    image: 'https://picsum.photos/200',
    attributes: {
      width: '100',
      height: '50',
      alt: 'Hình ảnh của Hoàng An',
      title: "Vui lòng follow tôi",
      style: {
        boxShadow: '3px 3px 3px 5px #ccc',
        borderRadius: '20px'
      }
    }
  },

  posts: [
      {
        id: 1,
        title: 'Bài viết 01',
        content: 'Nội dung 01'
      },

      {
        id: 2,
        title: 'Bài viết 02',
        content: 'Nội dung 02'
      },

      {
        id: 3,
        title: 'Bài viết 02',
        content: 'Nội dung 03'
      }
  ]
}

function App() {
  return (
    <>
      {/* {renderProduct()} */}
      {/* {renderUsers} */}
      {/* {
        users.map(user=>{
          return (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          )
        })
      } */}

      {/* <Member 
      name={member.name} 
      age={member.age} 
      email={member.email}
      users={renderUsers}
      comments = {
      <Comment 
      title={member.comments.title}
      content = {member.comments.content}
      />}
      avatar = {member.avatar}
      posts = {member.posts}
      /> */}
      {/* {
        renderUsers
      } */}
      {/* <MemberInfo name={member.name} email={member.email}/> */}
      {/* <Counter /> */}
      {/* <Users /> */}
      <Form />
    </>
  );
}

export default App;
