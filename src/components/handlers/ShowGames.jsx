import React, { useState, useEffect } from 'react'
import axios from "axios";
import Pagination from './Pagination';
import { useNavigate } from "react-router-dom";
import ShowGame from './ShowGame';
import Footer from '../Wrapper/Footer';

export default function ShowGames({category, platform, sort, title}) {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(48)
    const [gameId]= useState(null)

      // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    
    useEffect(() => {
        let options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            params: {'sort-by': sort, platform: platform, category: category},
            headers: {
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
                'X-RapidAPI-Key': 'a747c78b0emshbb6611ca068d29cp19a88ajsnd06816a76109'
                }
            };

        axios
            .get(options.url, options)
            .then(res => {
                setPosts(res.data)
            setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    })


    return (
        <div className='games-cont'>
        {gameId === null &&
            <div>
                <h1 className='mt-5'>{title} GAMES</h1>
                <hr className='hr-main' />
                {loading &&
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                }
                  <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
                <div className='card-container'>
                    {currentPosts.map(posts => (
                        <div className="card card-gap" key={posts.id} onClick={() => navigate('/game/' + posts.id)}>
                            <img src={posts.thumbnail} className="card-img-top" alt=''></img>
                            <div className='card-body'>
                                <h4 className='card-title' key={posts.id}>
                                    {posts.title}
                                </h4>
                                <p>{posts.release_date}</p>
                                <p>{posts.platform}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
            </div>
            }
            <Footer />
        {gameId != null && <ShowGame />}
  
        </div>
  )
}
