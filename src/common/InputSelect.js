import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


export default props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    [props.inputProps.name]: '',
    [props.inputProps.id]: '',
  });
  //const [values, setValues] = React.useState({
  //   constructionSelect: '',
  //    nomeObra: '',
  //  });
  console.log(props.input);

  function handleChange(event) {

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));


  }
  const {
    input,
    label,
    meta: { touched, error },
    ...custom
  } = props
  return (
    <React.Fragment>

      <InputLabel htmlFor="age-simple">{props.label}</InputLabel>
      <Select {...props.selectField}
        value={values.constructionSelect}
        onChange={handleChange}
        inputProps={props.inputProps}
        {...input}
      >
        <MenuItem value="">
          <em> </em>
        </MenuItem>
        {props.selectItems != undefined && 
        props.selectItems.map(item => {
          return (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          )
        })}

      </Select>

    </React.Fragment>
  )
}