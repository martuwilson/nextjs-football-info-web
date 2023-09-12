import { apiOptions, matchesType } from "@/types"

const options:apiOptions =  {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
}
/* export const getMatchesfootball = async () => {
  const matchData = await fetch('https://api.football-data.org/v4/matches',options)
  return matchData.json()
} */

const baseURL = 'https://api.football-data.org/v4';

export const getMatchesfootball = async () => {
  const requestOptions = {
    headers: {
      'X-Auth-Token': process.env.API_TOKEN,
    },
  };

  try {
    const matchResponse = await fetch(`${baseURL}/matches`, options);

    if (!matchResponse.ok) {
      throw new Error('No se pudo obtener los datos de los partidos');
    }

    const matchData = await matchResponse.json();
    return matchData;
  } catch (error) {
    console.error(error);
    throw error; // Puedes volver a lanzar el error si lo deseas para que se maneje en otro lugar.
  }
}

const todayDate = new Date()
const getDateMonth = new Date(todayDate.getTime());
getDateMonth.setDate(todayDate.getDate() - 1);
const year = getDateMonth.getFullYear()
const month = String(getDateMonth.getMonth() + 1).padStart(2, '0');
const day = String(getDateMonth.getDate()).padStart(2, '0');

const yesterday = [year, month, day].join('-');
  
export const getMatchesfootballFinished = async () => {
  const matchData = await fetch(`https://api.football-data.org/v4/matches?date=${yesterday}`,options)
  return matchData.json()
}

export const getNewsInfo = async () => {
  const newsData = await fetch(`https://newsapi.org/v2/everything?apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`,{next:{revalidate:30}})
  return newsData.json()
}

export const filterLeague = async (filterData:string) => {
  const getEnglishLeague = await getMatchesfootball()
  const filterPremierLeague:matchesType[] = getEnglishLeague?.matches
  const getData = filterPremierLeague.filter((item) => item.competition.name === filterData)
  return getData
}