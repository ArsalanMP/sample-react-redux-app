import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { galleryState, getPhotosAsync } from './gallerySlice';
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Search } from '@material-ui/icons';
import { debounce } from 'lodash';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const { photos, loading } = useAppSelector(galleryState);

  const [query, setQuery] = useState('');

  useEffect(() => {
    const doSearch = debounce(async () => {
      dispatch(getPhotosAsync(query));
    }, 800);
    if (query.length === 0 || query.length > 2) {
      doSearch();
    }
    return () => doSearch.cancel();
  }, [query]);

  const classes = useStyles();

  const searchInputChange = (e: any) => {
    setQuery(e.target.value.trim());
  };

  return (
    <Box display="flex" flexDirection="column" margin={4}>
      <Box>
        <TextField
          label="Search photos"
          value={query}
          onChange={searchInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {!loading ? (
        <Box className={classes.gallery} marginTop={2}>
          {photos.length > 0 ? (
            <ImageList rowHeight={400} cols={3}>
              {photos.map((photo) => (
                <ImageListItem key={photo.id}>
                  <img
                    src={photo.urls.small_s3}
                    alt={photo.description}
                  />

                  <ImageListItemBar
                    title={photo.description}
                    subtitle={
                      <span>{`by: ${photo.user.first_name} ${photo.user.last_name}`}</span>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography>
              {`There is no photo ${
                query ? `related to '${query}'` : ''
              }`}
            </Typography>
          )}
        </Box>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gallery: {
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
    },
    progress: {
      margin: 'auto',
      marginTop: theme.spacing(5),
    },
  })
);

export default Gallery;
