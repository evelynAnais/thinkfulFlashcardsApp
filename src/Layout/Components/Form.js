import React from 'react';

function Form({ title, inputLabelOne, inputLabelTwo, formType }) {
  return(
    <>
      <h2>{title}</h2>
      <form>
        { formType === 'deck'
          ?
            <label>{inputLabelOne}
              <input></input>
            </label>
          :
            <label>{inputLabelOne}
              <textarea></textarea>
            </label>
        }
        
        
        <label>{inputLabelTwo}
          <textarea></textarea>
        </label>
        <button className='btn btn-secondary'>CXD</button>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </>
  );
}

export default Form