import React, { useState } from 'react';
import { useReducer } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Classes from './Home.module.css';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import classes from './Add.module.css';

export default function Home() {
  const [show, setShow] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [movieId, setMovieId] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, { ...action.payload, id: state.length }];
      case 'EDIT':
        return state.map((movie) => {
          if (movie.id === action.id) {
            return { ...action.payload };
          } else {
            return movie;
          }
        });
      case 'DELETE':
        return state.filter((movie) => movie.id != action.id);
      default:
        return state;
    }
  };
  const initMovies = [
    {
      id: '1',
      name: 'Movie 1',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '2',
      name: 'Movie 2',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '3',
      name: 'Movie 3',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '4',
      name: 'Movie 4',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '5',
      name: 'Movie 5',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
  ];

  const [movies, dispatch] = useReducer(reducer, initMovies);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE', id: id });
  };

  const handleEdit = ({ id, payload }) => {
    dispatch({ type: 'EDIT', id, payload });
  };

  const handleAdd = ({ payload }) => {
    dispatch({ type: 'ADD', payload });
  };
  const styles = {
    fontWeight: 'bold',
    color: 'rgb(23, 43, 77)',
    backgroundColor: 'lightblue',
    textAlign: 'center',
  };
  const inputStyles = {
    height: '50px',
  };
  return show ? (
    <div>
      <h2>Movies</h2>
      <div className={Classes.addButton}>
        <button
          onClick={() => {
            setShow(false);
            setIsEdit(false);
          }}
        >
          Add
        </button>
      </div>
      <Paper style={{ width: '800px', height: '400px', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles}>Name</TableCell>
              <TableCell style={styles}>Language</TableCell>
              <TableCell style={styles}>Rating</TableCell>
              <TableCell style={styles}>Description</TableCell>
              <TableCell style={styles}>Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ width: '100%' }}>
            {movies.length ? (
              <>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell align='center'>{movie.name}</TableCell>
                    <TableCell align='center'>{movie.language}</TableCell>
                    <TableCell align='center'>{movie.rating}</TableCell>
                    <TableCell align='center'>{movie.description}</TableCell>
                    <TableCell align='center'>
                      <EditIcon
                        color='blue'
                        className={Classes.icon}
                        onClick={() => {
                          console.log('movie ID to edit', movie.id);
                          setShow(false);
                          setIsEdit(true);
                          setMovieId(movie.id);
                        }}
                      />

                      <DeleteIcon
                        className={Classes.icon}
                        onClick={() => {
                          console.log('movie ID to delete', movie.id);
                          handleDelete(movie.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <div
                style={{
                  color: 'black',
                  textAlign: 'center',
                  padding: '20px',
                  width: '300%',
                }}
              >
                No movie available
              </div>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  ) : (
    <div style={{ width: '80%' }}>
      <h2>{isEdit ? 'Edit movie' : 'Add a movie'}</h2>
      <div className={classes.addButton}>
        <button onClick={() => setShow(true)}>Back to movies</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <section
          style={{
            width: '300px',
            backgroundColor: 'lightgray',
            padding: '30px',
            borderRadius: '10px',
          }}
        >
          <Formik
            initialValues={
              isEdit
                ? movies.filter((movie) => movie.id == movieId)[0]
                : {
                    name: '',
                    language: '',
                    rating: '',
                    description: '',
                  }
            }
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              language: Yup.string().required('Required'),
              rating: Yup.number().required('Required'),
              description: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                alert(JSON.stringify(values));
                resetForm({
                  name: '',
                  language: '',
                  rating: '',
                  description: '',
                });
                setSubmitting(false);
                setShow(true);
                isEdit
                  ? handleEdit({ id: movieId, payload: values })
                  : handleAdd({ payload: values });
              }, 400);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className={classes.input}>
                  <TextField
                    InputProps={{
                      className: classes.textField,
                      style: inputStyles,
                    }}
                    id='name'
                    label='Name'
                    variant='filled'
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={classes.error}>{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className={classes.input}>
                  <TextField
                    InputProps={{
                      className: classes.textField,
                      style: inputStyles,
                    }}
                    id='language'
                    label='Language'
                    variant='filled'
                    {...formik.getFieldProps('language')}
                  />
                  {formik.touched.language && formik.errors.language ? (
                    <div className={classes.error}>
                      {formik.errors.language}
                    </div>
                  ) : null}
                </div>

                <div className={classes.input}>
                  <TextField
                    InputProps={{
                      className: classes.textField,
                      style: inputStyles,
                    }}
                    id='rating'
                    label='Rating'
                    variant='filled'
                    {...formik.getFieldProps('rating')}
                  />
                  {formik.touched.rating && formik.errors.rating ? (
                    <div className={classes.error}>{formik.errors.rating}</div>
                  ) : null}
                </div>

                <div className={classes.input}>
                  <TextField
                    InputProps={{
                      className: classes.textField,
                      style: inputStyles,
                    }}
                    id='description'
                    label='Description'
                    variant='filled'
                    {...formik.getFieldProps('description')}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className={classes.error}>
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>

                <div className={classes.buttons}>
                  <button type='submit'>{isEdit ? 'Save' : 'Add'}</button>
                  <button
                    style={{
                      color: 'white',
                      border: 'none',
                      backgroundColor: 'gray',
                    }}
                    onClick={() =>
                      formik.resetForm({
                        name: '',
                        language: '',
                        rating: '',
                        description: '',
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </section>
      </div>
    </div>
  );
}
