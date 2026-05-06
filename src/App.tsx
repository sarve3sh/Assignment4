import { MainLayout } from '@/layouts/MainLayout';
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MovieView,
  MoviesView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrailersView,
  TrendingView,
  TvView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movies/category/:category" element={<MoviesView />} />
        <Route path="/tv" element={<TelevisionView />} />
        <Route path="/tv/category/:category" element={<TelevisionView />} />
        <Route path="/tv/:id" element={<TvView />}>
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="seasons/:episodeNumber" element={<EpisodeView/>}/>
        </Route>
        <Route path="/genre/:genreId" element={<GenreView />} />
        <Route path="/person/:id" element={<PersonView />} >
          <Route path='career' element={<CareerView/>}/>
          <Route path='images' element={<ImagesView/>}/>
        </Route>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movies/:id" element={<MovieView />}>
          <Route path="trailers" element={<TrailersView/>}/>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
