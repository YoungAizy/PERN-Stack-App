import React from 'react';

const stepState = [
  {
    step1:{
      active: false,
      done:false 
    },
    step2:{
      active: false,
      done:false 
    },
    step3:{
      active: false,
      done:false 
    }
  }
]

const RegistrationProgress = ({onPageChange, setBackgroundHeight,state}) => {
  const step1 = state.step1;
  const step2 = state.step2;
  const step3 = state.step3;
  console.log(step1);

  return (
    <>
    <div className="steps">
        <div className="step">
          <div className={step1.class } >1</div>
          <div className={step1.titleClass }>New User</div>
        </div>
        <div className="step">
          <div className={step2.class }>2</div>
          <div className={step2.titleClass }>Verify Email</div>
        </div>
        <div className="step">
          <div className={step3.class }>3</div>
          <div className={step3.titleClass }>Create A Profile</div>
        </div>
      </div>
    </>
  )
}

export default RegistrationProgress;