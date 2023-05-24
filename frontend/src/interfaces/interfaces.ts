export interface IMovieAPI {
  title: string;
  release: string;
  type: string;
  poster: string;
  imdbID: string;
  review: string;
}

export interface IMovieDB {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
  review: string;
}

export interface IMovie {
  title: string;
  release: string;
  type: string;
  poster: string;
  review: string;
  createdAt?: string;
  _id?: string;
  updatedAt?: string;
  imdbID?: string;
}

export interface IUser {
  email: string;
  password: string;
}
