import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  componentDidMount() {
    this.fetchPets();
  }

  onChangeType = (e) => {
    this.setState({ filters: { type: e.target.value } });
  };

  onFindPetsClick = (e) => {
    this.fetchPets(this.state.filters.type);
  };

  fetchPets(type = "all") {
    let url = "/api/pets";

    if (type !== "all") {
      url = `${url}?type=${type}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((pets) => this.setState({ pets }));
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map((pet) => {
        const newPet = { ...pet };

        if (newPet.id === id) {
          newPet.isAdopted = true;
        }

        return newPet;
      }),
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
