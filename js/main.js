import axios from 'axios';
//Get SearchForm Element
const searchForm = document.querySelector('#search-form');
//Submit Search form
searchForm.addEventListener('submit',fetchMovie);

//fetch movie data from OMDB API
function fetchMovie(e){
    e.preventDefault();
    
    const searchText = document.querySelector('#search-text').value;
    searchText.replace(' ','+');
    const fetchUrl =`http://www.omdbapi.com/?i=tt3896198&apikey=3f6a0e17&s=${searchText}&type=movie&page=1`;

    axios.get(fetchUrl)
    .then(response => {
        var ms = response.data;
        if(ms.Response){
            showMovie(ms.Search);
        }else{
            alert("error")
        }
    })
    .catch(error => {
        console.log(error);
    });
}
function showMovie(movies){
    console.log(movies);
    var result = document.getElementById('result');
    var pdiv = null;
    //Clear 
    while(result.children.length > 0){
        result.children[0].remove();
    }

    
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i]; 
        
        if(i % 3 == 0 ){
            pdiv = document.createElement('div');
            pdiv.classList.add("row");
        }
        var div = document.createElement('div');
        div.classList.add("card");
        div.classList.add("col-md-4")
        div.innerHTML =`    
            <div class="card-body">
                <h3 class="card-header">${movie.Title}</h3>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Year:${movie.Year}</li>
                    <li class="list-group-item"><img src="${movie.Poster}" width="300px" height="400px" /></li>
                </ul>
                <div class="footer">
                    <button class="btn btn-primary rounded-pill" name="nomination" id="card${movie.imdbID}" value="${movie.imdbID}" mname="${movie.Title}">Nomination</button>
                    <button class="btn btn-primary rounded-pill" name="nomcancel" value="${movie.imdbID}">Cancel</button>
                </div>
            </div>
            
            `;
            pdiv.appendChild(div);
            if((i+1) % 3 == 0 ){
                result.appendChild(pdiv);
                pdiv == null;
            }           
    }

    document.getElementsByName("nomination").forEach(item=>{
        item.addEventListener('click',(e)=>{
            console.log(e.target.value);
            var list = document.getElementById('nominationList');
            if(list.childElementCount < 5){
            var li = document.createElement('li');
            li.innerHTML = `<li id="li${e.target.value}" class="list-group-item d-flex justify-content-between align-items-center">
                            ${e.target.attributes["mname"].value}
                            <button class="btn btn-primary rounded-pill"  id="${e.target.value}">Cancel</button>
                        </li>`;
            list.appendChild(li);
            e.target.disabled = true;

            document.getElementById(e.target.value).addEventListener('click',(e)=>{
                    document.getElementById("nominationList").removeChild(e.target.parentNode.parentElement);
                    document.getElementById("card"+ e.target.id).disabled = false;
                });
            }else{
                alert("You can select five choices maximum");
            }
        })
    })
    
    document.getElementsByName("nomcancel").forEach(item=>{
        item.addEventListener('click',(e)=>{
            console.log(e.target.value);
            var li = document.getElementById('li'+ e.target.value);
            if(li != null && li != undefined){
                document.getElementById("nominationList").removeChild(li.parentElement);
                document.getElementById("card"+ e.target.value).disabled = false;
            }
        })
    })
}
