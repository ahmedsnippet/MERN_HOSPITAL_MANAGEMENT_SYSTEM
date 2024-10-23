import React from 'react'
import "./Biography.css"

const Biography = ({ imageUrl }) => {
  return (
    <div className="biography container">
      <div className="banner">
        <img src={imageUrl} />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex
          magnam voluptatum consectetur reprehenderit fugiat recusandae aut
          similique illum natus velit, praesentium nostrum nesciunt.
        </p>
      </div>
    </div>
  )
}

export default Biography
