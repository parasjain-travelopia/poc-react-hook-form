/** @format */

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

type FormType = {
  username: string;
  dob: Date;
  phoneNo: number;
  email: string;
};

const formSchema = z.object({
  username: z.string().nonempty("username schema is required"),
  email: z.string().nonempty("Email is required").email("Format is Invalid"),
  phoneNo: z.number(),
  dob: z.date(),
});

export const Sixth = () => {
  const form = useForm<FormType>({
    defaultValues: {
      username: "test username",
      dob: new Date(),
      phoneNo: 9900990099,
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { register, formState, control, handleSubmit, reset, trigger } = form;

  const { errors, isDirty } = formState;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors) => {
    console.log("errors", errors);
  };

  return (
    <div>
      <form
        className='form-control'
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' {...register("username")} />
          <p>{errors.username?.message}</p>
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
              valueAsDate: true,
            })}
          />
          <p>{errors.dob?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='phoneNo'>PhoneNo</label>
          <input
            type='text'
            id='phoneNo'
            {...register("phoneNo", {
              required: {
                value: true,
                message: "phoneNo is required",
              },
              valueAsNumber: true,
            })}
          />
          <p>{errors.phoneNo?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },

              validate: {
                emailAvailable: async (fieldValue) => {
                  const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await res.json();
                  return data.length == 0 || "already exist";
                },
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <button type='submit' disabled={!isDirty}>
          Submit
        </button>
        <button type='button' onClick={() => reset()}>
          Reset
        </button>

        <button type='button' onClick={() => trigger()}>
          Trigger
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
