import Avatar from "./Avatar";
function Posts({posts, name, avatar}){

    const postsJsx = posts.map(post => {
        return (
            <div key={post.id} style={{borderBottom: '1px solid #ccc'}}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>Post By: 
                    <img 
                    src={avatar.image} 
                    style={
                        {
                            width: '20px', 
                            height: '20px',
                            borderRadius: '50%'
                        }
                    }
                    /> {name}</p>
            </div>
        )
    });

    return (
        postsJsx
    );
}

export default Posts;