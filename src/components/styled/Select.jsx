import React from 'react';


const Select = ({optionsList, optionsDescriptor}) => {
  return (
    <div>
      <select class="form-select" aria-label="Default select example">
        {optionsDescriptor &&  <option selected>{optionsDescriptor}</option>}
        {optionsList.map(({val, id: keyId})=> <option value={val} key={keyId} >{val}</option> )
        }
      </select>
    </div>
  )
}

export default Select;