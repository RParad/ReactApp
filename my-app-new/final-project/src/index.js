import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FilmSearchResult extends React.Component {
  render() {
    const header1 = "Films Available";
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="1">
              <h3>{header1}</h3>
            </th>
          </tr>
        </thead>
      </table>
    );
  }
}

class FilmResults extends React.Component {
  render() {
    const film = this.props.film;
    const title = film.title;
    const filmduration = film.length;
    return (
      <tr>
        <td>{title}</td>
        <td>{filmduration}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component { 
  render() {
      const Rows = []
    this.props.filmRows.forEach((film) => {
        Rows.push(<FilmResults film={film} key={film.movieId} />);
      });  
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Film Length</th>
          </tr>
        </thead>
        <tbody>{Rows}</tbody>
      </table>
    );
  }
}

class FilmSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }
  handleSubmit(submitEvent) {
    
    submitEvent.preventDefault();
    //this.props.onSearchTextSubmit(event.target.value)
  }

  render() {
    //const searchText = this.props.searchText;
    return (
      <form onSubmit={(e) =>{
          this.props.handleClick(e)}}>
        <label>
          Film Title:
          <input
            type="text"
            placeholder="Search films"
            value={this.props.searchText}
            onChange={this.handleSearchTextChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
class SearchFilms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      allFilms: [],
     filmRows: [], //this.renderAllFilms(),
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
}

componentDidMount() {
    fetch("http://localhost:8080/films")
        .then((response) => response.json())
        .then((jsonData) => {
                // console.log(jsonData)
            this.setState({
                allFilms: jsonData,
                filmRows: jsonData
            });
        })
      
}

handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  renderAllFilms() {
    const filmRows = [];

    this.props.films.forEach((film) => {
      filmRows.push(<FilmResults film={film} key={film.movieId} />);
    });

    return filmRows;
  }

  handleClick(event) {
    alert("A search for " + this.state.searchText + " was submitted");
    event.preventDefault();
    const searchText = this.state.searchText;

    const filmRows = [];

    this.state.allFilms.forEach((film) => {
      if (
        film.title.toLowerCase().indexOf(searchText.toLowerCase()) === -1
      ) {
        return;
      }
      filmRows.push(film);
    });

    this.setState({
        filmRows: filmRows,
    })
  }

  render() {
    
    return (
      <div>
        <FilmSearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.handleSearchTextChange}
          onSearchTextSubmit={this.handleSubmit}
          handleClick = {this.handleClick} />

        <FilmTable
          films={this.props.films}
          searchText={this.state.searchText}
          filmRows = {this.state.filmRows}/>
      </div>
    );
  }
}

class EditFilms extends React.Component {

  render() {
    return (
      <div>
        <div>
          <FilmSearchResult />
          <SearchFilms films={this.props.films} />
        </div>

        <div>
          <AddAFilm />
          </div>
        <div>
          <RemoveAFilm />
        </div>
      </div>
    );
  }
}


// componentDidMount() {
//     fetch("http://localhost:8080/films")
//         .then((response) => response.json())
//         .then((jsonData) => {

//             this.setState({
//                 AllFilms: jsonData
//             });
//         });
// }


// function sendJSON(){
			
//     let filmid = document.querySelector('#filmid');
//     let title = document.querySelector('#title');
//     let filmduration = document.querySelector('#filmduration')
//     let languageid = document.querySelector('#languageid')
    
//     // Creating a XHR object
//     let xhr = new XMLHttpRequest();
//     let url = "/films/{film_id}";

//     // open a connection
//     xhr.open("POST", url, true);

//     // Set the request header i.e. which type of content you are sending
//     xhr.setRequestHeader("Content-Type", "application/json");

//     // Create a state change callback
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {

//             // Print received data from server
//             title.innerHTML = this.responseText;

//         }
//     };

//     // Converting JSON data to string
//     var data = JSON.stringify({ "filmid": filmid.value, "title": title.value, "filmduration": filmduration.value, "languageid": languageid.value });

//     // Sending data with the request
//     xhr.send(data);
// }



class AddAFilm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h4>To add, edit or delete a film, please fill in all fields</h4>
        </div>
        <div>
          <FilmDataEntryBoxes />
        </div>
      </div>
    );
  }
}

class FilmDataEntryBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AddTitle: "",
      AddID: "",
      AddFilmID: "",
      AddLength: "",
      EditID: "",
      EditLength: "",
      EditTitle: "",
      EditFilmID: ""
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeFilmID = this.handleChangeFilmID.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleEditID = this.handleEditID.bind(this);
    this.handleEditFilmID = this.handleEditFilmID.bind(this);
    this.handleEditLength = this.handleEditLength.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }
  handleChangeTitle(event) {
    this.setState({ AddTitle: event.target.value });
  }
  handleChangeID(event) {
    this.setState({ AddID: event.target.value });
  }
  handleChangeFilmID(event) {
    this.setState({ AddFilmID: event.target.value });
  }
  handleChangeLength(event) {
    this.setState({ AddLength: event.target.value });
  }
  handleEditTitle(event) {
    this.setState({ EditTitle: event.target.value });
  }
  handleEditID(event) {
    this.setState({ EditID: event.target.value });
  }
  handleEditFilmID(event) {
    this.setState({ EditFilmID: event.target.value });
  }
  handleEditLength(event) {
    this.setState({ EditLength: event.target.value });
  }

  handleSubmit(event) {
    alert("You have added " + this.state.AddTitle);
    event.preventDefault();
  }
  handleEditSubmit(event) {
    alert ("You have Editted " + this.state.EditTitle);
    event.preventDefault(); 
  }
  render() {
    return (
      <div>
        <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Film Title:
          <input
            type="text" placeholder="Fill In" value={this.state.AddTitle}
            onChange={this.handleChangeTitle}
          />
          Film language ID:
          <input
            type="text" placeholder="Fill In" value={this.state.AddID}
            onChange={this.handleChangeID}
          />
          Film ID:
          <input
            type="text" placeholder="Fill In" value={this.state.AddFilmID}
            onChange={this.handleChangeFilmID}
          />
          Film Length:
          <input
            type="text" placeholder="Fill In" value={this.state.AddLength}
            onChange={this.handleChangeLength}
          />
        </label>
        <input type="submit" value="Enter" />
      </form>
      </div>
      <br />
      <div>
        <h4>Now lets edit</h4> 
      <form onSubmit={this.handleEditSubmit}>
        <label>
          Film Title:
          <input
            type="text" placeholder="Fill In" value={this.state.EditTitle}
            onChange={this.handleEditTitle}
          />
          Film language ID:
          <input
            type="text" placeholder="Fill In" value={this.state.EditID}
            onChange={this.handleEditID}
          />
          Film ID:
          <input
            type="text" placeholder="Fill In" value={this.state.EditFilmID}
            onChange={this.handleEditFilmID}
          />
          Film Length:
          <input
            type="text" placeholder="Fill In" value={this.state.EditLength}
            onChange={this.handleEditLength}
          />
        </label>
        <input type="submit" value="Edit" />
      </form>
      </div>
    </div> 
  
    );
  }
}

class RemoveAFilm extends React.Component {
  render() {
    return (
      <div>
        <FilmDelete />
      </div>
    );
  }
}


//Remove film button 
class FilmDelete extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmitRemove}>
        <label>
          This Film Is Not Needed: 
          <input type="submit" value="Remove" />
        </label>
      </form>
    );
  }
}

class CinemaCentralApp extends React.Component {
  render() {
    return (
      <div>
         <h1>Cinema Central</h1> 
        <EditFilms films={this.props.films} />
      </div>
    );
  }
}

const FILMS = [
  {
    title: "ACADEMY DINOSAUR",
    languageId: 1,
    length: 86,
    movieId: 1,
  },
  {
    title: "ACE GOLDFINGER",
    languageId: 1,
    length: 48,
    movieId: 2,
  },
  {
    title: "ADAPTATION HOLES",
    languageId: 1,
    length: 50,
    movieId: 3,
  },
  {
    title: "AFFAIR PREJUDICE",
    languageId: 1,
    length: 117,
    movieId: 4,
  },
  {
    title: "AFRICAN EGG",
    languageId: 1,
    length: 130,
    movieId: 5,
  },
];

class APIImportsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          FILMS: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/films')
            .then(response => response.json())
            .then(data => this.setState({ FILMS: data }));
    }
    FILMS = this.state.FILMS
}

// useEffect(() => {
//   // GET request using fetch inside useEffect React hook
//   fetch("https://api.npms.io/v2/search?q=react")
//     .then((response) => response.json())
//     .then((data) => setTotalReactPackages(data.total));

//   // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);

ReactDOM.render(
  <CinemaCentralApp films={FILMS} />,
  document.getElementById("root")
);