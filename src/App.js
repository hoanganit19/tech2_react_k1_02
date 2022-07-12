import logo from './logo.svg';
import './App.css';
import Member from './Member';
import Comment from './Comment';
import User from './User';
import React from 'react';

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

      <Member 
      name="Hoàng An" 
      age="30" 
      email="hoangan.web@gmail.com" 
      users={renderUsers}
      comments = {
      <Comment 
      title="Title 01" 
      content = "Content 01"
      />}
      />
      {/* {
        renderUsers
      } */}

    </>
  );
}

export default App;
