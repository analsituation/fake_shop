import React from 'react'

const Home = () => {
  return (
    <>
      <h3 className="text-3xl text-cyan-700 text-center font-medium">
        Home
      </h3>
      <div className="mt-14 w-[60%] mx-auto font-mono text-gray-300 bg-gray-900 px-1 py-2">
        <p>$ Welcome to my first pet-project /</p>
        <p>Sorry about such a boring main page. Probably it should be the products page here /</p>
        <p>This SPA works with <a className="no-underline text-cyan-700" href='https://fakestoreapi.com/'>fakestoreapi.com</a> API /</p>
        <p>There isn&apos;t much functionality here /</p>
        <p>Specifically, the following has been implemented: /</p>
        <p className="underline">Authorization, getting goods from the server, search, sorting by category, adding products to cart and saving the session data /</p>
        <p>RTK, RTK Query, Tailwind was used /</p>
        <p>I see that the result is terrible, so I am open to criticism /</p>
        <p>And lastly, this is just the beginning...</p>
        <br/>
        <br/>
        <p>root@vm762189:~# client_loop: send disconnect: Connection reset</p>
      </div>
    </>


  )
}

export default Home