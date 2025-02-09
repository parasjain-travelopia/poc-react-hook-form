/** @format */

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export type FormType = {
  age: number;
  dob: Date;
};

export const ThirdForm = () => {
  const form = useForm<FormType>({
    defaultValues: {
      age: 0,
      dob: new Date(),
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            id='age'
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
          <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='dob'>DOB</label>
          <input
            type='date'
            id='dob'
            {...register("dob", {
              required: {
                value: true,
                message: "dob is required",
              },
            })}
          />
          <p className='error'>{errors.dob?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

// {
//   values ;{ ...}
//   visited: {.. }
//   errors: {...}
//   isValird:boolean
// }
