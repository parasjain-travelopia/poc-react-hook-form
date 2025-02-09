/** @format */

import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export type FormType = {
  phNumbers: {
    number: string;
  }[];
};

export const YoutubeForm2 = () => {
  const form = useForm<FormType>({
    defaultValues: {
      phNumbers: [{ number: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <div>
            <label> List of phone numbers</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div className='form-control' key={field.id}>
                    <input
                      type='text'
                      {...register(`phNumbers.${index}.number` as const)}
                    />
                    {index > 0 && (
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button type='button' onClick={() => append({ number: "" })}>
                Add phone number
              </button>
            </div>
          </div>
        </div>
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
