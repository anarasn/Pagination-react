import React, {useState} from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

 const FetchUsers = () => {
    const [users, setUsers] = useState([]); //
    const [pageNumber, setPageNumber] = useState(0)
    const res = axios.get(url)
    .then((res)=>{
        console.log(res.data);        
        setUsers(res.data);
    })
    .catch((error)=>{
        console.log(error.message);

    });

    const usersPerPage = 10
    const pagesVisited = pageNumber * usersPerPage;
    const displayUser = users.slice(pagesVisited, pagesVisited + usersPerPage).map(user=>{
        return(
            <div className="user">
                 <img src={user.avatar_url} alt="" />
                <h4>{user.login}</h4>
                <a href={user.html_url}  target="_blank">
                <button className="profileBtn">VIEW PROFILE</button>
               </a>
            </div>
        )
    });
    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({selected}) =>{
        setPageNumber(selected)
    }

    return(
        <div className="container">
           {displayUser}
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disableClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}

            />     
        </div>
    )
    
 

}

export default FetchUsers;