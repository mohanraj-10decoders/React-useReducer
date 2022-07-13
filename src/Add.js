import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import Classes from './Add.module.css';

export default function Add() {
  const inputStyles = {
    height: '50px',
  };
  const { id } = useParams();
  return (
    <div style={{ width: '80%' }}>
      <h2>{id > 0 ? 'Edit movie' : 'Add a movie'}</h2>
      <div className={Classes.addButton}>
        <NavLink to='/'>
          <button>Back to movies</button>
        </NavLink>
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
              id == 0
                ? {
                    name: '',
                    language: '',
                    rating: '',
                    description: '',
                  }
                : {
                    name: 'Test',
                    language: 'Test',
                    rating: 2,
                    description: 'Test',
                  }
            }
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              language: Yup.string().required('Required'),
              rating: Yup.number().required('Required'),
              description: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('Values', values);
              setTimeout(() => {
                alert(JSON.stringify(values));
                resetForm({
                  name: '',
                  language: '',
                  rating: '',
                  description: '',
                });
                setSubmitting(false);
              }, 400);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className={Classes.input}>
                  <TextField
                    InputProps={{
                      className: Classes.textField,
                      style: inputStyles,
                    }}
                    id='name'
                    label='Name'
                    variant='filled'
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={Classes.error}>{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className={Classes.input}>
                  <TextField
                    InputProps={{
                      className: Classes.textField,
                      style: inputStyles,
                    }}
                    id='language'
                    label='Language'
                    variant='filled'
                    {...formik.getFieldProps('language')}
                  />
                  {formik.touched.language && formik.errors.language ? (
                    <div className={Classes.error}>
                      {formik.errors.language}
                    </div>
                  ) : null}
                </div>

                <div className={Classes.input}>
                  <TextField
                    InputProps={{
                      className: Classes.textField,
                      style: inputStyles,
                    }}
                    id='rating'
                    label='Rating'
                    variant='filled'
                    {...formik.getFieldProps('rating')}
                  />
                  {formik.touched.rating && formik.errors.rating ? (
                    <div className={Classes.error}>{formik.errors.rating}</div>
                  ) : null}
                </div>

                <div className={Classes.input}>
                  <TextField
                    InputProps={{
                      className: Classes.textField,
                      style: inputStyles,
                    }}
                    id='description'
                    label='Description'
                    variant='filled'
                    {...formik.getFieldProps('description')}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className={Classes.error}>
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>

                <div className={Classes.buttons}>
                  <button type='submit'>{id == 0 ? 'Add' : 'Save'}</button>
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
