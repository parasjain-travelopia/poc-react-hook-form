/** @format */

import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";

type FormType = {
  username: string;
  dob: Date;
  phoneNo: number;
  email: string;
};
export const Fifth = () => {
  const form = useForm<FormType>({
    defaultValues: {
      username: "test username",
      dob: new Date(),
      phoneNo: 9900990099,
      email: "",
    },
    mode: "all", // depend on this mode form will run the validations mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined
  });

  const { register, formState, control, handleSubmit, reset } = form;

  //reset // to reste the form value and dont call in onSubmit

  const {
    errors,
    isDirty,
    isValid,
    isSubmitted,
    isSubmitting,
    isSubmitSuccessful,
    isLoading,
    submitCount,
  } = formState;

  const onSubmit = (data: FormType) => {
    console.log("isSubmitted", isSubmitted);
    console.log("isSubmitSuccessful", isSubmitSuccessful);
    console.log("isSubmitting", isSubmitting);
    console.log("isLoading", isLoading);
    console.log("submitCount", submitCount);
    console.log(data);
  };

  const onError = (errors: FieldErrors) => {
    console.log("errors", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form
        className='form-control'
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />
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
          <p>{errors.dob?.message}</p>
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
      </form>
      <DevTool control={control} />
    </div>
  );
};
