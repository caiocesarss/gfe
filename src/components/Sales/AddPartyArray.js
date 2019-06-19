import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import InputSelect from '../../common/InputSelect';

//import { getParties, getPartyAccounts} from '../../common/SelectActions';
import { getParties, getPartyAccounts } from './SalesOrdersActions';

class AddPartyArray extends Component {
  state = {
    selectPartyAccounts: [],
  }

  componentWillMount() {
    this.props.getParties();
    let tempList = this.state.selectPartyAccounts;
    tempList.push([])
    this.setState({ selectPartyAccounts: tempList });
  }

  getPartyAccounts(party_id, index) {
    this.props.getPartyAccounts({ party_id });
    setTimeout(function () {
      const tempList = this.state.selectPartyAccounts.slice();
      const newItem = this.props.salePartyAccountList;
      tempList[index] = newItem;
      this.setState({ selectPartyAccounts: tempList });
    }.bind(this), 1000)
  }

  addNew() {
    this.props.fields.push({});
    let tempList = this.state.selectPartyAccounts;
    tempList.push([])
    this.setState({ selectPartyAccounts: tempList });
  }

  removeOne(index) {
    console.log(this.props.fields);
    let tempList = this.state.selectPartyAccounts;
    tempList.splice(index, 1);
    this.setState({ selectPartyAccounts: tempList });
    this.props.fields.remove(index);
    console.log(this.state.selectPartyAccounts);
    console.log(this.props.fields);
  }

  render() {
    const { forwardedRef, fields, meta: { error, submitFailed }, ...props } = this.props;
    const { selectPartyAccounts } = this.state;

    return (
      <Grid item xs={12} md={12}>
        <br />
        <Fab onClick={() => this.addNew()} size="small" color="primary" aria-label="Add" >
          <AddIcon />
        </Fab>&nbsp;
       <br /><br />
        {submitFailed && error && <span>{error}</span>}

        {fields.map((member, index) => {
          const selectParties = this.props.salePartyList;

          const selectPartyItems = selectParties.map(item => {
            return ({ name: item.name, id: item.party_id })
          }) || [];

          return (
            <Grid item xs={12} md={12} key={index}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <Field
                    name={`${member}.party_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyItems}
                    label={`Cliente #${index + 1}`}
                    inputProps={{ name: `${member}.party_id` }}
                    onChange={(e) => this.getPartyAccounts(e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    name={`${member}.party_account_id`}
                    selectField={{ fullWidth: true }}
                    component={InputSelect}
                    selectItems={selectPartyAccounts.length != 0 && selectPartyAccounts[index].map(item => {
                      const name = `${item.alias_name} - ${item.city_name}/${item.uf} - ${item.doc_value}`
                      return ({ name: name, id: item.party_account_id })
                    })}
                    label={`Local Cliente #${index + 1}`}
                    inputProps={{ name: `${member}.party_account_id` }}

                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Fab onClick={() => this.removeOne(index)} size="small" color="secondary" aria-label="Add" >
                    <DeleteIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>

          )
        }
        )
        }
      </Grid>
    )

  }
}
const mapStateToPropos = state => ({
  salePartyList: state.salesOrders.salePartyList,
  salePartyAccountList: state.salesOrders.salePartyAccountList
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getParties, getPartyAccounts }, dispatch);

AddPartyArray = connect(mapStateToPropos, mapDispatchToProps)(AddPartyArray)
export default AddPartyArray
React.forwardRef((props, ref) => <AddPartyArray {...props} forwardedRef={ref} />);