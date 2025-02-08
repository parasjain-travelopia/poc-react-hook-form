/** @format */

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export type FormType = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm1 = () => {
  const form = useForm<FormType>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman",
        email: data.email,
        channel: "marvel",
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = (data: FormType) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='username'> Username</label>
        <input
          type='text'
          id='username'
          {...register("username", { required: "username is required" })}
        />
        <p className='error'>{errors.username?.message}</p>
        <label htmlFor='email'> Email</label>
        <input
          type='email'
          id='email'
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a diff email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("abc.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className='error'>{errors.email?.message}</p>
        <label htmlFor='channel'> Channel</label>
        <input
          type='text'
          id='channel'
          {...register("channel", { required: "channel is required" })}
        />
        <p className='error'>{errors.channel?.message}</p>
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
