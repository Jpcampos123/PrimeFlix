// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
 
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
});

export default api;
