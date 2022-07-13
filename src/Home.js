import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Classes from './Home.module.css';

export default function Home() {
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
      name: 'Movie 1',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '3',
      name: 'Movie 1',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '4',
      name: 'Movie 1',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
    {
      id: '5',
      name: 'Movie 1',
      language: 'English',
      rating: 5,
      description: 'Movie',
    },
  ];
  const [movies, setMovies] = useState(initMovies);
  const styles = {
    fontWeight: 'bold',
    color: 'rgb(23, 43, 77)',
    backgroundColor: 'lightblue',
    textAlign: 'center',
  };
  return (
    <div>
      <h2>Movies</h2>
      <div className={Classes.addButton}>
        <NavLink to='/add/0'>
          <button>Add</button>
        </NavLink>
      </div>
      {/* <NavLink to='/edit'>Edit</NavLink> */}
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
          <TableBody>
            {movies.length ? (
              <>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell align='center'>{movie.name}</TableCell>
                    <TableCell align='center'>{movie.language}</TableCell>
                    <TableCell align='center'>{movie.rating}</TableCell>
                    <TableCell align='center'>{movie.description}</TableCell>
                    <TableCell align='center'>
                      <NavLink to={`/add/${movie.id}`}>
                        <EditIcon
                          color='blue'
                          className={Classes.icon}
                          onClick={() =>
                            console.log('movie ID to edit', movie.id)
                          }
                        />
                      </NavLink>
                      <DeleteIcon
                        className={Classes.icon}
                        onClick={() =>
                          console.log('movie ID to delete', movie.id)
                        }
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
                  width: '250%',
                }}
              >
                No user data available
              </div>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
