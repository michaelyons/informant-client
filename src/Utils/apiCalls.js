export const initialFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanInitialFetch(data);
};

const cleanInitialFetch = data => {
  return data.map(object => {
    const removeDupLobbyists = object.lobbyists.filter(
      (person, index, self) =>
        index ===
        self.findIndex(
          item => item.place === person.place && item.name === person.name
        )
    );
    const cleanLobbyists = removeDupLobbyists.map(person => {
      return person.name;
    });
    return {
      FilingId: object.filing_id,
      ClientName: object.client.name,
      Topic: object.issue,
      Lobbyists: cleanLobbyists,
      Register: object.registrant.name
    };
  });
};