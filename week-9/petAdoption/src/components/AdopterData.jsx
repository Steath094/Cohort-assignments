import React, { Component } from 'react'

export class AdopterData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.data);
    
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Pet Name</th>
            <th>Pet Type</th>
            <th>Breed</th>
            <th>Adopter Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          </thead>
         <tbody>
          {this.props.data.map(item=>
              <tr key={item.name}>
                  <td>{item.petName}</td>
                  <td>{item.petType}</td>
                  <td>{item.breed}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
              </tr>
            )}
         </tbody>
          
</table>
        <button onClick={this.props.toggleView} style={{width:'fit-content',padding:'10px 20px', borderRadius:"16px"}}>Go Back</button>
      </div>
    )
  }
}

export default AdopterData