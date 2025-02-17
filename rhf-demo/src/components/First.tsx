/** @format */

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export type FormType = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

export const First = () => {
  const form = useForm<FormType>({
    defaultValues: {
      username: "Batman",
      email: "data.email",
      channel: "marvel",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty } = formState;

  console.log("touchedFields", touchedFields);
  console.log("dirtyFields", dirtyFields);
  console.log("isDirty", isDirty);

  const onSubmit = (data: FormType) => {
    //console.log(data);
  };

  const handelGetValues = () => {
    //console.log("Get VAlues", getValues());
  };

  const handelSetValues = () => {
    setValue("channel", "its my channel");
  };

  //set values does not affect the field touch and dirty
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'> Username</label>
          <input
            type='text'
            id='username'
            {...register("username", { required: "username is required" })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
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
        </div>

        <div className='form-control'>
          <label htmlFor='channel'> Channel</label>
          <input
            type='text'
            id='channel'
            {...register("channel", { required: "channel is required" })}
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='twitter'> Twitter</label>
          <input
            type='text'
            id='twitter'
            {...register("social.twitter", {
              disabled: true,
              required: "Enter a valid value",
            })}
          />
          <p className='error'>{errors.social?.twitter?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='facebook'> facebook</label>
          <input
            type='text'
            id='facebook'
            {...register("social.facebook", {
              disabled: watch("channel") === "", // conditional disabling
            })}
          />
          <p className='error'>{errors.social?.facebook?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='primary-phone'> Primary Phone</label>
          <input
            type='text'
            id='primary-phone'
            {...register("phoneNumbers.0")}
          />
          <p className='error'>{errors.phoneNumbers?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='secondary-phone'> Secondary Phone</label>
          <input
            type='text'
            id='secondary-phone'
            {...register("phoneNumbers.1")}
          />
          <p className='error'>{errors.phoneNumbers?.message}</p>
        </div>
        <button>Submit</button>
        <button type='button' onClick={handelGetValues}>
          Get VAlues
        </button>
        <button type='button' onClick={handelSetValues}>
          Set Values
        </button>
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
