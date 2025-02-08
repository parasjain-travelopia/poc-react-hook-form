/** @format */

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export type FormType = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm = () => {
  const form = useForm<FormType>();
  const { register, control, handleSubmit } = form;
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
        <label htmlFor='email'> Email</label>
        <input
          type='email'
          id='email'
          {...register("email", {
            pattern: { value: /^/, message: "invalid email" },
          })}
        />
        <label htmlFor='channel'> Channel</label>
        <input type='text' id='channel' {...register("channel")} />
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
