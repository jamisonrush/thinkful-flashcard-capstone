import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";
import DeckDetails from "../deck/DeckDetails";
import NewDeck from "../deck/NewDeck";
import Study from "../study/Study";
import AddCard from "../card/AddCard";
import EditDeck from "../deck/EditDeck";
import EditCard from "../card/EditCard";
import DeckList from "../deck/DeckList";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((decks) => setDecks(decks))
      .catch((error) => {
        console.error(error);
      });

    return () => abortController.abort();
  }, [setDecks]);

  const onDeleteDeck = (deletedDeck) => {
    const updatedDecks = decks.filter((deck) => deck.id !== deletedDeck.id);
    setDecks(updatedDecks);
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <DeckList decks={decks} onDeleteDeck={onDeleteDeck} />
        </Route>
        <Route path="/decks/new">
          <NewDeck setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study decks={decks} />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck decks={decks} setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard decks={decks} />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId">
          <DeckDetails onDeleteDeck={onDeleteDeck} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Layout;
