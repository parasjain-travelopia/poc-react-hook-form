/** @format */

import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

export type FormType1 = {
  name: string;
  class: number;
  email: string;
  Address: {
    houseNo: string;
    pincode: number;
    nearby: string;
    details: string;
  };
};

export const UserAddress = () => {
  const form = useForm<FormType1>();
  const { control, register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormType1) => {
    console.log("submiiitng the form", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            {...register("name", { required: "name is required" })}
          />
          <p>{errors.name?.message}</p>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  );
};
