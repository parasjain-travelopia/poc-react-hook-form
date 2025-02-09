/** @format */

import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  user: string;
};

let renderCount = 0;

export const Fourth = () => {
  const form = useForm<FormType>({
    defaultValues: {
      user: "name",
    },
  });
  const { register, handleSubmit, watch } = form;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  useEffect(() => {
    watch((value) => {
      console.log(value);
    });
  }, [watch]);

  const watchuser = watch("user");

  renderCount++;

  return (
    <div>
      <h1> Youtube Form ({renderCount})</h1>
      <h2> Watched Value ({watchuser})</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label htmlFor='user'> User</label>
          <input
            type='text'
            id='user'
            {...register("user", {
              required: {
                value: true,
                message: "user is required",
              },
            })}
          />
        </div>
      </form>
    </div>
  );
};
